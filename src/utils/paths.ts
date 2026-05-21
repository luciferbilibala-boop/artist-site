const base = import.meta.env.BASE_URL;

export function asset(path: string): string {
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return base + clean;
}

export function link(path: string): string {
  const clean = path.replace(/^\//, '');
  return base + clean;
}
