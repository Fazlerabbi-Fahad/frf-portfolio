import { useState } from "react";
import { uploadToCloudinary, cloudinaryConfigured } from "@/lib/cloudinary";
import { Panel } from "../components/AdminUI";

type Item = { url: string; width: number; height: number };

export function MediaManager() {
  const [items, setItems] = useState<Item[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  const onFiles = async (files: FileList) => {
    setError("");
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const res = await uploadToCloudinary(file);
        setItems((prev) => [res, ...prev]);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const copy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(""), 1500);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Media</h1>
      <p className="mt-2 text-sm text-ash">
        Upload images to Cloudinary and copy the URL into any blog or album.
      </p>

      <Panel className="mt-6">
        <div className="flex items-center gap-3">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => e.target.files && onFiles(e.target.files)}
            className="text-sm text-ash file:mr-3 file:rounded-md file:border-0 file:bg-white/8 file:px-3 file:py-1.5 file:text-bone"
          />
          {uploading && <span className="text-sm text-cyan">Uploading…</span>}
        </div>
        {!cloudinaryConfigured() && (
          <p className="mt-3 text-xs text-ember">
            Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in your .env to enable uploads.
          </p>
        )}
        {error && <p className="mt-3 text-sm text-ember">{error}</p>}
      </Panel>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((it) => (
          <div key={it.url} className="overflow-hidden rounded-xl border border-white/8">
            <img src={it.url} alt="" className="aspect-square w-full object-cover" />
            <button
              onClick={() => copy(it.url)}
              className="w-full bg-ink/60 py-2 text-xs text-bone/80 transition-colors hover:text-bone"
            >
              {copied === it.url ? "Copied!" : "Copy URL"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
