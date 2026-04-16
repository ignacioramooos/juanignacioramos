import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Trash2, Upload, Eye, EyeOff, Loader2 } from "lucide-react";

type GalleryImage = {
  id: string;
  title: string | null;
  description: string | null;
  image_url: string;
  storage_path: string;
  taken_at: string | null;
  published_at: string;
  width: number | null;
  height: number | null;
  display_order: number;
  published: boolean;
};

const getImageDimensions = (file: File): Promise<{ width: number; height: number }> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };
    img.src = url;
  });

export const GalleryAdmin = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [takenAt, setTakenAt] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("published_at", { ascending: false });
    if (error) toast.error(error.message);
    else setImages((data as GalleryImage[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) {
      toast.error("Selecciona una imagen");
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast.error("El archivo debe ser una imagen");
      return;
    }

    setUploading(true);
    try {
      const dims = await getImageDimensions(file).catch(() => ({ width: 0, height: 0 }));

      const ext = file.name.split(".").pop() || "jpg";
      const path = `${Date.now()}-${crypto.randomUUID()}.${ext}`;

      const { error: upErr } = await supabase.storage
        .from("gallery")
        .upload(path, file, {
          cacheControl: "31536000",
          upsert: false,
          contentType: file.type,
        });
      if (upErr) throw upErr;

      const { data: pub } = supabase.storage.from("gallery").getPublicUrl(path);

      const { error: insErr } = await supabase.from("gallery_images").insert({
        title: title.trim() || null,
        description: description.trim() || null,
        image_url: pub.publicUrl,
        storage_path: path,
        taken_at: takenAt ? new Date(takenAt).toISOString() : null,
        width: dims.width || null,
        height: dims.height || null,
      });
      if (insErr) throw insErr;

      toast.success("Imagen subida");
      setTitle("");
      setDescription("");
      setTakenAt("");
      if (fileRef.current) fileRef.current.value = "";
      load();
    } catch (err: any) {
      toast.error(err.message || "Error al subir");
    } finally {
      setUploading(false);
    }
  };

  const togglePublish = async (img: GalleryImage) => {
    const { error } = await supabase
      .from("gallery_images")
      .update({ published: !img.published })
      .eq("id", img.id);
    if (error) toast.error(error.message);
    else load();
  };

  const remove = async (img: GalleryImage) => {
    if (!confirm("¿Eliminar esta imagen?")) return;
    await supabase.storage.from("gallery").remove([img.storage_path]);
    const { error } = await supabase.from("gallery_images").delete().eq("id", img.id);
    if (error) toast.error(error.message);
    else {
      toast.success("Eliminada");
      load();
    }
  };

  return (
    <div className="space-y-6 mt-4">
      <Card className="p-4">
        <form onSubmit={handleUpload} className="space-y-3">
          <div>
            <Label htmlFor="g-file">Imagen (calidad original)</Label>
            <Input id="g-file" ref={fileRef} type="file" accept="image/*" required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="g-title">Título (opcional)</Label>
              <Input id="g-title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="g-date">Fecha de la foto (opcional)</Label>
              <Input
                id="g-date"
                type="date"
                value={takenAt}
                onChange={(e) => setTakenAt(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="g-desc">Descripción (opcional)</Label>
            <Textarea
              id="g-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          <Button type="submit" disabled={uploading}>
            {uploading ? <Loader2 className="animate-spin" size={14} /> : <Upload size={14} />}
            {uploading ? "Subiendo..." : "Subir imagen"}
          </Button>
        </form>
      </Card>

      <div>
        <h3 className="font-medium mb-3 text-sm text-muted-foreground">
          {images.length} imágenes
        </h3>
        {loading ? (
          <p className="text-sm text-muted-foreground">Cargando...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((img) => (
              <Card key={img.id} className="overflow-hidden">
                <div className="aspect-square bg-muted relative">
                  <img
                    src={img.image_url}
                    alt={img.title || "gallery"}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {!img.published && (
                    <div className="absolute top-1 left-1 bg-background/80 text-xs px-1.5 py-0.5 rounded">
                      borrador
                    </div>
                  )}
                </div>
                <div className="p-2 space-y-1">
                  <p className="text-xs font-medium truncate">{img.title || "Sin título"}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {new Date(img.published_at).toLocaleDateString()}
                  </p>
                  <div className="flex gap-1 pt-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 px-2"
                      onClick={() => togglePublish(img)}
                    >
                      {img.published ? <EyeOff size={12} /> : <Eye size={12} />}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 px-2"
                      onClick={() => remove(img)}
                    >
                      <Trash2 size={12} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
