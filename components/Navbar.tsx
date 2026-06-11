import Link from "next/link";
import { Braces, Github } from "lucide-react";

const navItems = [
  { href: "/playground", label: "Playground" },
  { href: "/actions", label: "Actions" },
  { href: "/broadcast", label: "Broadcast" },
  { href: "/api-reference", label: "API Reference" }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-2 font-semibold tracking-normal text-ink">
          <span className="grid h-8 w-8 place-items-center rounded-card bg-ink text-paper">
            <Braces className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="truncate">CellKit Actions</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-card px-3 py-2 text-ink/72 hover:bg-line/60 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="#"
            className="grid h-9 w-9 place-items-center rounded-card text-ink/72 hover:bg-line/60 hover:text-ink"
            aria-label="GitHub placeholder"
            title="GitHub placeholder"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  );
}
