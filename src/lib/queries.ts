import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export type Project = {
  _id: string;
  title: string;
  slug: string;
  year: string;
  role: string;
  blurb: string;
  coverImage: string;
  stack: string[];
  challenge: string;
  solution: string;
  highlights: string[];
  liveUrl: string;
  repoUrl: string;
  accent: "cyan" | "ember";
  metric: string;
  featured: boolean;
  published: boolean;
  order: number;
};

export type Testimonial = {
  _id: string;
  quote: string;
  author: string;
  title: string;
  avatar: string;
  rating: number;
  published: boolean;
  order: number;
};

export type SiteAuthor = { name: string; avatar: string; bio: string };

export function useProjects(featuredOnly = false) {
  return useQuery({
    queryKey: ["projects", { featuredOnly }],
    queryFn: () =>
      api.get<Project[]>(`/projects${featuredOnly ? "?featured=1" : ""}`),
  });
}

export function useProject(slug: string | undefined) {
  return useQuery({
    queryKey: ["project", slug],
    queryFn: () => api.get<Project>(`/projects/${slug}`),
    enabled: Boolean(slug),
  });
}

export function useTestimonials() {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: () => api.get<Testimonial[]>("/testimonials"),
  });
}

export function useSiteAuthor() {
  return useQuery({
    queryKey: ["site-author"],
    queryFn: () => api.get<SiteAuthor>("/site-author"),
  });
}
export type EventStats = {
  total: Record<string, number>;
  last30: Record<string, number>;
  topTargets: { _id: string; count: number }[];
};

export function useEventStats() {
  return useQuery({
    queryKey: ["event-stats"],
    queryFn: () => api.get<EventStats>("/events/stats", true),
  });
}