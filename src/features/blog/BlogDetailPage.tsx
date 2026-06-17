import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { api } from "@/lib/api";
import { Section } from "@/components/ui/Primitives";
import { Reveal } from "@/components/motion/Reveal";
import { Seo, BASE_URL } from "@/components/seo/Seo";
import { trackEvent } from "@/lib/track";

type Blog = {
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  readingMinutes: number;
  createdAt: string;
  category?: { name: string };
  tags?: { name: string; slug: string }[];
  author?: { name: string; avatar: string; bio: string };
};

function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function BlogDetailPage() {
  const { slug } = useParams();
  const { data: blog, error } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => api.get<Blog>(`/blogs/${slug}`),
    enabled: Boolean(slug),
  });

  const toc = useMemo(() => {
    if (!blog?.content) return [];
    return blog.content
      .split("\n")
      .filter((l) => /^#{2,3}\s/.test(l))
      .map((l) => {
        const level = l.startsWith("### ") ? 3 : 2;
        const text = l.replace(/^#{2,3}\s/, "").trim();
        return { level, text, id: slugifyHeading(text) };
      });
  }, [blog?.content]);

  const share = (network: "twitter" | "linkedin") => {
    trackEvent("share", slug ?? "", network);
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(blog?.title ?? "");
    const target =
      network === "twitter"
        ? `https://twitter.com/intent/tweet?url=${url}&text=${text}`
        : `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    window.open(target, "_blank", "noopener,width=600,height=600");
  };

  if (error) {
    return (
      <Section className="mt-24 min-h-[60vh]">
        <p className="text-lg text-ash">Couldn't load this post.</p>
        <Link
          to="/blog"
          className="mt-6 inline-block text-sm text-bone/70 hover:text-bone"
        >
          &larr; All writing
        </Link>
      </Section>
    );
  }
  if (!blog) {
    return (
      <Section className="mt-24 min-h-[60vh]">
        <p className="text-sm text-ash">Loading&hellip;</p>
      </Section>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    image: blog.coverImage || undefined,
    datePublished: blog.createdAt,
    author: { "@type": "Person", name: "Fazle Rabbi Fahad" },
    url: `${BASE_URL}/blog/${slug}`,
  };

  return (
    <Section className="mt-20 min-h-[70vh]">
      <Seo
        title={blog.title}
        path={`/blog/${slug}`}
        description={blog.excerpt || blog.title}
        image={blog.coverImage || undefined}
        type="article"
        jsonLd={jsonLd}
      />
      <Reveal>
        <Link
          to="/blog"
          className="text-sm text-ash transition-colors hover:text-bone"
        >
          &larr; All writing
        </Link>
      </Reveal>
      <Reveal delay={0.05}>
        {blog.category && (
          <p className="mt-8 font-mono text-xs uppercase tracking-wider text-cyan">
            {blog.category.name}
          </p>
        )}
        <h1 className="mt-3 max-w-[20ch] text-[clamp(32px,5vw,60px)] font-semibold leading-[1.05] tracking-tight">
          {blog.title}
        </h1>
        <p className="mt-4 font-mono text-xs text-ash">
          {new Date(blog.createdAt).toLocaleDateString()} &middot;{" "}
          {blog.readingMinutes} min read
        </p>
        {blog.author && (
          <div className="mt-6 flex items-center gap-3">
            {blog.author.avatar && (
              <img
                src={blog.author.avatar}
                alt={blog.author.name}
                className="h-11 w-11 rounded-full object-cover ring-1 ring-white/10"
              />
            )}
            <div>
              <p className="text-sm font-medium text-bone">
                {blog.author.name}
              </p>
              {blog.author.bio && (
                <p className="font-mono text-[11px] text-ash">
                  {blog.author.bio}
                </p>
              )}
            </div>
          </div>
        )}
      </Reveal>

      {blog.coverImage && (
        <Reveal delay={0.1}>
          <img
            src={blog.coverImage}
            alt=""
            className="mt-10 max-h-[420px] w-full rounded-2xl object-cover"
          />
        </Reveal>
      )}

      <div className="mt-12 gap-12 lg:grid lg:grid-cols-[1fr_220px]">
        <Reveal>
          <article className="max-w-[68ch] text-lg leading-relaxed text-bone/85">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => (
                  <h2
                    id={slugifyHeading(String(children))}
                    className="mt-10 mb-4 text-2xl font-semibold tracking-tight text-bone"
                  >
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3
                    id={slugifyHeading(String(children))}
                    className="mt-8 mb-3 text-xl font-medium text-bone"
                  >
                    {children}
                  </h3>
                ),
                p: ({ children }) => <p className="mb-5">{children}</p>,
                ul: ({ children }) => (
                  <ul className="mb-5 list-disc space-y-2 pl-6">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-5 list-decimal space-y-2 pl-6">
                    {children}
                  </ol>
                ),
                a: ({ children, href }) => (
                  <a
                    href={href}
                    className="text-electric underline-offset-2 hover:underline"
                  >
                    {children}
                  </a>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="my-6 border-l-2 border-ember/50 pl-5 italic text-ash">
                    {children}
                  </blockquote>
                ),
                code(props) {
                  const { children, className, ...rest } = props;
                  const match = /language-(\w+)/.exec(className || "");
                  return match ? (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{
                        borderRadius: "12px",
                        margin: "1.5rem 0",
                        fontSize: "14px",
                      }}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code
                      className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.9em]"
                      {...rest}
                    >
                      {children}
                    </code>
                  );
                },
              }}
            >
              {blog.content}
            </ReactMarkdown>
          </article>
        </Reveal>

        {toc.length > 0 && (
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="font-mono text-[11px] uppercase tracking-wider text-ash">
                On this page
              </p>
              <nav className="mt-4 space-y-2 border-l border-white/10 text-sm">
                {toc.map((h) => (
                  <a
                    key={h.id}
                    href={`#${h.id}`}
                    className={`block py-0.5 text-ash transition-colors hover:text-bone ${h.level === 3 ? "pl-6" : "pl-4"}`}
                  >
                    {h.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}
      </div>

      <Reveal>
        <div className="mt-14 flex items-center gap-3 border-t border-white/8 pt-8">
          <span className="font-mono text-xs text-ash">Share:</span>
          <button
            onClick={() => share("twitter")}
            className="text-sm text-bone/70 hover:text-bone"
          >
            X / Twitter
          </button>
          <button
            onClick={() => share("linkedin")}
            className="text-sm text-bone/70 hover:text-bone"
          >
            LinkedIn
          </button>
        </div>
      </Reveal>
    </Section>
  );
}
