import { Helmet } from "react-helmet-async";

const SITE = "Fazle Rabbi Fahad";
const BASE_URL = import.meta.env.VITE_SITE_URL || "https://fazlerabbifahad.dev";

type Props = {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  type?: "website" | "article";
  jsonLd?: object;
};

export function Seo({
  title,
  description = "Full-stack software engineer building scalable web applications with React, TypeScript, Node and MongoDB. Available for remote work and freelance projects.",
  image = `${BASE_URL}/og-default.png`,
  path = "",
  type = "website",
  jsonLd,
}: Props) {
  const fullTitle = title ? `${title} — ${SITE}` : `${SITE} — Full-Stack Software Engineer`;
  const url = `${BASE_URL}${path}`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Fazle Rabbi Fahad",
  jobTitle: "Full-Stack Software Engineer",
  url: BASE_URL,
  sameAs: ["https://github.com/Fazlerabbi-Fahad"],
  knowsAbout: ["React", "TypeScript", "Node.js", "ASP.NET Core", "MongoDB"],
};

export { BASE_URL };
