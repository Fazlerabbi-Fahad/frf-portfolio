import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AmbientField } from "@/components/layout/AmbientField";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { HomePage } from "@/features/home/HomePage";
import { usePageTracking } from "@/lib/usePageTracking";
// lazy-load non-home routes so heavy deps (markdown, syntax highlighter) split out
const ProjectsPage = lazy(() =>
  import("@/features/projects/ProjectsPage").then((m) => ({
    default: m.ProjectsPage,
  })),
);
const ProjectDetailPage = lazy(() =>
  import("@/features/projects/ProjectDetailPage").then((m) => ({
    default: m.ProjectDetailPage,
  })),
);
const AboutPage = lazy(() =>
  import("@/features/about/AboutPage").then((m) => ({ default: m.AboutPage })),
);
const BlogPage = lazy(() =>
  import("@/features/blog/BlogPage").then((m) => ({ default: m.BlogPage })),
);
const BlogDetailPage = lazy(() =>
  import("@/features/blog/BlogDetailPage").then((m) => ({
    default: m.BlogDetailPage,
  })),
);
const GalleryPage = lazy(() =>
  import("@/features/gallery/GalleryPage").then((m) => ({
    default: m.GalleryPage,
  })),
);
const GalleryDetailPage = lazy(() =>
  import("@/features/gallery/GalleryDetailPage").then((m) => ({
    default: m.GalleryDetailPage,
  })),
);
const ContactPage = lazy(() =>
  import("@/features/contact/ContactPage").then((m) => ({
    default: m.ContactPage,
  })),
);
const AdminApp = lazy(() =>
  import("@/features/admin/AdminApp").then((m) => ({ default: m.AdminApp })),
);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

function Page({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      {children}
    </motion.main>
  );
}

const Loading = () => (
  <div className="py-32 text-center font-mono text-sm text-ash">Loading…</div>
);

function PublicSite() {
  const location = useLocation();
  usePageTracking();
  return (
    <div className="grain relative min-h-screen">
      <AmbientField />
      <Nav />
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <Page>
                  <HomePage />
                </Page>
              }
            />
            <Route
              path="/projects"
              element={
                <Page>
                  <ProjectsPage />
                </Page>
              }
            />
            <Route
              path="/projects/:slug"
              element={
                <Page>
                  <ProjectDetailPage />
                </Page>
              }
            />
            <Route
              path="/blog"
              element={
                <Page>
                  <BlogPage />
                </Page>
              }
            />
            <Route
              path="/blog/:slug"
              element={
                <Page>
                  <BlogDetailPage />
                </Page>
              }
            />
            <Route
              path="/gallery"
              element={
                <Page>
                  <GalleryPage />
                </Page>
              }
            />
            <Route
              path="/gallery/:slug"
              element={
                <Page>
                  <GalleryDetailPage />
                </Page>
              }
            />
            <Route
              path="/about"
              element={
                <Page>
                  <AboutPage />
                </Page>
              }
            />
            <Route
              path="/contact"
              element={
                <Page>
                  <ContactPage />
                </Page>
              }
            />
            <Route
              path="*"
              element={
                <Page>
                  <HomePage />
                </Page>
              }
            />
          </Routes>
        </AnimatePresence>
      </Suspense>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <div className="grain relative min-h-screen">
              <AdminApp />
            </div>
          }
        />
        <Route path="/*" element={<PublicSite />} />
      </Routes>
    </Suspense>
  );
}
