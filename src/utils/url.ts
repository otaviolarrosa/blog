const BASE = import.meta.env.BASE_URL;

function isAbsolute(path: string): boolean {
  return /^(?:[a-z][a-z\d+.-]*:)?\/\//i.test(path);
}

/**
 * Prefix a root-relative path with Astro's configured BASE_URL,
 * ensuring no double slashes and seamless support for both
 * subpath deployments (e.g. /blog) and root deployments (/).
 */
export function withBase(path = '/'): string {
  if (isAbsolute(path)) return path;
  const base = BASE.replace(/\/+$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}` || '/';
}

/** Absolute URL including the base path (for canonical/OG/schema). */
export function absoluteUrl(path: string, site: URL | string | undefined): string {
  if (isAbsolute(path)) return new URL(path).toString();
  return new URL(withBase(path), site).toString();
}
