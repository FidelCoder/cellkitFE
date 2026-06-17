import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const themeScript = `
(() => {
  try {
    const saved = window.localStorage.getItem("cellkit-theme");
    const theme = saved === "light" || saved === "dark"
      ? saved
      : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle("dark", theme === "dark");
  } catch {
    document.documentElement.dataset.theme = "light";
  }
})();
`;

export const metadata: Metadata = {
  title: "CellKit Actions",
  description: "Developer playground for reusable CKB transaction actions."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-paper text-ink antialiased">
        <Script id="cellkit-theme" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
