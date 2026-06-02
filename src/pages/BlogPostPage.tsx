import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Calendar } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { BlurImage } from "@/components/ui/blur-image";
import { getCoverFrame, getFrameFromTitle, getPublicContent } from "@/lib/blogImages";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover_image_url: string | null;
  created_at: string;
}

const blogImageClass =
  "relative z-20 mx-auto block h-auto max-h-none max-w-full rounded-2xl object-contain opacity-100 shadow-sm [filter:none] [mix-blend-mode:normal]";

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
    <main className="relative z-10 min-h-screen bg-background text-foreground">
      {post && (
        <SEOHead
          title={`${post.title} — Juan Ignacio Ramos`}
          description={getPublicContent(post.content).slice(0, 155).replace(/\s+/g, " ").trim()}
          type="article"
          jsonLd={{
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            datePublished: post.created_at,
            dateModified: post.created_at,
            ...(post.cover_image_url ? { image: post.cover_image_url } : {}),
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://juanignacioramos.com/blog/${post.slug}`,
            },
            author: {
              "@type": "Person",
              name: "Juan Ignacio Ramos",
              url: "https://juanignacioramos.com",
            },
          }}
        />
      )}
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
            <article className="relative z-10">
              {post.cover_image_url && (
                getCoverFrame(post) === "cover" ? (
                  <BlurImage
                    src={post.cover_image_url}
                    alt={post.title}
                    className="relative z-20 rounded-2xl mb-8 h-64 sm:h-80"
                  />
                ) : (
                <div className="relative z-20 -mx-4 mb-8 rounded-2xl sm:-mx-12 lg:-mx-28">
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    className={blogImageClass}
                  />
                </div>
                )
              )}
              <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3">{post.title}</h1>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8">
                <Calendar size={14} />
                {new Date(post.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </div>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    img: ({ alt, src, title }) => {
                      const frame = getFrameFromTitle(title);

                      return frame === "cover" ? (
                        <span className="not-prose relative z-20 my-8 block h-64 overflow-hidden rounded-2xl sm:h-80">
                          <img
                            src={src ?? ""}
                            alt={alt ?? ""}
                            title={title}
                            className="h-full w-full object-cover opacity-100 shadow-sm [filter:none] [mix-blend-mode:normal]"
                            loading="lazy"
                          />
                        </span>
                      ) : (
                        <span className="not-prose relative z-20 -mx-4 my-8 block rounded-2xl sm:-mx-12 lg:-mx-28">
                          <img
                            src={src ?? ""}
                            alt={alt ?? ""}
                            title={title}
                            className={blogImageClass}
                            loading="lazy"
                          />
                        </span>
                      );
                    },
                  }}
                >
                  {getPublicContent(post.content)}
                </ReactMarkdown>
              </div>
            </article>
          )}
        </div>
      </div>
    </main>
  );
};

export default BlogPostPage;
