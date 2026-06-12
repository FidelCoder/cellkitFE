"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Braces, Github } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const githubUrl = "https://github.com/FidelCoder/cellkitFE";

const navItems = [
  { href: "/playground", label: "Playground" },
  { href: "/actions", label: "Actions" },
  { href: "/broadcast", label: "Broadcast" },
  { href: "/api-reference", label: "API Reference" }
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/88 shadow-sm shadow-ink/5 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:flex-nowrap sm:px-6 lg:px-8">
        <Link href="/" className="group flex min-w-0 items-center gap-2 font-semibold tracking-normal text-ink">
          <span className="grid h-9 w-9 place-items-center rounded-card bg-ink text-paper shadow-sm shadow-ink/15 transition group-hover:bg-copper">
            <Braces className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="truncate">CellKit Actions</span>
        </Link>

        <nav className="order-3 flex w-full gap-1 overflow-x-auto text-sm sm:order-none sm:w-auto sm:flex-1 sm:justify-end sm:overflow-visible" aria-label="Primary navigation">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/playground" && pathname?.startsWith(`${item.href}/`));
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap rounded-card px-3 py-2 transition ${
                  active
                    ? "bg-surface text-ink shadow-sm shadow-ink/5"
                    : "text-ink/68 hover:bg-surface hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="grid h-9 w-9 place-items-center rounded-card border border-line bg-surface text-ink/72 shadow-sm shadow-ink/5 transition hover:border-copper hover:text-copper"
            aria-label="Open CellKit frontend GitHub repository"
            title="Open GitHub repository"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
