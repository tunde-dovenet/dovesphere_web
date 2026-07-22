import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us — DoveSphere Technology Limited",
  description:
    "Learn about DoveSphere Technology Limited — our vision, mission, and the team behind our reliable, efficient IT solutions based in Lagos, Nigeria.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-obsidian text-chalk">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            About <span className="text-azure">DoveSphere</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-chalk/70">
            A premier Information Technology solutions provider empowering organizations and individuals across Nigeria and beyond.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-obsidian">Who We Are</h2>
              <p className="mt-6 text-lg text-gunmetal leading-relaxed">
                {COMPANY.name} is a premier Information Technology solutions provider. We specialize in delivering end-to-end IT products, expert consultancy, and comprehensive training services designed to empower organizations and individuals alike.
              </p>
              <p className="mt-4 text-lg text-gunmetal leading-relaxed">
                Our operations are built on a foundation of reliability, measurable growth, and a client-centric approach. We don't just fix problems — we prevent them and plan for the future.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src="/images/african-american-employee-working-goods-inventory.jpg"
                alt="DoveSphere team member working on-site"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="bg-chalk py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="relative mx-auto mb-8 h-16 w-16">
              <Image
                src="/images/dovesphere_logo_only.png"
                alt="DoveSphere logo"
                fill
                className="object-contain"
              />
            </div>
            <h2 className="text-center text-3xl font-bold text-obsidian">The Story Behind Our Name</h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div className="rounded-xl bg-white p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-obsidian">🕊️ Dove</h3>
                <p className="mt-3 text-gunmetal">
                  The "Dove" symbolizes our commitment to delivering reliable, peaceful, and efficient solutions — technology that works quietly and effectively, without disruption.
                </p>
              </div>
              <div className="rounded-xl bg-white p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-obsidian">🌐 Sphere</h3>
                <p className="mt-3 text-gunmetal">
                  The "Sphere" represents our holistic, 360-degree approach to solving global technical challenges — comprehensive solutions that cover every angle of your technology needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-obsidian">Our Vision</h2>
            <p className="mt-4 text-lg text-gunmetal leading-relaxed">
              To be a leading force in the global technology landscape, recognized for delivering innovative IT solutions and world-class training that simplifies complexity and drives sustainable growth.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-obsidian">Our Mission</h2>
            <ul className="mt-6 space-y-4">
              {[
                {
                  title: "To Innovate",
                  description: "By providing cutting-edge software and hardware solutions that solve real-world problems.",
                },
                {
                  title: "To Empower",
                  description: "By equipping individuals and businesses with the digital skills and knowledge needed to thrive in the modern economy.",
                },
                {
                  title: "To Simplify",
                  description: "By offering consultancy that turns technical challenges into streamlined, efficient operational advantages.",
                },
              ].map(({ title, description }) => (
                <li key={title} className="flex gap-4">
                  <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-azure/10">
                    <div className="h-2 w-2 rounded-full bg-azure" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-obsidian">{title}</h3>
                    <p className="text-gunmetal">{description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-chalk py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-obsidian">Our Team</h2>
            <p className="mt-6 text-lg text-gunmetal leading-relaxed">
              DoveSphere is driven by a diverse team of innovators, technical experts, and industry veterans. We believe that the human element is the most critical part of technology. When you partner with us, you are backed by professionals dedicated to your success.
            </p>
            <p className="mt-4 text-sm text-gunmetal/70 italic">
              Team member profiles will be published here. This section is a placeholder representing the structure and content to come.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-obsidian py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-chalk sm:text-4xl">Let's Build Your Digital Future</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-chalk/70">
            Reach out to us for consultations, product inquiries, or project proposals.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-block rounded-md bg-azure px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-azure/90"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
