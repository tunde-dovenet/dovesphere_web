import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "DoveSphere Technology Limited — IT Solutions, Consultancy & Training",
  description:
    "Bridging the gap between complex technology and business success. Expert IT products, consultancy, and training based in Lagos, Nigeria.",
};

const services = [
  {
    href: "/services",
    title: "IT Products & Solutions",
    description:
      "Cloud infrastructure, hardware & software procurement, and global connectivity solutions designed for modern businesses.",
    icon: "☁️",
  },
  {
    href: "/services",
    title: "IT Consultancy & Data Insights",
    description:
      "Digital transformation, data analytics, and IT audit services that turn technical challenges into operational advantages.",
    icon: "📊",
  },
  {
    href: "/training",
    title: "Training & Capacity Building",
    description:
      "Corporate workshops and professional certification programs that equip teams with the digital skills to thrive.",
    icon: "🎓",
  },
];

const differentiators = [
  {
    title: "Custom Solutions",
    description: "We listen first. Every solution is tailored to your specific business needs, never one-size-fits-all.",
  },
  {
    title: "Proven Uptime",
    description: "99.9% uptime for critical infrastructure — your business stays online when it matters most.",
  },
  {
    title: "Future-Ready",
    description: "We stay ahead of technology trends so your organization is always prepared for what comes next.",
  },
  {
    title: "Registered & Compliant",
    description: "Fully registered with the CAC and partnering with top-tier financial and tech institutions.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-obsidian text-chalk">
        <Image
          src="/images/speed.jpg"
          alt=""
          fill
          className="object-cover opacity-15"
          priority
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Bridging the gap between{" "}
              <span className="text-azure">complex technology</span> and{" "}
              <span className="text-azure">business success</span>.
            </h1>
            <p className="mt-6 text-lg text-chalk/70 sm:text-xl">
              {COMPANY.name} delivers end-to-end IT products, expert consultancy, and comprehensive training — empowering organizations and individuals across Nigeria and beyond.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-md bg-azure px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-azure/90"
              >
                Book a Consultation
              </Link>
              <Link
                href="/services"
                className="rounded-md border border-chalk/30 px-6 py-3 text-base font-semibold text-chalk transition-colors hover:border-azure hover:text-azure"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="bg-chalk py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-obsidian sm:text-4xl">
              What We Do
            </h2>
            <p className="mt-4 text-lg text-gunmetal">
              The technological backbone your business needs to operate smoothly and scale globally.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ href, title, description, icon }) => (
              <Link
                key={title}
                href={href}
                className="group rounded-xl border border-obsidian/10 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="text-3xl" aria-hidden="true">{icon}</span>
                <h3 className="mt-4 text-xl font-semibold text-obsidian group-hover:text-azure">
                  {title}
                </h3>
                <p className="mt-2 text-gunmetal">{description}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-azure group-hover:underline">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose DoveSphere */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight text-obsidian sm:text-4xl">
            Why Choose DoveSphere
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map(({ title, description }) => (
              <div key={title} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-azure/10">
                  <div className="h-3 w-3 rounded-full bg-azure" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-obsidian">{title}</h3>
                <p className="mt-2 text-sm text-gunmetal">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Trust Strip */}
      <section className="bg-obsidian py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
            {[
              { value: "99.9%", label: "Uptime Guarantee" },
              { value: "CAC", label: "Registered & Compliant" },
              { value: "360°", label: "Holistic Solutions" },
              { value: "24/7", label: "Support Availability" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-3xl font-bold text-azure sm:text-4xl">{value}</div>
                <div className="mt-1 text-sm text-chalk/70">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gunmetal py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-chalk sm:text-4xl">
            Ready to Transform Your Business?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-chalk/70">
            Let's build your digital future together. Reach out for consultations, product inquiries, or project proposals.
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
