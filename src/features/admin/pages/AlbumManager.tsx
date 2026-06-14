import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { uploadToCloudinary, cloudinaryConfigured } from "@/lib/cloudinary";
import { Field, Input, Textarea, Button, Panel } from "../components/AdminUI";

type Album = {
  _id: string;
  name: string;
  slug: string;
  story: string;
  location: string;
  travelDate?: string;
  coverImage: string;
  photoCount?: number;
};
type Photo = { _id: string; url: string; caption: string };

const empty = { name: "", story: "", location: "", travelDate: "", coverImage: "" };

export function AlbumManager() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [editing, setEditing] = useState<string | "new" | null>(null);
  const [form, setForm] = useState<typeof empty>(empty);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [activeAlbum, setActiveAlbum] = useState<Album | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const load = () => api.get<Album[]>("/albums").then(setAlbums);
  useEffect(() => {
    load();
  }, []);

  const openNew = () => {
    setForm(empty);
    setEditing("new");
    setError("");
  };
  const openEdit = (a: Album) => {
    setForm({
      name: a.name,
      story: a.story,
      location: a.location,
      travelDate: a.travelDate?.slice(0, 10) ?? "",
      coverImage: a.coverImage,
    });
    setEditing(a._id);
    setError("");
  };

  const uploadCover = async (file: File) => {
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
    const payload = { ...form, travelDate: form.travelDate || undefined };
    try {
      if (editing === "new") await api.post("/albums", payload, true);
      else await api.put(`/albums/${editing}`, payload, true);
      setEditing(null);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    }
  };

  const remove = async (a: Album) => {
    if (!confirm(`Delete album "${a.name}" and all its photos?`)) return;
    await api.del(`/albums/${a._id}`, true);
    load();
  };

  const openPhotos = async (a: Album) => {
    setActiveAlbum(a);
    const data = await api.get<{ photos: Photo[] }>(`/albums/${a.slug}`);
    setPhotos(data.photos);
  };

  const addPhoto = async (file: File) => {
    if (!activeAlbum) return;
    setUploading(true);
    try {
      const { url, width, height } = await uploadToCloudinary(file);
      await api.post("/albums/photos", { album: activeAlbum._id, url, width, height }, true);
      openPhotos(activeAlbum);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const deletePhoto = async (p: Photo) => {
    await api.del(`/albums/photos/${p._id}`, true);
    if (activeAlbum) openPhotos(activeAlbum);
  };

  // photo management view
  if (activeAlbum) {
    return (
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">{activeAlbum.name} — photos</h1>
          <Button variant="ghost" onClick={() => setActiveAlbum(null)}>
            Back to albums
          </Button>
        </div>
        <Panel className="mt-6">
          <div className="flex items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && addPhoto(e.target.files[0])}
              className="text-sm text-ash file:mr-3 file:rounded-md file:border-0 file:bg-white/8 file:px-3 file:py-1.5 file:text-bone"
            />
            {uploading && <span className="text-sm text-cyan">Uploading…</span>}
          </div>
          {error && <p className="mt-2 text-sm text-ember">{error}</p>}
        </Panel>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {photos.map((p) => (
            <div key={p._id} className="group relative overflow-hidden rounded-xl border border-white/8">
              <img src={p.url} alt={p.caption} className="aspect-square w-full object-cover" />
              <button
                onClick={() => deletePhoto(p)}
                className="absolute right-2 top-2 rounded-md bg-ink/80 px-2 py-1 text-xs text-ember opacity-0 transition-opacity group-hover:opacity-100"
              >
                Delete
              </button>
            </div>
          ))}
          {!photos.length && <p className="text-sm text-ash">No photos yet.</p>}
        </div>
      </div>
    );
  }

  // create/edit album view
  if (editing) {
    return (
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">
            {editing === "new" ? "New album" : "Edit album"}
          </h1>
          <Button variant="ghost" onClick={() => setEditing(null)}>
            Cancel
          </Button>
        </div>
        <Panel className="mt-6 space-y-5">
          <Field label="Album name">
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>
          <Field label="Location">
            <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          </Field>
          <Field label="Travel date">
            <Input
              type="date"
              value={form.travelDate}
              onChange={(e) => setForm({ ...form, travelDate: e.target.value })}
            />
          </Field>
          <Field label="Cover image">
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && uploadCover(e.target.files[0])}
                className="text-sm text-ash file:mr-3 file:rounded-md file:border-0 file:bg-white/8 file:px-3 file:py-1.5 file:text-bone"
              />
              {uploading && <span className="text-sm text-cyan">Uploading…</span>}
            </div>
            {!cloudinaryConfigured() && (
              <p className="mt-2 text-xs text-ember">Cloudinary not configured — paste a URL instead.</p>
            )}
            <Input
              className="mt-2"
              placeholder="…or paste image URL"
              value={form.coverImage}
              onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
            />
            {form.coverImage && <img src={form.coverImage} alt="" className="mt-3 h-32 rounded-lg object-cover" />}
          </Field>
          <Field label="Story">
            <Textarea
              rows={6}
              value={form.story}
              onChange={(e) => setForm({ ...form, story: e.target.value })}
            />
          </Field>
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

  // album list view
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Gallery</h1>
        <Button onClick={openNew}>New album</Button>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {albums.map((a) => (
          <Panel key={a._id}>
            {a.coverImage && (
              <img src={a.coverImage} alt="" className="mb-4 h-36 w-full rounded-lg object-cover" />
            )}
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium">{a.name}</p>
                <p className="mt-1 font-mono text-[11px] text-ash">
                  {a.photoCount ?? 0} photos {a.location && `· ${a.location}`}
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="ghost" onClick={() => openPhotos(a)} className="px-3 py-1.5">
                Photos
              </Button>
              <Button variant="ghost" onClick={() => openEdit(a)} className="px-3 py-1.5">
                Edit
              </Button>
              <Button variant="danger" onClick={() => remove(a)} className="px-3 py-1.5">
                Delete
              </Button>
            </div>
          </Panel>
        ))}
        {!albums.length && <p className="text-sm text-ash">No albums yet.</p>}
      </div>
    </div>
  );
}
