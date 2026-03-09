import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Trash2, Plus } from "lucide-react";

interface LabEntry {
  id: string;
  title: string;
  content: string;
  status: string;
  tags: string[];
  published: boolean;
  date: string;
}

export const LabAdmin = () => {
  const queryClient = useQueryClient();
  const [newEntry, setNewEntry] = useState({ title: "", content: "", status: "idea", tags: "", date: new Date().toISOString().slice(0, 10), published: false });

  const { data: entries = [], isLoading } = useQuery({
    queryKey: ["admin-lab-entries"],
    queryFn: async () => {
      const { data, error } = await supabase.from("lab_entries").select("*").order("date", { ascending: false });
      if (error) throw error;
      return data as LabEntry[];
    },
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("lab_entries").insert({
        title: newEntry.title,
        content: newEntry.content,
        status: newEntry.status,
        tags: newEntry.tags.split(",").map((t) => t.trim()).filter(Boolean),
        date: newEntry.date,
        published: newEntry.published,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-lab-entries"] });
      setNewEntry({ title: "", content: "", status: "idea", tags: "", date: new Date().toISOString().slice(0, 10), published: false });
      toast.success("Lab entry added");
    },
    onError: () => toast.error("Failed to add entry"),
  });

  const togglePublished = useMutation({
    mutationFn: async ({ id, published }: { id: string; published: boolean }) => {
      const { error } = await supabase.from("lab_entries").update({ published }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-lab-entries"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("lab_entries").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-lab-entries"] });
      toast.success("Entry deleted");
    },
  });

  return (
    <div className="space-y-6 mt-4">
      <div className="p-4 rounded-xl border border-border bg-card space-y-3">
        <h3 className="font-semibold text-sm">Add Lab Entry</h3>
        <Input placeholder="Title" value={newEntry.title} onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })} />
        <Textarea placeholder="Content / notes" value={newEntry.content} onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })} />
        <div className="grid grid-cols-3 gap-2">
          <Input placeholder="Date (YYYY-MM-DD)" value={newEntry.date} onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })} />
          <select className="rounded-md border border-border bg-background px-3 py-2 text-sm" value={newEntry.status} onChange={(e) => setNewEntry({ ...newEntry, status: e.target.value })}>
            <option value="idea">Idea</option>
            <option value="research">Research</option>
            <option value="prototype">Prototype</option>
          </select>
          <Input placeholder="Tags (comma-separated)" value={newEntry.tags} onChange={(e) => setNewEntry({ ...newEntry, tags: e.target.value })} />
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <Switch checked={newEntry.published} onCheckedChange={(v) => setNewEntry({ ...newEntry, published: v })} />
            Publish immediately
          </label>
          <Button size="sm" onClick={() => addMutation.mutate()} disabled={!newEntry.title || addMutation.isPending}>
            <Plus size={14} /> Add
          </Button>
        </div>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading...</p>
      ) : entries.length === 0 ? (
        <p className="text-sm text-muted-foreground">No lab entries yet.</p>
      ) : (
        <div className="space-y-2">
          {entries.map((entry) => (
            <div key={entry.id} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card">
              <Switch checked={entry.published} onCheckedChange={(v) => togglePublished.mutate({ id: entry.id, published: v })} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{entry.title}</p>
                <p className="text-xs text-muted-foreground">{entry.date} · {entry.status} · {entry.tags.join(", ")}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(entry.id)}>
                <Trash2 size={14} className="text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
