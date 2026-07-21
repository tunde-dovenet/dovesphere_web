import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us — DoveSphere Technology Limited",
  description:
    "Get in touch with DoveSphere Technology Limited. Phone, email, and our Lagos headquarters. Send us a message or book a consultation.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-obsidian text-chalk">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Get in <span className="text-azure">Touch</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-chalk/70">
            Let's build your digital future together. Reach out for consultations, product inquiries, or project proposals.
          </p>
        </div>
      </section>

      {/* Contact Details + Form */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-obsidian">Contact Information</h2>
              <div className="mt-8 space-y-6">
                {/* HQ */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-azure">Headquarters</h3>
                  <p className="mt-2 text-gunmetal">{COMPANY.location}</p>
                </div>

                {/* Phones */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-azure">Phone</h3>
                  <div className="mt-2 space-y-1">
                    {COMPANY.phones.map((phone) => (
                      <p key={phone}>
                        <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-gunmetal hover:text-azure">
                          {phone}
                        </a>
                      </p>
                    ))}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-azure">Email</h3>
                  <p className="mt-2">
                    <a href={`mailto:${COMPANY.email}`} className="text-gunmetal hover:text-azure">
                      {COMPANY.email}
                    </a>
                  </p>
                </div>

                {/* Website */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-azure">Website</h3>
                  <p className="mt-2">
                    <a href={COMPANY.website} className="text-gunmetal hover:text-azure" target="_blank" rel="noopener noreferrer">
                      {COMPANY.website}
                    </a>
                  </p>
                </div>
              </div>

              {/* CTA to form */}
              <div className="mt-10">
                <Link
                  href="/forms/contact"
                  className="inline-block rounded-md bg-azure px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-azure/90"
                >
                  Send Us a Message
                </Link>
                <p className="mt-2 text-sm text-gunmetal/70">
                  Fill out our contact form and we'll get back to you promptly.
                </p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="flex items-center justify-center">
              <div className="flex h-full min-h-[300px] w-full items-center justify-center rounded-xl border-2 border-dashed border-obsidian/20 bg-chalk p-8 text-center">
                <div>
                  <p className="text-lg font-semibold text-gunmetal">Map Placeholder</p>
                  <p className="mt-2 text-sm text-gunmetal/70">Lagos, Nigeria</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
