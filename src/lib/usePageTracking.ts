import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageview } from "./analytics";

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/admin")) return;
    trackPageview(location.pathname + location.search);
  }, [location]);
}