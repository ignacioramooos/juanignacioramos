import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { BlurImage } from "@/components/ui/blur-image";
import { SEOHead } from "@/components/SEOHead";
import { getCoverFrame, getPublicContent } from "@/lib/blogImages";
import { useLanguage } from "@/i18n/LanguageContext";

const EASE = [0.23, 1, 0.32, 1] as const;

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
  const reduceMotion = useReducedMotion();
  const { lang } = useLanguage();

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
      <div className="pt-32 pb-24 px-5 sm:px-[5vw]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <h1 className="font-display font-light tracking-[-0.03em] leading-[0.95] text-[clamp(2.75rem,7vw,6rem)] mb-20">
              {lang === "es" ? "Escritos" : "Writing"}
            </h1>
          </motion.div>

          {loading ? (
            <p className="text-muted-foreground">{lang === "es" ? "Cargando..." : "Loading..."}</p>
          ) : posts.length === 0 ? (
            <p className="text-muted-foreground">{lang === "es" ? "Todavía no hay publicaciones." : "No posts yet. Check back soon!"}</p>
          ) : (
            <div>
              {posts.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: 0.04 * i, duration: 0.6, ease: EASE }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group block py-10 border-t border-border/60 first:border-t-0 relative z-[1] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <time className="text-sm text-muted-foreground" dateTime={post.created_at}>
                      {new Date(post.created_at).toLocaleDateString(lang === "es" ? "es-UY" : "en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </time>
                    <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight mt-2 group-hover:text-foreground/70 transition-colors duration-200">
                      {post.title}
                    </h2>
                    {getPostExcerpt(post.content) && (
                      <p className="text-muted-foreground mt-3 line-clamp-2 max-w-2xl leading-relaxed">
                        {getPostExcerpt(post.content).slice(0, 200)}...
                      </p>
                    )}
                    {post.cover_image_url && getCoverFrame(post) === "cover" && (
                      <BlurImage
                        src={post.cover_image_url}
                        alt={post.title}
                        className="mt-6 h-56 sm:h-72"
                      />
                    )}
                    {post.cover_image_url && getCoverFrame(post) === "contain" && (
                      <div className="mt-6 overflow-hidden">
                        <img
                          src={post.cover_image_url}
                          alt={post.title}
                          className="block h-auto w-full object-contain opacity-100 [filter:none] [mix-blend-mode:normal]"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default BlogPage;
