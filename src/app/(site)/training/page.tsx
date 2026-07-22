import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Training & Capacity Building — DoveSphere Technology Limited",
  description:
    "Corporate training workshops and professional certification programs to equip your team with the digital skills needed to thrive in the modern economy.",
};

const programs = [
  {
    category: "Corporate Training",
    description:
      "Tailored workshops designed for your staff, covering the skills that matter most to your business operations.",
    topics: [
      {
        name: "Cybersecurity Awareness",
        detail: "Practical training on threat identification, secure workflows, and organizational best practices to protect your digital assets.",
      },
      {
        name: "Software Tools Mastery",
        detail: "Hands-on sessions for the platforms your team uses daily — from collaboration suites to specialized enterprise software.",
      },
      {
        name: "Digital Workflow Optimization",
        detail: "Streamlining processes through automation, digital tools, and modern project management methodologies.",
      },
    ],
  },
  {
    category: "Professional Certification",
    description:
      "Preparation and capacity building for industry-standard technology certifications to validate and advance your team's expertise.",
    topics: [
      {
        name: "Cloud Platform Certifications",
        detail: "Structured preparation for major cloud provider certifications, covering architecture, deployment, and security.",
      },
      {
        name: "Networking & Infrastructure",
        detail: "Comprehensive training for networking certifications, from fundamentals to advanced enterprise-level design.",
      },
      {
        name: "Data & Analytics Certifications",
        detail: "Preparing professionals for data science, analytics, and business intelligence certifications that drive career growth.",
      },
    ],
  },
];

export default function TrainingPage() {
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
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Training & <span className="text-azure">Capacity Building</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-chalk/70">
            Equipping individuals and organizations with the digital skills and knowledge needed to thrive in the modern economy.
          </p>
        </div>
      </section>

      {/* Programs */}
      {programs.map((program, idx) => (
        <section
          key={program.category}
          className={idx % 2 === 0 ? "bg-white py-16 sm:py-24" : "bg-chalk py-16 sm:py-24"}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold text-obsidian">{program.category}</h2>
              <p className="mt-4 text-lg text-gunmetal">{program.description}</p>
            </div>

            {idx === 0 && (
              <div className="relative mt-12 aspect-[21/9] overflow-hidden rounded-xl">
                <Image
                  src="/images/african-american-employee-working-goods-inventory.jpg"
                  alt="Professional engaged in hands-on training"
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {program.topics.map((topic) => (
                <div
                  key={topic.name}
                  className="rounded-xl border border-obsidian/10 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-obsidian">{topic.name}</h3>
                  <p className="mt-2 text-sm text-gunmetal">{topic.detail}</p>
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
            Interested in Our Training Programs?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-chalk/70">
            Send us a training inquiry and we'll work with you to design a program that fits your team's needs and schedule.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/forms/training-inquiry"
              className="inline-block rounded-md bg-azure px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-azure/90"
            >
              Submit Training Inquiry
            </Link>
            <Link
              href="/contact"
              className="inline-block rounded-md border border-chalk/30 px-8 py-3 text-base font-semibold text-chalk transition-colors hover:border-azure hover:text-azure"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
