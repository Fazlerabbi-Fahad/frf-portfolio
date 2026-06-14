import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { uploadToCloudinary, cloudinaryConfigured } from "@/lib/cloudinary";
import { Field, Input, Textarea, Button, Panel } from "../components/AdminUI";
import type { Testimonial } from "@/lib/queries";

const empty = { quote: "", author: "", title: "", avatar: "", rating: 5, published: true, order: 0 };

export function TestimonialManager() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<string | "new" | null>(null);
  const [form, setForm] = useState<typeof empty>(empty);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const load = () => api.get<Testimonial[]>("/testimonials?all=1", true).then(setItems);
  useEffect(() => {
    load();
  }, []);

  const openNew = () => {
    setForm(empty);
    setEditing("new");
    setError("");
  };
  const openEdit = (t: Testimonial) => {
    setForm({
      quote: t.quote,
      author: t.author,
      title: t.title,
      avatar: t.avatar,
      rating: t.rating,
      published: t.published,
      order: t.order,
    });
    setEditing(t._id);
    setError("");
  };

  const upload = async (file: File) => {
    setUploading(true);
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
    try {
      if (editing === "new") await api.post("/testimonials", form, true);
      else await api.put(`/testimonials/${editing}`, form, true);
      setEditing(null);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    }
  };

  const remove = async (t: Testimonial) => {
    if (!confirm(`Delete testimonial from ${t.author}?`)) return;
    await api.del(`/testimonials/${t._id}`, true);
    load();
  };

  if (editing) {
    return (
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">
            {editing === "new" ? "New testimonial" : "Edit testimonial"}
          </h1>
          <Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
        </div>
        <Panel className="mt-6 space-y-5">
          <Field label="Quote">
            <Textarea rows={4} value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Author name">
              <Input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
            </Field>
            <Field label="Role / company">
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="CEO, Acme · via Upwork" />
            </Field>
          </div>
          <Field label="Avatar (optional)">
            <div className="flex items-center gap-3">
              <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
                className="text-sm text-ash file:mr-3 file:rounded-md file:border-0 file:bg-white/8 file:px-3 file:py-1.5 file:text-bone" />
              {uploading && <span className="text-sm text-cyan">Uploading…</span>}
            </div>
            {!cloudinaryConfigured() && <p className="mt-2 text-xs text-ember">Cloudinary not configured — paste a URL.</p>}
            <Input className="mt-2" placeholder="…or paste image URL" value={form.avatar} onChange={(e) => setForm({ ...form, avatar: e.target.value })} />
            {form.avatar && <img src={form.avatar} alt="" className="mt-3 h-12 w-12 rounded-full object-cover" />}
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Rating (1–5)">
              <Input type="number" min={1} max={5} value={form.rating}
                onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} />
            </Field>
            <Field label="Order (lower = first)">
              <Input type="number" value={form.order}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
            </Field>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
            Published
          </label>
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
        <h1 className="text-2xl font-semibold tracking-tight">Testimonials</h1>
        <Button onClick={openNew}>New testimonial</Button>
      </div>
      {error && <p className="mt-4 text-sm text-ember">{error}</p>}
      <div className="mt-6 space-y-3">
        {items.map((t) => (
          <Panel key={t._id} className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-ember">{"★".repeat(t.rating)}</p>
              <p className="mt-1 line-clamp-2 text-[15px] text-bone/85">"{t.quote}"</p>
              <p className="mt-1 font-mono text-[11px] text-ash">
                {t.author} {t.title && `· ${t.title}`} {!t.published && "· hidden"}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button variant="ghost" onClick={() => openEdit(t)} className="px-3 py-1.5">Edit</Button>
              <Button variant="danger" onClick={() => remove(t)} className="px-3 py-1.5">Delete</Button>
            </div>
          </Panel>
        ))}
        {!items.length && <p className="text-sm text-ash">No testimonials yet.</p>}
      </div>
    </div>
  );
}
