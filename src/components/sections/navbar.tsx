"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-obsidian">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8" aria-label="Main navigation">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0" aria-label="DoveSphere home">
          <Image
            src="/logo.png"
            alt="DoveSphere Technology Limited"
            width={120}
            height={40}
            className="h-auto w-[92px] min-w-[92px] sm:w-[120px]"
            priority
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-sm font-medium text-chalk/80 transition-colors hover:text-azure"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className="hidden rounded-md bg-azure px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-azure/90 md:inline-block"
        >
          Get Started
        </Link>

        {/* Mobile toggle */}
        <button
          className="text-chalk md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-gunmetal/50 bg-obsidian px-4 pb-4 md:hidden">
          <ul className="flex flex-col gap-3 pt-3">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block text-chalk/80 transition-colors hover:text-azure"
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/contact"
                className="block rounded-md bg-azure px-4 py-2 text-center font-semibold text-white transition-colors hover:bg-azure/90"
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
