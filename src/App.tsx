import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { StarfieldBackground } from "@/components/StarfieldBackground";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ContactPage from "./pages/ContactPage";
import ProjectsPage from "./pages/ProjectsPage";
import CollegesPage from "./pages/CollegesPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import DocumentsPage from "./pages/DocumentsPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import LabPage from "./pages/LabPage";
import IdeasPage from "./pages/IdeasPage";
import { MobileBottomNav } from "@/components/MobileBottomNav";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <StarfieldBackground />
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/colleges" element={<CollegesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/lab" element={<LabPage />} />
            <Route path="/ideas" element={<IdeasPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <MobileBottomNav />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
