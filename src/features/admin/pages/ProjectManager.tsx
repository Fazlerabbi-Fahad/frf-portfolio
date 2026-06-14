import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { uploadToCloudinary, cloudinaryConfigured } from "@/lib/cloudinary";
import { Field, Input, Textarea, Button, Panel } from "../components/AdminUI";
import type { Project } from "@/lib/queries";

const empty = {
  title: "",
  year: "",
  role: "",
  blurb: "",
  coverImage: "",
  stack: "",
  challenge: "",
  solution: "",
  highlights: "",
  liveUrl: "",
  repoUrl: "",
  accent: "cyan" as "cyan" | "ember",
  metric: "",
  featured: false,
  published: true,
};

export function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<string | "new" | null>(null);
  const [form, setForm] = useState<typeof empty>(empty);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const load = () => api.get<Project[]>("/projects?all=1", true).then(setProjects);
  useEffect(() => {
    load();
  }, []);

  const openNew = () => {
    setForm(empty);
    setEditing("new");
    setError("");
  };
  const openEdit = (p: Project) => {
    setForm({
      title: p.title,
      year: p.year,
      role: p.role,
      blurb: p.blurb,
      coverImage: p.coverImage,
      stack: p.stack.join(", "),
      challenge: p.challenge,
      solution: p.solution,
      highlights: p.highlights.join("\n"),
      liveUrl: p.liveUrl,
      repoUrl: p.repoUrl,
      accent: p.accent,
      metric: p.metric,
      featured: p.featured,
      published: p.published,
    });
    setEditing(p._id);
    setError("");
  };

  const upload = async (file: File) => {
    setUploading(true);
    try {
      const { url } = await uploadToCloudinary(file);
      setForm((f) => ({ ...f, coverImage: url }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    setError("");
    const payload = {
      ...form,
      stack: form.stack.split(",").map((s) => s.trim()).filter(Boolean),
      highlights: form.highlights.split("\n").map((s) => s.trim()).filter(Boolean),
    };
    try {
      if (editing === "new") await api.post("/projects", payload, true);
      else await api.put(`/projects/${editing}`, payload, true);
      setEditing(null);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    }
  };

  const togglePublish = async (p: Project) => {
    await api.patch(`/projects/${p._id}/publish`, {}, true);
    load();
  };
  const remove = async (p: Project) => {
    if (!confirm(`Delete project "${p.title}"?`)) return;
    await api.del(`/projects/${p._id}`, true);
    load();
  };

  if (editing) {
    return (
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">
            {editing === "new" ? "New project" : "Edit project"}
          </h1>
          <Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
        </div>
        <Panel className="mt-6 space-y-5">
          <Field label="Title">
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Year">
              <Input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
            </Field>
            <Field label="Role">
              <Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
            </Field>
          </div>
          <Field label="Blurb (one-line summary)">
            <Input value={form.blurb} onChange={(e) => setForm({ ...form, blurb: e.target.value })} />
          </Field>
          <Field label="Cover image">
            <div className="flex items-center gap-3">
              <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
                className="text-sm text-ash file:mr-3 file:rounded-md file:border-0 file:bg-white/8 file:px-3 file:py-1.5 file:text-bone" />
              {uploading && <span className="text-sm text-cyan">Uploading…</span>}
            </div>
            {!cloudinaryConfigured() && <p className="mt-2 text-xs text-ember">Cloudinary not configured — paste a URL.</p>}
            <Input className="mt-2" placeholder="…or paste image URL" value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} />
            {form.coverImage && <img src={form.coverImage} alt="" className="mt-3 h-32 rounded-lg object-cover" />}
          </Field>
          <Field label="Tech stack (comma-separated)">
            <Input value={form.stack} onChange={(e) => setForm({ ...form, stack: e.target.value })} placeholder="React, Node, MongoDB" />
          </Field>
          <Field label="Challenge">
            <Textarea rows={3} value={form.challenge} onChange={(e) => setForm({ ...form, challenge: e.target.value })} />
          </Field>
          <Field label="Solution">
            <Textarea rows={3} value={form.solution} onChange={(e) => setForm({ ...form, solution: e.target.value })} />
          </Field>
          <Field label="Highlights (one per line)">
            <Textarea rows={4} value={form.highlights} onChange={(e) => setForm({ ...form, highlights: e.target.value })} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Live URL">
              <Input value={form.liveUrl} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} />
            </Field>
            <Field label="Repo URL">
              <Input value={form.repoUrl} onChange={(e) => setForm({ ...form, repoUrl: e.target.value })} />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Metric badge (e.g. 'Deployed')">
              <Input value={form.metric} onChange={(e) => setForm({ ...form, metric: e.target.value })} />
            </Field>
            <Field label="Accent">
              <select value={form.accent} onChange={(e) => setForm({ ...form, accent: e.target.value as "cyan" | "ember" })}
                className="w-full rounded-lg border border-white/10 bg-ink px-4 py-2.5 text-[15px] text-bone outline-none focus:border-electric">
                <option value="cyan">Cyan (engineering)</option>
                <option value="ember">Ember (creative)</option>
              </select>
            </Field>
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
              Featured on home
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
              Published
            </label>
          </div>
          {error && <p className="text-sm text-ember">{error}</p>}
          <div className="flex gap-3">
            <Button onClick={save}>Save</Button>
            <Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
          </div>
        </Panel>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
        <Button onClick={openNew}>New project</Button>
      </div>
      {error && <p className="mt-4 text-sm text-ember">{error}</p>}
      <div className="mt-6 space-y-3">
        {projects.map((p) => (
          <Panel key={p._id} className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate font-medium">
                {p.title}
                {p.featured && <span className="ml-2 font-mono text-[10px] text-cyan">FEATURED</span>}
              </p>
              <p className="mt-1 font-mono text-[11px] text-ash">
                {p.year} · {p.published ? "published" : "hidden"}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button variant="ghost" onClick={() => togglePublish(p)} className="px-3 py-1.5">
                {p.published ? "Hide" : "Show"}
              </Button>
              <Button variant="ghost" onClick={() => openEdit(p)} className="px-3 py-1.5">Edit</Button>
              <Button variant="danger" onClick={() => remove(p)} className="px-3 py-1.5">Delete</Button>
            </div>
          </Panel>
        ))}
        {!projects.length && <p className="text-sm text-ash">No projects yet.</p>}
      </div>
    </div>
  );
}
