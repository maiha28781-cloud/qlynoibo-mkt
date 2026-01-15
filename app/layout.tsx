import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Qlynoibo Marketing",
  description: "A simple Next.js marketing site."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <header className="border-b border-slate-800">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
            <span className="text-lg font-semibold tracking-wide">
              Qlynoibo
            </span>
            <nav className="flex gap-6 text-sm font-medium">
              <Link className="transition hover:text-slate-200" href="/">
                Home
              </Link>
              <Link className="transition hover:text-slate-200" href="/about">
                About
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto w-full max-w-5xl px-6 py-16">
          {children}
        </main>
      </body>
    </html>
  );
}
