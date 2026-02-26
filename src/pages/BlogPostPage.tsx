import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Calendar } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover_image_url: string | null;
  created_at: string;
}

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle()
      .then(({ data }) => {
        setPost(data as BlogPost | null);
        setLoading(false);
      });
  }, [slug]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft size={14} /> Back to blog
          </Link>

          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : !post ? (
            <p className="text-muted-foreground">Post not found.</p>
          ) : (
            <article>
              {post.cover_image_url && (
                <div className="rounded-2xl overflow-hidden mb-8 bg-card">
                  <img src={post.cover_image_url} alt={post.title} className="w-full h-64 sm:h-80 object-cover" />
                </div>
              )}
              <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3">{post.title}</h1>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8">
                <Calendar size={14} />
                {new Date(post.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </div>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
            </article>
          )}
        </div>
      </div>
    </main>
  );
};

export default BlogPostPage;
