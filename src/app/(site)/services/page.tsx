import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Services — DoveSphere Technology Limited",
  description:
    "Explore our core services: IT Products & Solutions, IT Consultancy & Data Insights, and Training & Capacity Building. Holistic 360-degree technology solutions.",
};

const pillars = [
  {
    title: "IT Products & Solutions",
    description:
      "We provide the technological backbone your business needs to operate smoothly and scale globally.",
    services: [
      {
        name: "Cloud Infrastructure",
        detail: "Secure, scalable cloud architectures designed for modern businesses. We design, deploy, and manage cloud environments that grow with you.",
      },
      {
        name: "Hardware & Software",
        detail: "Procurement, supply, and installation of high-performance servers, networking systems, and licensed software tailored to your operational needs.",
      },
      {
        name: "Global Connectivity",
        detail: "Design and deployment of secure, seamless local and wide area networks (LAN/WAN) to keep your teams connected anywhere.",
      },
    ],
  },
  {
    title: "IT Consultancy & Data Insights",
    description:
      "We turn technical challenges into streamlined, efficient operational advantages through expert guidance.",
    services: [
      {
        name: "Digital Transformation",
        detail: "Helping traditional businesses migrate to digital-first operations with a clear roadmap and measurable milestones.",
      },
      {
        name: "Data Analytics & Insights",
        detail: "Actionable business intelligence that drives decision-making. We transform raw data into strategic advantage.",
      },
      {
        name: "IT Audit & Assurance",
        detail: "Evaluating your current systems to ensure compliance, security, and maximum efficiency — identifying gaps before they become risks.",
      },
    ],
  },
  {
    title: "Training & Capacity Building",
    description:
      "Empowering individuals and organizations with the digital skills and knowledge needed to thrive.",
    services: [
      {
        name: "Corporate Training",
        detail: "Tailored workshops for staff on cybersecurity awareness, software tools, and digital workflows — designed for your team's specific needs.",
      },
      {
        name: "Professional Certification",
        detail: "Preparation and capacity building for industry-standard tech certifications, helping professionals validate their expertise.",
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-obsidian text-chalk">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Our <span className="text-azure">Services</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-chalk/70">
            We provide the technological backbone your business needs to operate smoothly and scale globally.
          </p>
        </div>
      </section>

      {/* Pillars */}
      {pillars.map((pillar, idx) => (
        <section
          key={pillar.title}
          className={idx % 2 === 0 ? "bg-white py-16 sm:py-24" : "bg-chalk py-16 sm:py-24"}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold text-obsidian">{pillar.title}</h2>
              <p className="mt-4 text-lg text-gunmetal">{pillar.description}</p>
            </div>

            {idx === 0 && (
              <div className="relative mt-12 aspect-[21/9] overflow-hidden rounded-xl">
                <Image
                  src="/images/engineer-server-room-using-tablet-implement-data-backup-solutions.jpg"
                  alt="IT infrastructure expert managing server systems"
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {pillar.services.map((s) => (
                <div
                  key={s.name}
                  className="rounded-xl border border-obsidian/10 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-obsidian">{s.name}</h3>
                  <p className="mt-2 text-sm text-gunmetal">{s.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-obsidian py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-chalk sm:text-4xl">
            Need a Custom Solution?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-chalk/70">
            Every business is unique. Let's discuss how we can tailor our services to your specific needs.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-block rounded-md bg-azure px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-azure/90"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
