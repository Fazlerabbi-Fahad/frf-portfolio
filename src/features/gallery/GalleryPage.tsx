import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";
import { Section, Eyebrow } from "@/components/ui/Primitives";
import { Reveal, StaggerItem } from "@/components/motion/Reveal";
import { Seo } from "@/components/seo/Seo";

type Album = {
  _id: string;
  name: string;
  slug: string;
  story: string;
  location: string;
  travelDate?: string;
  coverImage: string;
  photoCount: number;
};

export function GalleryPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<Album[]>("/albums")
      .then(setAlbums)
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Section className="mt-20 min-h-[70vh]">
      <Seo title="Field notes" path="/gallery" description="Travel albums and photography from Bangladesh and beyond." />
      <Reveal>
        <Eyebrow tone="ember">Field notes</Eyebrow>
      </Reveal>
      <Reveal delay={0.05}>
        <h1 className="mt-7 max-w-[16ch] text-[clamp(36px,6vw,72px)] font-semibold leading-[1.02] tracking-tight">
          Places I've <span className="text-ember">been</span>.
        </h1>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ash">
          Travel albums, each with its own story. The engineering is one half of me; this is the other.
        </p>
      </Reveal>

      {err && <p className="mt-8 text-sm text-ember">Couldn't load albums: {err}</p>}
      {loading && <p className="mt-8 text-sm text-ash">Loading…</p>}

      <Reveal className="mt-12 grid gap-5 md:grid-cols-2">
        {albums.map((a) => (
          <StaggerItem key={a._id}>
            <Link to={`/gallery/${a.slug}`} className="group block">
              <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-white/8">
                {a.coverImage ? (
                  <img
                    src={a.coverImage}
                    alt={a.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full" style={{ background: "linear-gradient(180deg,#12141B,rgba(255,120,73,0.15))" }} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  {a.location && <span className="font-mono text-[11px] text-ember">{a.location}</span>}
                  <h3 className="mt-1 text-2xl font-semibold">{a.name}</h3>
                  <p className="mt-1 font-mono text-[11px] text-ash">{a.photoCount} photos</p>
                </div>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Reveal>

      {!loading && !albums.length && !err && (
        <p className="mt-10 text-sm text-ash">No albums yet.</p>
      )}
    </Section>
  );
}
