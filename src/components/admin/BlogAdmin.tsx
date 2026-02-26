import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Trash2, Plus, Save, Eye, EyeOff } from "lucide-react";

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

export const BlogAdmin = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

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

  const uploadImage = async (postId: string, file: File) => {
    const path = `${postId}/${file.name}`;
    const { error } = await supabase.storage.from("blog-images").upload(path, file, { upsert: true });
    if (error) { toast.error(error.message); return; }
    const { data: { publicUrl } } = supabase.storage.from("blog-images").getPublicUrl(path);
    update(postId, "cover_image_url", publicUrl);
    toast.success("Image uploaded — remember to save");
  };

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-display font-semibold">Blog Posts ({posts.length})</h3>
        <Button size="sm" onClick={createPost}><Plus size={14} /> New Post</Button>
      </div>

      {posts.map((post) => (
        <div key={post.id} className="p-4 rounded-xl border border-border bg-card space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <Input placeholder="Title" value={post.title} onChange={(e) => update(post.id, "title", e.target.value)} />
            <Input placeholder="Slug" value={post.slug} onChange={(e) => update(post.id, "slug", e.target.value)} />
          </div>
          <Input placeholder="Cover image URL" value={post.cover_image_url ?? ""} onChange={(e) => update(post.id, "cover_image_url", e.target.value || null)} />
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Or upload an image:</label>
            <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadImage(post.id, f); }} className="text-sm" />
          </div>
          <Textarea placeholder="Content (Markdown)" value={post.content} onChange={(e) => update(post.id, "content", e.target.value)} rows={10} className="font-mono text-xs" />
          <div className="flex gap-2 flex-wrap">
            <Button size="sm" onClick={() => savePost(post)}><Save size={14} /> Save</Button>
            <Button size="sm" variant="outline" onClick={() => togglePublish(post)}>
              {post.published ? <><EyeOff size={14} /> Unpublish</> : <><Eye size={14} /> Publish</>}
            </Button>
            <Button size="sm" variant="destructive" onClick={() => deletePost(post.id)}><Trash2 size={14} /> Delete</Button>
          </div>
        </div>
      ))}
    </div>
  );
};
