import { Navbar } from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CollegesAdmin } from "@/components/admin/CollegesAdmin";
import { BlogAdmin } from "@/components/admin/BlogAdmin";
import { ProjectsAdmin } from "@/components/admin/ProjectsAdmin";
import { LabAdmin } from "@/components/admin/LabAdmin";
import { IdeasAdmin } from "@/components/admin/IdeasAdmin";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const AdminPage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-2xl font-bold">Admin Panel</h1>
              <p className="text-sm text-muted-foreground">Manage your content</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut size={14} /> Sign Out
            </Button>
          </div>

          <Tabs defaultValue="colleges">
            <TabsList className="flex-wrap">
              <TabsTrigger value="colleges">Colleges</TabsTrigger>
              <TabsTrigger value="blog">Blog</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="lab">Lab</TabsTrigger>
              <TabsTrigger value="ideas">Ideas</TabsTrigger>
            </TabsList>
            <TabsContent value="colleges">
              <CollegesAdmin />
            </TabsContent>
            <TabsContent value="blog">
              <BlogAdmin />
            </TabsContent>
            <TabsContent value="projects">
              <ProjectsAdmin />
            </TabsContent>
            <TabsContent value="lab">
              <LabAdmin />
            </TabsContent>
            <TabsContent value="ideas">
              <IdeasAdmin />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
};

export default AdminPage;
