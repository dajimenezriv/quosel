export const SERIF = "var(--font-serif)";
export const SANS = "var(--font-sans)";

export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}
