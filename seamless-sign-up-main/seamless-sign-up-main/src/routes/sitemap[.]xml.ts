import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://www.crickbat99.online";

interface SitemapEntry {
  path: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/" },
          { path: "/online-cricket-id" },

          // Public game pages
          { path: "/games/ipl-live-betting" },
          { path: "/games/football" },
          { path: "/games/teen-patti" },

          // Public city pages — India
          { path: "/online-cricket-id/mumbai" },
          { path: "/online-cricket-id/delhi" },
          { path: "/online-cricket-id/bangalore" },
          { path: "/online-cricket-id/kolkata" },
          { path: "/online-cricket-id/chennai" },
          { path: "/online-cricket-id/hyderabad" },
          { path: "/online-cricket-id/pune" },
          { path: "/online-cricket-id/ahmedabad" },
          { path: "/online-cricket-id/jaipur" },
          { path: "/online-cricket-id/lucknow" },
          { path: "/online-cricket-id/indore" },
          { path: "/online-cricket-id/surat" },
          { path: "/online-cricket-id/nagpur" },
          { path: "/online-cricket-id/chandigarh" },
          { path: "/online-cricket-id/patna" },
          { path: "/online-cricket-id/kanpur" },
          { path: "/online-cricket-id/bhopal" },
          { path: "/online-cricket-id/ludhiana" },
          { path: "/online-cricket-id/kochi" },
          { path: "/online-cricket-id/guwahati" },

          // Public city pages — UAE / Middle East
          { path: "/online-cricket-id/dubai" },
          { path: "/online-cricket-id/abu-dhabi" },
          { path: "/online-cricket-id/sharjah" },
        ];

        const urls = entries.map(
          (e) =>
            `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n  </url>`
        );

        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...urls,
          "</urlset>",
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});