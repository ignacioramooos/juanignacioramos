import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Trash2, Plus, Save } from "lucide-react";

interface College {
  id: string;
  name: string;
  location: string;
  status: string;
  cost_of_attendance: number | null;
  financial_aid: number | null;
  notes: string | null;
  display_order: number;
}

const emptyCollege = (): Omit<College, "id"> => ({
  name: "",
  location: "",
  status: "accepted",
  cost_of_attendance: null,
  financial_aid: null,
  notes: null,
  display_order: 0,
});

export const CollegesAdmin = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchColleges = async () => {
    const { data } = await supabase.from("colleges").select("*").order("display_order");
    setColleges((data as College[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchColleges(); }, []);

  const saveCollege = async (college: College) => {
    const { error } = await supabase.from("colleges").update({
      name: college.name,
      location: college.location,
      status: college.status,
      cost_of_attendance: college.cost_of_attendance,
      financial_aid: college.financial_aid,
      notes: college.notes,
      display_order: college.display_order,
    }).eq("id", college.id);
    if (error) toast.error(error.message);
    else toast.success(`${college.name} saved`);
  };

  const addCollege = async () => {
    const { error } = await supabase.from("colleges").insert(emptyCollege());
    if (error) toast.error(error.message);
    else { toast.success("College added"); fetchColleges(); }
  };

  const deleteCollege = async (id: string) => {
    const { error } = await supabase.from("colleges").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); setColleges((p) => p.filter((c) => c.id !== id)); }
  };

  const update = (id: string, field: keyof College, value: unknown) => {
    setColleges((p) => p.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-display font-semibold">Colleges ({colleges.length})</h3>
        <Button size="sm" onClick={addCollege}><Plus size={14} /> Add</Button>
      </div>

      {colleges.map((c) => (
        <div key={c.id} className="p-4 rounded-xl border border-border bg-card space-y-3">
          <div className="grid sm:grid-cols-3 gap-3">
            <Input placeholder="Name" value={c.name} onChange={(e) => update(c.id, "name", e.target.value)} />
            <Input placeholder="Location" value={c.location} onChange={(e) => update(c.id, "location", e.target.value)} />
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={c.status}
              onChange={(e) => update(c.id, "status", e.target.value)}
            >
              <option value="accepted">Accepted</option>
              <option value="waitlisted">Waitlisted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            <Input type="number" placeholder="Cost of Attendance" value={c.cost_of_attendance ?? ""} onChange={(e) => update(c.id, "cost_of_attendance", e.target.value ? Number(e.target.value) : null)} />
            <Input type="number" placeholder="Financial Aid" value={c.financial_aid ?? ""} onChange={(e) => update(c.id, "financial_aid", e.target.value ? Number(e.target.value) : null)} />
            <Input type="number" placeholder="Display Order" value={c.display_order} onChange={(e) => update(c.id, "display_order", Number(e.target.value))} />
          </div>
          <Textarea placeholder="Notes (optional)" value={c.notes ?? ""} onChange={(e) => update(c.id, "notes", e.target.value || null)} rows={2} />
          <div className="flex gap-2">
            <Button size="sm" onClick={() => saveCollege(c)}><Save size={14} /> Save</Button>
            <Button size="sm" variant="destructive" onClick={() => deleteCollege(c.id)}><Trash2 size={14} /> Delete</Button>
          </div>
        </div>
      ))}
    </div>
  );
};
