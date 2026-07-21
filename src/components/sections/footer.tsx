import Link from "next/link";
import Image from "next/image";
import { COMPANY, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-obsidian text-chalk" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/logo.png"
              alt="DoveSphere Technology Limited"
              width={120}
              height={40}
              className="h-auto w-[92px] sm:w-[120px]"
            />
            <p className="mt-4 text-sm text-chalk/70">{COMPANY.tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-azure">Quick Links</h3>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-chalk/70 transition-colors hover:text-azure">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-azure">Contact</h3>
            <address className="not-italic text-sm text-chalk/70">
              <p>{COMPANY.location}</p>
              <p className="mt-1">
                <a href={`tel:${COMPANY.phones[0].replace(/\s/g, "")}`} className="hover:text-azure">
                  {COMPANY.phones[0]}
                </a>
              </p>
              <p>
                <a href={`tel:${COMPANY.phones[1].replace(/\s/g, "")}`} className="hover:text-azure">
                  {COMPANY.phones[1]}
                </a>
              </p>
              <p className="mt-1">
                <a href={`mailto:${COMPANY.email}`} className="hover:text-azure">
                  {COMPANY.email}
                </a>
              </p>
            </address>
          </div>

          {/* Social (placeholders) */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-azure">Follow Us</h3>
            <div className="flex gap-4">
              {["LinkedIn", "Twitter", "Facebook"].map((name) => (
                <span
                  key={name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-chalk/20 text-xs text-chalk/50"
                  aria-label={`${name} (coming soon)`}
                  title={`${name} — coming soon`}
                >
                  {name[0]}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-chalk/10 pt-6 text-center text-xs text-chalk/50">
          <p>&copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
