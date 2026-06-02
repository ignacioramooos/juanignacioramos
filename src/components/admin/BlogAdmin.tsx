import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Copy, Eye, EyeOff, ImagePlus, Plus, Save, Trash2 } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover_image_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

interface BlogImage {
  alt: string;
  url: string;
}

const markdownImagePattern = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;

const getImageAlt = (fileName: string) =>
  fileName
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim() || "Blog image";

const getSafeFileName = (fileName: string) =>
  fileName
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "") || "image";

const getPostImages = (post: BlogPost): BlogImage[] => {
  const images = new Map<string, BlogImage>();

  if (post.cover_image_url) {
    images.set(post.cover_image_url, { alt: `${post.title} cover`, url: post.cover_image_url });
  }

  for (const match of post.content.matchAll(markdownImagePattern)) {
    const [, alt, url] = match;
    images.set(url, { alt: alt || post.title || "Blog image", url });
  }

  return Array.from(images.values());
};

export const BlogAdmin = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const textareaRefs = useRef<Record<string, HTMLTextAreaElement | null>>({});
  const cursorPositions = useRef<Record<string, { start: number; end: number }>>({});

  const fetchPosts = async () => {
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    setPosts((data as BlogPost[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const createPost = async () => {
    const slug = `post-${Date.now()}`;
    const { error } = await supabase.from("blog_posts").insert({ title: "Untitled Post", slug, content: "" });
    if (error) toast.error(error.message);
    else { toast.success("Draft created"); fetchPosts(); }
  };

  const savePost = async (post: BlogPost) => {
    const { error } = await supabase.from("blog_posts").update({
      title: post.title,
      slug: post.slug,
      content: post.content,
      cover_image_url: post.cover_image_url,
      published: post.published,
      updated_at: new Date().toISOString(),
    }).eq("id", post.id);
    if (error) toast.error(error.message);
    else toast.success("Saved");
  };

  const deletePost = async (id: string) => {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); setPosts((p) => p.filter((x) => x.id !== id)); }
  };

  const togglePublish = async (post: BlogPost) => {
    const updated = { ...post, published: !post.published };
    const { error } = await supabase.from("blog_posts").update({ published: updated.published, updated_at: new Date().toISOString() }).eq("id", post.id);
    if (error) toast.error(error.message);
    else {
      toast.success(updated.published ? "Published" : "Unpublished");
      setPosts((p) => p.map((x) => (x.id === post.id ? updated : x)));
    }
  };

  const update = (id: string, field: keyof BlogPost, value: unknown) => {
    setPosts((p) => p.map((x) => (x.id === id ? { ...x, [field]: value } : x)));
  };

  const rememberCursor = (postId: string, textarea: HTMLTextAreaElement) => {
    cursorPositions.current[postId] = {
      start: textarea.selectionStart,
      end: textarea.selectionEnd,
    };
  };

  const insertIntoContent = (postId: string, text: string) => {
    let nextCursor = 0;
    const textarea = textareaRefs.current[postId];
    const fallbackPosition = textarea?.value.length ?? 0;
    const position = cursorPositions.current[postId] ?? { start: fallbackPosition, end: fallbackPosition };

    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id !== postId) return post;

        const content = post.content ?? "";
        const start = Math.min(position.start, content.length);
        const end = Math.min(position.end, content.length);
        const before = content.slice(0, start);
        const after = content.slice(end);
        const leading = before.length > 0 && !before.endsWith("\n\n") ? "\n\n" : "";
        const trailing = after.length > 0 && !after.startsWith("\n\n") ? "\n\n" : "";
        const insert = `${leading}${text}${trailing}`;
        nextCursor = start + insert.length;

        return {
          ...post,
          content: `${before}${insert}${after}`,
        };
      }),
    );

    window.requestAnimationFrame(() => {
      const activeTextarea = textareaRefs.current[postId];
      activeTextarea?.focus();
      activeTextarea?.setSelectionRange(nextCursor, nextCursor);
      cursorPositions.current[postId] = { start: nextCursor, end: nextCursor };
    });
  };

  const uploadBlogImage = async (postId: string, file: File) => {
    const uniquePart = typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2);
    const path = `${postId}/${Date.now()}-${uniquePart}-${getSafeFileName(file.name)}`;
    const { error } = await supabase.storage.from("blog-images").upload(path, file, { upsert: false });
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage.from("blog-images").getPublicUrl(path);
    return { alt: getImageAlt(file.name), url: publicUrl };
  };

  const uploadCoverImage = async (postId: string, file: File) => {
    try {
      const image = await uploadBlogImage(postId, file);
      update(postId, "cover_image_url", image.url);
      toast.success("Cover image uploaded - remember to save");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not upload image");
    }
  };

  const uploadInlineImages = async (post: BlogPost, fileList: FileList | null) => {
    const files = Array.from(fileList ?? []);
    if (files.length === 0) return;

    try {
      const uploads: BlogImage[] = [];
      for (const file of files) {
        uploads.push(await uploadBlogImage(post.id, file));
      }

      insertIntoContent(
        post.id,
        uploads.map((image) => `![${image.alt}](${image.url})`).join("\n\n"),
      );
      toast.success(`${uploads.length} image${uploads.length === 1 ? "" : "s"} uploaded - remember to save`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not upload images");
    }
  };

  const copyUrl = async (url: string) => {
    await navigator.clipboard.writeText(url);
    toast.success("Image URL copied");
  };

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-display font-semibold">Blog Posts ({posts.length})</h3>
        <Button size="sm" onClick={createPost}><Plus size={14} /> New Post</Button>
      </div>

      {posts.map((post) => {
        const postImages = getPostImages(post);

        return (
          <div key={post.id} className="p-4 rounded-xl border border-border bg-card space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <Input placeholder="Title" value={post.title} onChange={(e) => update(post.id, "title", e.target.value)} />
              <Input placeholder="Slug" value={post.slug} onChange={(e) => update(post.id, "slug", e.target.value)} />
            </div>
            <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
              <Input placeholder="Cover image URL" value={post.cover_image_url ?? ""} onChange={(e) => update(post.id, "cover_image_url", e.target.value || null)} />
              <label className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-3 text-sm ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground">
                <ImagePlus size={14} />
                Cover
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadCoverImage(post.id, file);
                    e.currentTarget.value = "";
                  }}
                />
              </label>
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="text-xs font-medium text-muted-foreground">Content</label>
                <label className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-3 text-sm ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground">
                  <ImagePlus size={14} />
                  Add images
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="sr-only"
                    onChange={(e) => {
                      uploadInlineImages(post, e.target.files);
                      e.currentTarget.value = "";
                    }}
                  />
                </label>
              </div>
              <Textarea
                ref={(element) => {
                  textareaRefs.current[post.id] = element;
                }}
                placeholder="Content (Markdown)"
                value={post.content}
                onChange={(e) => update(post.id, "content", e.target.value)}
                onBlur={(e) => rememberCursor(post.id, e.currentTarget)}
                onClick={(e) => rememberCursor(post.id, e.currentTarget)}
                onFocus={(e) => rememberCursor(post.id, e.currentTarget)}
                onKeyUp={(e) => rememberCursor(post.id, e.currentTarget)}
                onSelect={(e) => rememberCursor(post.id, e.currentTarget)}
                rows={12}
                className="font-mono text-xs"
              />
            </div>
            {postImages.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Images in this post</p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {postImages.map((image) => (
                    <div key={image.url} className="overflow-hidden rounded-lg border border-border bg-background">
                      <img src={image.url} alt={image.alt} className="h-40 w-full bg-white object-contain opacity-100 [filter:none] [mix-blend-mode:normal]" loading="lazy" />
                      <div className="flex flex-wrap gap-2 p-2">
                        <Button size="sm" variant="outline" onClick={() => insertIntoContent(post.id, `![${image.alt}](${image.url})`)}>
                          <ImagePlus size={14} /> Insert
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => update(post.id, "cover_image_url", image.url)}>
                          Cover
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => copyUrl(image.url)}>
                          <Copy size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-2 flex-wrap">
              <Button size="sm" onClick={() => savePost(post)}><Save size={14} /> Save</Button>
              <Button size="sm" variant="outline" onClick={() => togglePublish(post)}>
                {post.published ? <><EyeOff size={14} /> Unpublish</> : <><Eye size={14} /> Publish</>}
              </Button>
              <Button size="sm" variant="destructive" onClick={() => deletePost(post.id)}><Trash2 size={14} /> Delete</Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
