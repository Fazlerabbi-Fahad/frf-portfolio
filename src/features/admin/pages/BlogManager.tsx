import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { uploadToCloudinary, cloudinaryConfigured } from "@/lib/cloudinary";
import { Field, Input, Textarea, Button, Panel } from "../components/AdminUI";

type Cat = { _id: string; name: string };
type Tag = { _id: string; name: string };
type Blog = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  published: boolean;
  category?: Cat;
  tags?: Tag[];
  readingMinutes: number;
};

const empty = { title: "", excerpt: "", content: "", coverImage: "", category: "", published: false };

export function BlogManager() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [cats, setCats] = useState<Cat[]>([]);
  const [editing, setEditing] = useState<string | "new" | null>(null);
  const [form, setForm] = useState<typeof empty>(empty);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const load = () =>
    api.get<{ items: Blog[] }>("/blogs?all=1&limit=50").then((r) => setBlogs(r.items));

  useEffect(() => {
    load();
    api.get<Cat[]>("/categories").then(setCats).catch(() => {});
  }, []);

  const openNew = () => {
    setForm(empty);
    setEditing("new");
    setError("");
  };
  const openEdit = (b: Blog) => {
    setForm({
      title: b.title,
      excerpt: b.excerpt,
      content: b.content,
      coverImage: b.coverImage,
      category: b.category?._id ?? "",
      published: b.published,
    });
    setEditing(b._id);
    setError("");
  };

  const onUpload = async (file: File) => {
    setUploading(true);
    setError("");
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
    const payload = { ...form, category: form.category || undefined };
    try {
      if (editing === "new") await api.post("/blogs", payload, true);
      else await api.put(`/blogs/${editing}`, payload, true);
      setEditing(null);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    }
  };

  const togglePublish = async (b: Blog) => {
    await api.patch(`/blogs/${b._id}/publish`, {}, true);
    load();
  };
  const remove = async (b: Blog) => {
    if (!confirm(`Delete "${b.title}"?`)) return;
    await api.del(`/blogs/${b._id}`, true);
    load();
  };

  if (editing) {
    return (
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">
            {editing === "new" ? "New post" : "Edit post"}
          </h1>
          <Button variant="ghost" onClick={() => setEditing(null)}>
            Cancel
          </Button>
        </div>
        <Panel className="mt-6 space-y-5">
          <Field label="Title">
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </Field>
          <Field label="Excerpt">
            <Input value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
          </Field>
          <Field label="Category">
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-ink px-4 py-2.5 text-[15px] text-bone outline-none focus:border-electric"
            >
              <option value="">— none —</option>
              {cats.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Cover image">
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])}
                className="text-sm text-ash file:mr-3 file:rounded-md file:border-0 file:bg-white/8 file:px-3 file:py-1.5 file:text-bone"
              />
              {uploading && <span className="text-sm text-cyan">Uploading…</span>}
            </div>
            {!cloudinaryConfigured() && (
              <p className="mt-2 text-xs text-ember">
                Cloudinary not configured — paste a URL below instead.
              </p>
            )}
            <Input
              className="mt-2"
              placeholder="…or paste image URL"
              value={form.coverImage}
              onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
            />
            {form.coverImage && (
              <img src={form.coverImage} alt="" className="mt-3 h-32 rounded-lg object-cover" />
            )}
          </Field>
          <Field label="Content (Markdown supported)">
            <Textarea
              rows={12}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
          </Field>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
            />
            Published
          </label>
          {error && <p className="text-sm text-ember">{error}</p>}
          <div className="flex gap-3">
            <Button onClick={save}>Save</Button>
            <Button variant="ghost" onClick={() => setEditing(null)}>
              Cancel
            </Button>
          </div>
        </Panel>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Blogs</h1>
        <Button onClick={openNew}>New post</Button>
      </div>
      {error && <p className="mt-4 text-sm text-ember">{error}</p>}
      <div className="mt-6 space-y-3">
        {blogs.map((b) => (
          <Panel key={b._id} className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate font-medium">{b.title}</p>
              <p className="mt-1 font-mono text-[11px] text-ash">
                {b.readingMinutes} min · {b.published ? "published" : "draft"}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button variant="ghost" onClick={() => togglePublish(b)} className="px-3 py-1.5">
                {b.published ? "Unpublish" : "Publish"}
              </Button>
              <Button variant="ghost" onClick={() => openEdit(b)} className="px-3 py-1.5">
                Edit
              </Button>
              <Button variant="danger" onClick={() => remove(b)} className="px-3 py-1.5">
                Delete
              </Button>
            </div>
          </Panel>
        ))}
        {!blogs.length && <p className="text-sm text-ash">No posts yet.</p>}
      </div>
    </div>
  );
}
