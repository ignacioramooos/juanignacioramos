import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { Calendar } from "lucide-react";
import { BlurImage } from "@/components/ui/blur-image";
import { SEOHead } from "@/components/SEOHead";
import { getCoverFrame, getPublicContent } from "@/lib/blogImages";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover_image_url: string | null;
  created_at: string;
}

const getPostExcerpt = (content: string) =>
  getPublicContent(content)
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/[#>*_`[\]()]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setPosts((data as BlogPost[]) || []);
        setLoading(false);
      });
  }, []);

  return (
    <main className="relative z-10 min-h-screen bg-background text-foreground">
      <SEOHead
        title="Blog — Juan Ignacio Ramos"
        description="Essays, updates, and engineering notes from Juan Ignacio Ramos on aerospace, leadership, and the journey from Montevideo to university."
      />
      <Navbar />
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">Blog</p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold mb-12">Updates & Thoughts</h1>
          </motion.div>

          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : posts.length === 0 ? (
            <p className="text-muted-foreground">No posts yet. Check back soon!</p>
          ) : (
            <div className="space-y-6">
              {posts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group block p-6 rounded-2xl bg-card border border-border hover:border-foreground/20 transition-all hover:-translate-y-1 relative z-[1]"
                  >
                    {post.cover_image_url && getCoverFrame(post) === "cover" && (
                      <BlurImage
                        src={post.cover_image_url}
                        alt={post.title}
                        className="rounded-xl mb-4 h-48"
                      />
                    )}
                    {post.cover_image_url && getCoverFrame(post) === "contain" && (
                      <div className="mb-4 overflow-hidden rounded-xl">
                        <img
                          src={post.cover_image_url}
                          alt={post.title}
                          className="block h-auto w-full object-contain opacity-100 [filter:none] [mix-blend-mode:normal]"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <h2 className="font-display text-xl font-semibold group-hover:text-foreground/80 transition-colors">
                      {post.title}
                    </h2>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2">
                      <Calendar size={12} />
                      {new Date(post.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </div>
                    {getPostExcerpt(post.content) && (
                      <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                        {getPostExcerpt(post.content).slice(0, 200)}...
                      </p>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default BlogPage;
