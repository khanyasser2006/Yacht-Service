import { useEffect } from 'react';

/**
 * SEOHead - Dynamic Search Engine Optimization & Social Sharing Controller
 * Updates and synchronizes document title, meta descriptions, canonical links,
 * OpenGraph tags, and Route-specific Schema.org JSON-LD structured data in the document head.
 */
export default function SEOHead({
  title = 'AURA NAUTICA — Ultra-Luxury Superyacht Charters & Sky Riding',
  description = 'Experience ultra-luxury superyacht charters with AURA NAUTICA. 800-foot parachute yacht sky riding, Seabob underwater jets, carbon eFoils, and PADI master dive safaris across Monaco, French Riviera, and the Bahamas.',
  keywords = 'luxury yacht charter, superyacht rental monaco, parachute yacht sky riding, seabob rental french riviera, luxury marine toys, private diving master safari',
  canonical = 'https://auranautica.com/',
  ogType = 'website',
  ogImage = 'https://auranautica.com/assets/images/ride_sky_riding_1788888024545.jpg',
  noIndex = false,
  jsonLd = null,
}) {
  useEffect(() => {
    // 1. Synchronize Document Title
    document.title = title;

    // Helper to safely update existing tag or create a new one
    const setMetaTag = (attrName, attrValue, content) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to safely update canonical link
    const setCanonicalLink = (href) => {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    // 2. Update Primary SEO Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large');
    setCanonicalLink(canonical);

    // 3. Update Open Graph Tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonical);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:image', ogImage);

    // 4. Update Twitter Card Tags
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // 5. Route-Specific JSON-LD Structured Data
    const SCRIPT_ID = 'dynamic-route-jsonld';
    let scriptEl = document.getElementById(SCRIPT_ID);
    if (jsonLd) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = SCRIPT_ID;
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(jsonLd);
    } else if (scriptEl) {
      scriptEl.remove();
    }
  }, [title, description, keywords, canonical, ogType, ogImage, noIndex, jsonLd]);

  return null;
}
