"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Network, RadioTower } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const githubUrl = "https://github.com/FidelCoder/cellkitFE";

const navItems = [
  { href: "/playground", label: "Playground" },
  { href: "/actions", label: "Templates" },
  { href: "/broadcast", label: "Broadcast" },
  { href: "/api-reference", label: "API" }
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed left-0 top-0 z-50 h-16 w-full border-b border-white/10 bg-[#09090B]/90 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-8">
          <Link href="/" className="flex min-w-0 items-center gap-1.5 active:scale-95 transition-transform">
            <span className="truncate text-xl font-bold tracking-normal text-white">
              CellKit<span className="text-copper">.</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-2 md:flex" aria-label="Primary navigation">
            {navItems.map((item) => {
              const active = pathname === item.href || (item.href !== "/playground" && pathname?.startsWith(`${item.href}/`));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-all active:scale-95 ${
                    active
                      ? "border border-copper/20 bg-copper/5 text-copper"
                      : "text-[#D8C3AD]/60 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 border border-white/10 bg-[#131315] px-3 py-1 font-mono text-[11px] text-moss lg:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-moss" />
            CKB TESTNET
          </div>
          <Link
            href="/broadcast"
            className="hidden h-9 items-center gap-2 rounded-full border border-copper/20 bg-copper/10 px-3 font-mono text-[11px] font-bold uppercase tracking-wider text-copper transition hover:bg-copper/15 sm:inline-flex"
          >
            <RadioTower className="h-3.5 w-3.5" aria-hidden="true" />
            Verify
          </Link>
          <button
            title="Indexer and RPC configured by backend"
            className="hidden h-9 w-9 place-items-center rounded-full border border-white/10 bg-[#18181B] text-[#D8C3AD]/65 transition hover:border-copper/40 hover:text-copper sm:grid"
          >
            <Network className="h-4 w-4" aria-hidden="true" />
          </button>
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-[#18181B] text-[#D8C3AD]/65 transition hover:border-copper/40 hover:text-copper"
            aria-label="Open CellKit frontend GitHub repository"
            title="Open GitHub repository"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
          </a>
          <ThemeToggle />
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 z-50 flex h-14 w-full items-center justify-around border-t border-white/10 bg-[#09090B]/95 backdrop-blur-md md:hidden" aria-label="Mobile navigation">
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== "/playground" && pathname?.startsWith(`${item.href}/`));
          return (
            <Link key={item.href} href={item.href} className={`font-mono text-[10px] ${active ? "text-copper" : "text-[#D8C3AD]/45"}`}>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
