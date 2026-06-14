import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { api } from "@/lib/api";
import { Section, Eyebrow } from "@/components/ui/Primitives";
import { Reveal } from "@/components/motion/Reveal";
import { useSiteAuthor } from "@/lib/queries";

type Photo = { _id: string; url: string; caption: string };
type Album = {
  name: string;
  story: string;
  location: string;
  travelDate?: string;
};

export function GalleryDetailPage() {
  const { slug } = useParams();
  const [album, setAlbum] = useState<Album | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [err, setErr] = useState("");
  const [active, setActive] = useState<number | null>(null);
  const { data: author } = useSiteAuthor();

  useEffect(() => {
    api
      .get<{ album: Album; photos: Photo[] }>(`/albums/${slug}`)
      .then((d) => {
        setAlbum(d.album);
        setPhotos(d.photos);
      })
      .catch((e) => setErr(e.message));
  }, [slug]);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () =>
      setActive((i) =>
        i === null ? null : (i - 1 + photos.length) % photos.length,
      ),
    [photos.length],
  );
  const next = useCallback(
    () => setActive((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close, prev, next]);

  if (err) {
    return (
      <Section className="mt-24 min-h-[60vh]">
        <p className="text-lg text-ash">Couldn't load this album.</p>
        <Link
          to="/gallery"
          className="mt-6 inline-block text-sm text-bone/70 hover:text-bone"
        >
          ← All albums
        </Link>
      </Section>
    );
  }
  if (!album) {
    return (
      <Section className="mt-24 min-h-[60vh]">
        <p className="text-sm text-ash">Loading…</p>
      </Section>
    );
  }

  return (
    <Section className="mt-20 min-h-[70vh]">
      <Reveal>
        <Link
          to="/gallery"
          className="text-sm text-ash transition-colors hover:text-bone"
        >
          ← All albums
        </Link>
      </Reveal>
      <Reveal delay={0.05}>
        <Eyebrow tone="ember">{album.location || "Field note"}</Eyebrow>
      </Reveal>
      <Reveal delay={0.08}>
        <h1 className="mt-5 text-[clamp(36px,6vw,72px)] font-semibold tracking-tight">
          {album.name}
        </h1>
      </Reveal>
      {album.story && (
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-ash">
            {album.story}
          </p>
          {author && (
            <div className="mt-... flex items-center gap-3">
              {author.avatar && (
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="h-11 w-11 rounded-full object-cover ring-1 ring-white/10"
                />
              )}
              <div>
                <p className="text-sm ...">Photographed by {author.name}</p>
                {author.bio && <p className="...">{author.bio}</p>}
              </div>
            </div>
          )}
        </Reveal>
      )}
      {album.travelDate && (
        <Reveal delay={0.12}>
          <p className="mt-3 font-mono text-xs text-ash">
            {new Date(album.travelDate).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
            })}
          </p>
        </Reveal>
      )}

      {/* masonry via CSS columns */}
      <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {photos.map((p, i) => (
          <button
            key={p._id}
            onClick={() => setActive(i)}
            className="block w-full overflow-hidden rounded-xl border border-white/8"
          >
            <img
              src={p.url}
              alt={p.caption}
              loading="lazy"
              className="w-full transition-transform duration-500 hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>
      {!photos.length && (
        <p className="mt-10 text-sm text-ash">No photos in this album yet.</p>
      )}

      {/* lightbox */}
      <AnimatePresence>
        {active !== null && photos[active] && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button
              className="absolute right-5 top-5 text-2xl text-bone/70 hover:text-bone"
              onClick={close}
            >
              ✕
            </button>
            <button
              className="absolute left-4 text-3xl text-bone/50 hover:text-bone sm:left-10"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
            >
              ‹
            </button>
            <motion.figure
              key={photos[active]._id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="max-h-[85vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={photos[active].url}
                alt={photos[active].caption}
                className="max-h-[80vh] rounded-lg object-contain"
              />
              {photos[active].caption && (
                <figcaption className="mt-3 text-center font-mono text-xs text-ash">
                  {photos[active].caption}
                </figcaption>
              )}
            </motion.figure>
            <button
              className="absolute right-4 text-3xl text-bone/50 hover:text-bone sm:right-10"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
