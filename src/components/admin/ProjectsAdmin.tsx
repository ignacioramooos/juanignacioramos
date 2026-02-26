import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, Save, Image } from "lucide-react";
import { toast } from "sonner";

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  status: string | null;
  image_url: string | null;
  featured: boolean;
  display_order: number;
  created_at: string;
}

export const ProjectsAdmin = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) {
      toast.error("Failed to load projects");
      return;
    }
    setProjects(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const addProject = async () => {
    const { error } = await supabase
      .from("projects")
      .insert({ title: "New Project", description: "", display_order: projects.length });
    if (error) { toast.error(error.message); return; }
    toast.success("Project created");
    fetchProjects();
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    const { error } = await supabase.from("projects").update(updates).eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Saved");
    fetchProjects();
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Deleted");
    fetchProjects();
  };

  const uploadImage = async (id: string, file: File) => {
    const ext = file.name.split(".").pop();
    const path = `${id}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("project-images")
      .upload(path, file, { upsert: true });
    if (uploadError) { toast.error(uploadError.message); return; }
    const { data: urlData } = supabase.storage.from("project-images").getPublicUrl(path);
    await updateProject(id, { image_url: urlData.publicUrl });
  };

  if (loading) return <p className="text-sm text-muted-foreground py-8">Loading…</p>;

  return (
    <div className="space-y-6 py-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">{projects.length} projects</p>
        <Button size="sm" onClick={addProject}><Plus size={14} /> Add Project</Button>
      </div>

      {projects.map((p) => (
        <div key={p.id} className="p-4 rounded-xl border border-border bg-card space-y-3">
          <div className="flex items-start justify-between gap-3">
            <Input
              defaultValue={p.title}
              onBlur={(e) => updateProject(p.id, { title: e.target.value })}
              className="font-semibold text-base"
              placeholder="Title"
            />
            <Button variant="ghost" size="icon" onClick={() => deleteProject(p.id)}>
              <Trash2 size={14} className="text-destructive" />
            </Button>
          </div>

          <Textarea
            defaultValue={p.description}
            onBlur={(e) => updateProject(p.id, { description: e.target.value })}
            placeholder="Description"
            rows={3}
          />

          <div className="grid sm:grid-cols-3 gap-3">
            <Select defaultValue={p.category} onValueChange={(v) => updateProject(p.id, { category: v })}>
              <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="software">Software</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            <Input
              defaultValue={p.status || ""}
              onBlur={(e) => updateProject(p.id, { status: e.target.value || null })}
              placeholder="Status (e.g. In Development)"
            />

            <Input
              defaultValue={p.tags.join(", ")}
              onBlur={(e) => updateProject(p.id, { tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })}
              placeholder="Tags (comma-separated)"
            />
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Switch
                checked={p.featured}
                onCheckedChange={(v) => updateProject(p.id, { featured: v })}
              />
              <span className="text-xs text-muted-foreground">Featured</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Order:</span>
              <Input
                type="number"
                defaultValue={p.display_order}
                onBlur={(e) => updateProject(p.id, { display_order: parseInt(e.target.value) || 0 })}
                className="w-20"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-xs text-muted-foreground hover:text-foreground transition-colors">
              <Image size={14} />
              Upload Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadImage(p.id, file);
                }}
              />
            </label>

            {p.image_url && (
              <img src={p.image_url} alt="" className="h-10 w-10 rounded object-cover border border-border" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
