import { api } from "./api";

type EventType = "share" | "click" | "download" | "view";

export function trackEvent(type: EventType, target = "", meta = "") {
  api.post("/events", { type, target, meta }).catch(() => {});
}
