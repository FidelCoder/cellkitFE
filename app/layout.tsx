import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "CellKit Actions",
  description: "Developer playground for reusable CKB transaction actions."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-paper text-ink antialiased">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
