import { createFileRoute } from "@tanstack/react-router";

const baseUrl = "https://delivrr.work";

// Public pages that should be indexed
const publicPages = [
  {
    url: baseUrl,
    changefreq: "weekly" as const,
    priority: 1.0,
  },
  {
    url: `${baseUrl}/for-agencies`,
    changefreq: "weekly" as const,
    priority: 0.8,
  },
  {
    url: `${baseUrl}/for-teams`,
    changefreq: "weekly" as const,
    priority: 0.8,
  },
  {
    url: `${baseUrl}/automated-pr-summaries`,
    changefreq: "weekly" as const,
    priority: 0.8,
  },
  {
    url: `${baseUrl}/contact`,
    changefreq: "monthly" as const,
    priority: 0.5,
  },
  {
    url: `${baseUrl}/privacy-policy`,
    changefreq: "monthly" as const,
    priority: 0.3,
  },
  {
    url: `${baseUrl}/terms-of-service`,
    changefreq: "monthly" as const,
    priority: 0.3,
  },
];

function generateSitemap() {
  const currentDate = new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${publicPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return sitemap;
}

export const Route = createFileRoute("/sitemap/xml")({
  server: {
    handlers: {
      GET: async () => {
        const sitemap = generateSitemap();
        return new Response(sitemap, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=3600",
          },
        });
      },
    },
  },
});
