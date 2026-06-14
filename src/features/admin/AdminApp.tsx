import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import { AdminLayout } from "./AdminLayout";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { BlogManager } from "./pages/BlogManager";
import { AlbumManager } from "./pages/AlbumManager";
import { ProjectManager } from "./pages/ProjectManager";
import { TestimonialManager } from "./pages/TestimonialManager";
import { MediaManager } from "./pages/MediaManager";
import { ProfilePage } from "./pages/ProfilePage";

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <div className="py-32 text-center font-mono text-sm text-ash">Loading…</div>;
  }
  if (!user) return <Navigate to="/admin/login" state={{ from: location }} replace />;
  return <>{children}</>;
}

export function AdminApp() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route
          element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="projects" element={<ProjectManager />} />
          <Route path="blogs" element={<BlogManager />} />
          <Route path="albums" element={<AlbumManager />} />
          <Route path="testimonials" element={<TestimonialManager />} />
          <Route path="media" element={<MediaManager />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AuthProvider>
  );
}
