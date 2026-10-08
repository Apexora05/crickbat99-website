export const SITE_URL = "https://www.crickbat99.online";

type HeadMeta = Array<Record<string, string | boolean>>;
type HeadLink = Array<Record<string, string>>;

export interface PageHeadInput {
  path: string;
  title: string;
  description: string;
}

/**
 * Builds the meta + canonical link tags shared by the informational pages.
 * Mirrors the SEO structure already used by the game and city routes:
 * unique title + description, self-referencing absolute canonical, index/follow
 * robots, Open Graph and Twitter tags. No meta keywords are emitted.
 */
export function pageHead({ path, title, description }: PageHeadInput): {
  meta: HeadMeta;
  links: HeadLink;
} {
  const url = `${SITE_URL}${path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { property: "og:site_name", content: "Cricbet99" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    type: "application/ld+json" as const,
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: it.name,
        item: `${SITE_URL}${it.path}`,
      })),
    }),
  };
}

export function faqJsonLd(faqs: Array<{ q: string; a: string }>) {
  return {
    type: "application/ld+json" as const,
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    }),
  };
}
