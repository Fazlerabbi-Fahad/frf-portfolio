import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "../AuthContext";
import { uploadToCloudinary, cloudinaryConfigured } from "@/lib/cloudinary";
import { Field, Input, Textarea, Button, Panel } from "../components/AdminUI";

type Profile = { name: string; avatar: string; bio: string };

export function ProfilePage() {
  const { user } = useAuth();
  const [form, setForm] = useState<Profile>({ name: "", avatar: "", bio: "" });
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // load the current profile when the screen opens
  useEffect(() => {
    api.get<Profile & { email: string }>("/auth/me", true)
      .then((u) => setForm({ name: u.name ?? "", avatar: (u as any).avatar ?? "", bio: (u as any).bio ?? "" }))
      .catch((e) => setError(e.message));
  }, []);

  const onUpload = async (file: File) => {
    setUploading(true);
    setError("");
    try {
      const { url } = await uploadToCloudinary(file);
      setForm((f) => ({ ...f, avatar: url }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    setError("");
    setSaved(false);
    try {
      await api.patch("/auth/profile", form, true);
      setSaved(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
      <p className="mt-2 text-sm text-ash">This name and photo appear as the byline on your blog posts.</p>

      <Panel className="mt-6 max-w-xl space-y-5">
        <Field label="Display name">
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </Field>

        <Field label="Avatar">
          <div className="flex items-center gap-4">
            {form.avatar && (
              <img src={form.avatar} alt="" className="h-16 w-16 rounded-full object-cover" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])}
              className="text-sm text-ash file:mr-3 file:rounded-md file:border-0 file:bg-white/8 file:px-3 file:py-1.5 file:text-bone"
            />
            {uploading && <span className="text-sm text-cyan">Uploading…</span>}
          </div>
          {!cloudinaryConfigured() && (
            <p className="mt-2 text-xs text-ember">Cloudinary not configured — paste a URL below.</p>
          )}
          <Input
            className="mt-2"
            placeholder="…or paste image URL"
            value={form.avatar}
            onChange={(e) => setForm({ ...form, avatar: e.target.value })}
          />
        </Field>

        <Field label="Short bio (optional)">
          <Textarea rows={3} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
        </Field>

        {error && <p className="text-sm text-ember">{error}</p>}
        {saved && <p className="text-sm text-cyan">Saved ✓</p>}

        <Button onClick={save} disabled={uploading}>Save profile</Button>
      </Panel>
    </div>
  );
}