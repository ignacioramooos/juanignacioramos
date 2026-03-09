import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Trash2, Plus } from "lucide-react";

const ICON_OPTIONS = ["Lightbulb", "Droplets", "BarChart3", "Globe2", "Rocket", "Beaker"] as const;

interface Idea {
  id: string;
  title: string;
  description: string;
  status: string;
  icon: string;
  published: boolean;
  display_order: number;
}

export const IdeasAdmin = () => {
  const queryClient = useQueryClient();
  const [newIdea, setNewIdea] = useState({ title: "", description: "", status: "idea", icon: "Lightbulb", published: true });

  const { data: ideas = [], isLoading } = useQuery({
    queryKey: ["admin-ideas"],
    queryFn: async () => {
      const { data, error } = await supabase.from("ideas").select("*").order("display_order");
      if (error) throw error;
      return data as Idea[];
    },
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("ideas").insert({
        title: newIdea.title,
        description: newIdea.description,
        status: newIdea.status,
        icon: newIdea.icon,
        published: newIdea.published,
        display_order: ideas.length,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-ideas"] });
      setNewIdea({ title: "", description: "", status: "idea", icon: "Lightbulb", published: true });
      toast.success("Idea added");
    },
    onError: () => toast.error("Failed to add idea"),
  });

  const togglePublished = useMutation({
    mutationFn: async ({ id, published }: { id: string; published: boolean }) => {
      const { error } = await supabase.from("ideas").update({ published }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-ideas"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("ideas").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-ideas"] });
      toast.success("Idea deleted");
    },
  });

  return (
    <div className="space-y-6 mt-4">
      <div className="p-4 rounded-xl border border-border bg-card space-y-3">
        <h3 className="font-semibold text-sm">Add Idea</h3>
        <Input placeholder="Title" value={newIdea.title} onChange={(e) => setNewIdea({ ...newIdea, title: e.target.value })} />
        <Textarea placeholder="Description" value={newIdea.description} onChange={(e) => setNewIdea({ ...newIdea, description: e.target.value })} />
        <div className="grid grid-cols-3 gap-2">
          <select className="rounded-md border border-border bg-background px-3 py-2 text-sm" value={newIdea.status} onChange={(e) => setNewIdea({ ...newIdea, status: e.target.value })}>
            <option value="idea">Idea</option>
            <option value="research">Research</option>
            <option value="prototype">Prototype</option>
          </select>
          <select className="rounded-md border border-border bg-background px-3 py-2 text-sm" value={newIdea.icon} onChange={(e) => setNewIdea({ ...newIdea, icon: e.target.value })}>
            {ICON_OPTIONS.map((icon) => (
              <option key={icon} value={icon}>{icon}</option>
            ))}
          </select>
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <Switch checked={newIdea.published} onCheckedChange={(v) => setNewIdea({ ...newIdea, published: v })} />
            Published
          </label>
        </div>
        <Button size="sm" onClick={() => addMutation.mutate()} disabled={!newIdea.title || addMutation.isPending}>
          <Plus size={14} /> Add
        </Button>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading...</p>
      ) : ideas.length === 0 ? (
        <p className="text-sm text-muted-foreground">No ideas yet.</p>
      ) : (
        <div className="space-y-2">
          {ideas.map((idea) => (
            <div key={idea.id} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card">
              <Switch checked={idea.published} onCheckedChange={(v) => togglePublished.mutate({ id: idea.id, published: v })} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{idea.title}</p>
                <p className="text-xs text-muted-foreground">{idea.icon} · {idea.status}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(idea.id)}>
                <Trash2 size={14} className="text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
