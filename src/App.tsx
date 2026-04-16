import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { StarfieldBackground } from "@/components/StarfieldBackground";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
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
import GalleryPage from "./pages/GalleryPage";
import { MobileBottomNav } from "@/components/MobileBottomNav";

const queryClient = new QueryClient();

const isGallerySubdomain = () =>
  typeof window !== "undefined" && window.location.hostname.startsWith("gallery.");

const AnimatedRoutes = () => {
  const location = useLocation();
  const galleryHost = isGallerySubdomain();

  // gallery.juanignacioramos.com → only shows the gallery
  if (galleryHost) {
    return (
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
          <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
          <Route path="*" element={<PageTransition><GalleryPage /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><ProjectsPage /></PageTransition>} />
        <Route path="/colleges" element={<PageTransition><CollegesPage /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><BlogPage /></PageTransition>} />
        <Route path="/blog/:slug" element={<PageTransition><BlogPostPage /></PageTransition>} />
        <Route path="/documents" element={<PageTransition><DocumentsPage /></PageTransition>} />
        <Route path="/services" element={<PageTransition><ServicesPage /></PageTransition>} />
        <Route path="/services/:slug" element={<PageTransition><ServiceDetailPage /></PageTransition>} />
        <Route path="/lab" element={<PageTransition><LabPage /></PageTransition>} />
        <Route path="/ideas" element={<PageTransition><IdeasPage /></PageTransition>} />
        {/* Gallery is only accessible via gallery.juanignacioramos.com */}
        <Route path="/gallery" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
        <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const galleryHost = isGallerySubdomain();
  return (
    <ThemeProvider>
      <LanguageProvider>
        {!galleryHost && <StarfieldBackground />}
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AnimatedRoutes />
              {!galleryHost && <MobileBottomNav />}
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
