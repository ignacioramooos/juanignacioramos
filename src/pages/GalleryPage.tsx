import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SEOHead } from "@/components/SEOHead";
import { motion } from "framer-motion";

type GalleryImage = {
  id: string;
  title: string | null;
  description: string | null;
  image_url: string;
  taken_at: string | null;
  published_at: string;
  width: number | null;
  height: number | null;
};

const GalleryPage = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<GalleryImage | null>(null);

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);

    supabase
      .from("gallery_images")
      .select("id,title,description,image_url,taken_at,published_at,width,height")
      .eq("published", true)
      .order("published_at", { ascending: false })
      .then(({ data }) => {
        setImages((data as GalleryImage[]) ?? []);
        setLoading(false);
      });

    return () => {
      meta.remove();
    };
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Gallery — Juan Ignacio Ramos"
        description="Personal photo gallery by Juan Ignacio Ramos."
      />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <header className="mb-10">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">Gallery</h1>
          <p className="text-sm text-muted-foreground mt-1">
            A personal collection · {images.length} {images.length === 1 ? "image" : "images"}
          </p>
        </header>

        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : images.length === 0 ? (
          <p className="text-sm text-muted-foreground">No images yet.</p>
        ) : (
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 [column-fill:_balance]">
            {images.map((img, i) => (
              <motion.button
                key={img.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.03, 0.5), duration: 0.4 }}
                onClick={() => setSelected(img)}
                className="mb-3 block w-full break-inside-avoid overflow-hidden rounded-md bg-muted group relative"
              >
                <img
                  src={img.image_url}
                  alt={img.title || "Gallery image"}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  style={
                    img.width && img.height
                      ? { aspectRatio: `${img.width} / ${img.height}` }
                      : undefined
                  }
                />
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div
            className="max-w-5xl max-h-full flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selected.image_url}
              alt={selected.title || "Gallery image"}
              className="max-h-[80vh] w-auto object-contain rounded-md"
            />
            <div className="text-sm">
              {selected.title && <p className="font-medium">{selected.title}</p>}
              {selected.description && (
                <p className="text-muted-foreground mt-1">{selected.description}</p>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                {new Date(selected.taken_at || selected.published_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default GalleryPage;
