"use client";
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const revealContainer = (stagger = 0.1, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.78, ease: smoothEase },
  },
};

function ScrollReveal({
  children,
  className,
  amount = 0.28,
  stagger = 0.1,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  stagger?: number;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={revealContainer(stagger, delay)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const services = [
  {
    title: "Video Editing",
    description:
      "Retention-led edits with precise pacing, clean structure, and a finish that keeps the creator's voice intact.",
  },
  {
    title: "Thumbnail Design",
    description:
      "Refined concepts built for clarity at speed, pairing sharp visual hierarchy with platform-aware restraint.",
  },
  {
    title: "Content Strategy",
    description:
      "A focused operating system for positioning, formats, hooks, and repeatable publishing momentum.",
  },
  {
    title: "Short-form Scaling",
    description:
      "High-output short-form workflows that translate long-form ideas into concise, native growth assets.",
  },
];

const portfolioProjects = [
  {
    title: "Tech Creator System",
    category: "Long-form Growth",
    description:
      "A full editing and publishing system for a technical creator, designed around clarity, retention, and repeatable output.",
  },
  {
    title: "Podcast Growth Edit",
    category: "Authority Content",
    description:
      "A cinematic podcast workflow with tighter pacing, cleaner narrative arcs, and polished assets for multi-platform release.",
  },
  {
    title: "Shorts Scaling Package",
    category: "Short-form Engine",
    description:
      "A focused short-form package turning core ideas into high-velocity clips with consistent structure and visual discipline.",
  },
];

const processSteps = [
  {
    title: "Discover",
    description:
      "We map your channel, audience, content gaps, and creative standards before touching the edit timeline.",
  },
  {
    title: "Strategy",
    description:
      "We define the formats, hooks, packaging, and operating rhythm that give each upload a clear role.",
  },
  {
    title: "Create",
    description:
      "We produce polished edits and assets with a tight feedback loop, built around retention and brand fit.",
  },
  {
    title: "Scale",
    description:
      "We turn what works into repeatable systems for volume, consistency, and compounding creator growth.",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0A0A0A] px-5 text-[#F5F5F5] selection:bg-[#7C3AED]/35 md:px-8">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-15%,rgba(124,58,237,0.24),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.045),transparent_18%,rgba(0,0,0,0.58)_86%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.08] [mask-image:radial-gradient(ellipse_at_center,black_18%,transparent_72%)]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
      </div>

      <motion.nav
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 flex w-full items-center justify-center pt-6"
      >
        <div className="flex w-full max-w-6xl items-center justify-between rounded-full border border-white/10 bg-white/[0.045] px-5 py-3.5 shadow-[0_18px_70px_rgba(0,0,0,0.32)] backdrop-blur-2xl md:px-6">
          <div className="text-base font-semibold text-white md:text-lg">
            Growframe
          </div>

          <div className="hidden items-center gap-7 text-sm font-medium text-zinc-400 md:flex">
            <a href="#services" className="transition-colors duration-300 hover:text-white">
              Services
            </a>
            <a href="#portfolio" className="transition-colors duration-300 hover:text-white">
              Portfolio
            </a>
            <a href="#process" className="transition-colors duration-300 hover:text-white">
              Process
            </a>
          </div>

          <button className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-all duration-300 hover:border-[#7C3AED]/50 hover:bg-[#7C3AED]/20 md:px-5">
            Contact
          </button>
        </div>
      </motion.nav>

      <motion.section
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.12,
              delayChildren: 0.18,
            },
          },
        }}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto grid min-h-[calc(100vh-92px)] w-full max-w-6xl items-center gap-12 py-16 md:grid-cols-[1.04fr_0.96fr] md:py-10"
      >
        <div className="max-w-4xl text-center md:text-left">
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 text-xs font-medium uppercase tracking-[0.38em] text-zinc-500"
          >
            Growframe Media
          </motion.p>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl font-semibold leading-[0.9] tracking-normal text-white sm:text-7xl lg:text-8xl xl:text-9xl"
          >
            Frame Content.
            <span className="block bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text pb-2 text-transparent">
              Grow Faster.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-7 max-w-2xl text-balance text-base leading-8 text-zinc-400 md:mx-0 md:text-xl"
          >
            We help creators build momentum with high-retention editing,
            refined thumbnails, and content systems designed for consistent
            output.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row md:justify-start"
          >
            <button className="w-full rounded-full bg-[#7C3AED] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_18px_60px_rgba(124,58,237,0.34),inset_0_1px_0_rgba(255,255,255,0.16)] transition-all duration-300 hover:bg-[#8B5CF6] hover:shadow-[0_22px_80px_rgba(124,58,237,0.42),inset_0_1px_0_rgba(255,255,255,0.18)] sm:w-auto">
              View Work
            </button>

            <button className="w-full rounded-full border border-white/10 bg-white/[0.035] px-7 py-3.5 text-sm font-semibold text-zinc-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white sm:w-auto">
              Free Sample Edit
            </button>
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
          className="relative mx-auto hidden h-[520px] w-full max-w-[440px] md:block"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-4 top-8 h-[430px] w-[310px] rotate-[-7deg] rounded-lg border border-white/10 bg-white/[0.045] p-3 shadow-[0_40px_120px_rgba(0,0,0,0.58)] backdrop-blur-2xl"
          >
            <div className="h-full rounded-lg border border-white/10 bg-[#111111] p-4">
              <div className="aspect-video rounded-md bg-[linear-gradient(135deg,rgba(124,58,237,0.32),rgba(255,255,255,0.08)_44%,rgba(0,0,0,0.5))]" />
              <div className="mt-5 space-y-3">
                <div className="h-2 w-24 rounded-full bg-white/25" />
                <div className="h-2 w-full rounded-full bg-white/10" />
                <div className="h-2 w-4/5 rounded-full bg-white/10" />
              </div>
              <div className="mt-9 grid grid-cols-4 gap-2">
                {[58, 78, 44, 92].map((height) => (
                  <div key={height} className="flex h-24 items-end rounded-lg bg-white/[0.045] p-1.5">
                    <div
                      className="w-full rounded-md bg-[#7C3AED]/70"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-0 top-24 h-[360px] w-[255px] rotate-[8deg] rounded-lg border border-white/10 bg-[#151515]/80 p-4 shadow-[0_32px_100px_rgba(0,0,0,0.5)] backdrop-blur-xl"
          >
            <div className="text-xs font-medium uppercase tracking-[0.28em] text-zinc-500">
              System
            </div>
            <div className="mt-5 space-y-3">
              {["Edit", "Thumbnail", "Publish", "Review"].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.035] px-3 py-3"
                >
                  <span className="text-sm text-zinc-300">{item}</span>
                  <span className="h-2 w-2 rounded-full bg-[#7C3AED]" style={{ opacity: 1 - index * 0.15 }} />
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      <section id="services" className="relative z-10 mx-auto w-full max-w-6xl py-24 md:py-32">
        <ScrollReveal
          amount={0.35}
          className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16"
        >
          <div className="max-w-xl">
            <motion.p
              variants={fadeUp}
              className="mb-5 text-xs font-medium uppercase tracking-[0.34em] text-zinc-500"
            >
              Services
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="text-4xl font-semibold leading-tight tracking-normal text-white md:text-5xl"
            >
              Built for creators who treat content like a serious growth system.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-base leading-8 text-zinc-400 md:text-lg"
            >
              Every service is designed to improve attention, consistency, and
              output quality without adding noise to the creative process.
            </motion.p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                variants={fadeUp}
                className="group relative min-h-64 overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.055] hover:shadow-[0_32px_100px_rgba(0,0,0,0.34)]"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60" />
                <div className="flex h-full flex-col justify-between gap-10">
                  <div>
                    <p className="mb-7 text-xs font-medium text-zinc-600">
                      0{index + 1}
                    </p>
                    <h3 className="text-2xl font-semibold tracking-normal text-white">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-sm leading-7 text-zinc-400 transition-colors duration-500 group-hover:text-zinc-300">
                    {service.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section id="portfolio" className="relative z-10 mx-auto w-full max-w-6xl py-24 md:py-32">
        <ScrollReveal amount={0.25} stagger={0.12}>
          <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <motion.p
                variants={fadeUp}
                className="mb-5 text-xs font-medium uppercase tracking-[0.34em] text-zinc-500"
              >
                Portfolio
              </motion.p>

              <motion.h2
                variants={fadeUp}
                className="text-4xl font-semibold leading-tight tracking-normal text-white md:text-5xl"
              >
                Selected systems for creators building durable audience growth.
              </motion.h2>
            </div>

            <motion.p
              variants={fadeUp}
              className="max-w-sm text-sm leading-7 text-zinc-400"
            >
              A restrained look at the editorial, thumbnail, and scaling
              systems behind creator channels built to compound.
            </motion.p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {portfolioProjects.map((project, index) => (
              <motion.article
                key={project.title}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] p-3 shadow-[0_28px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.055] hover:shadow-[0_36px_120px_rgba(0,0,0,0.4)]"
              >
                <div className="relative aspect-[16/11] overflow-hidden rounded-lg border border-white/10 bg-[#101010]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(124,58,237,0.24),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_42%,rgba(255,255,255,0.035))] opacity-80 transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-x-5 top-5 flex items-center justify-between">
                    <span className="h-2 w-16 rounded-full bg-white/18" />
                    <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/35">
                      0{index + 1}
                    </span>
                  </div>
                  <div className="absolute inset-x-5 bottom-5 space-y-3">
                    <div className="h-2 w-3/4 rounded-full bg-white/18" />
                    <div className="h-2 w-1/2 rounded-full bg-white/10" />
                  </div>
                  <div className="absolute bottom-5 right-5 h-16 w-16 rounded-lg border border-white/10 bg-white/[0.045] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-transform duration-700 group-hover:translate-y-[-3px]" />
                </div>

                <div className="px-3 pb-3 pt-6">
                  <p className="mb-4 text-xs font-medium uppercase tracking-[0.26em] text-zinc-500">
                    {project.category}
                  </p>
                  <h3 className="text-2xl font-semibold tracking-normal text-white">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-zinc-400 transition-colors duration-500 group-hover:text-zinc-300">
                    {project.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section id="process" className="relative z-10 mx-auto w-full max-w-6xl py-24 md:py-32">
        <ScrollReveal amount={0.25} stagger={0.11}>
          <div className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
            <motion.p
              variants={fadeUp}
              className="mb-5 text-xs font-medium uppercase tracking-[0.34em] text-zinc-500"
            >
              Process
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="text-4xl font-semibold leading-tight tracking-normal text-white md:text-5xl"
            >
              A clear operating rhythm from first audit to scaled output.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-400"
            >
              The workflow is structured to remove ambiguity, protect creative
              quality, and keep every decision connected to channel growth.
            </motion.p>
          </div>

          <div className="relative">
            <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent md:block" />

            <div className="grid gap-4 md:grid-cols-4">
              {processSteps.map((step, index) => (
                <motion.article
                  key={step.title}
                  variants={fadeUp}
                  className="group relative rounded-lg border border-white/10 bg-white/[0.03] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05] hover:shadow-[0_32px_100px_rgba(0,0,0,0.34)]"
                >
                  <div className="relative z-10 mb-10 flex items-center justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-white/10 bg-[#111111]/90 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors duration-500 group-hover:border-[#7C3AED]/40">
                      0{index + 1}
                    </div>
                    <div className="h-px flex-1 bg-white/10 md:hidden" />
                  </div>

                  <h3 className="text-2xl font-semibold tracking-normal text-white">
                    {step.title}
                  </h3>
                  <p className="mt-5 text-sm leading-7 text-zinc-400 transition-colors duration-500 group-hover:text-zinc-300">
                    {step.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="relative z-10 mx-auto w-full max-w-6xl pb-24 pt-16 md:pb-32 md:pt-24">
        <ScrollReveal
          amount={0.35}
          stagger={0.12}
          className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] px-6 py-16 text-center shadow-[0_40px_140px_rgba(0,0,0,0.42)] backdrop-blur-2xl md:px-12 md:py-24"
        >
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.18),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.055),transparent_34%)]" />
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

          <div className="relative mx-auto max-w-4xl">
            <motion.p
              variants={fadeUp}
              className="mb-6 text-xs font-medium uppercase tracking-[0.34em] text-zinc-500"
            >
              Growframe
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="text-5xl font-semibold leading-[1.02] tracking-normal text-white md:text-7xl"
            >
              Built for creators serious about growth.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-7 max-w-2xl text-base leading-8 text-zinc-400 md:text-lg"
            >
              We help creators turn attention into consistent momentum through
              refined editing, systems, and scalable content operations.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col items-center justify-center gap-4"
            >
              <button className="w-full rounded-full bg-[#7C3AED] px-8 py-4 text-sm font-semibold text-white shadow-[0_22px_80px_rgba(124,58,237,0.38),inset_0_1px_0_rgba(255,255,255,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#8B5CF6] hover:shadow-[0_28px_100px_rgba(124,58,237,0.46),inset_0_1px_0_rgba(255,255,255,0.18)] sm:w-auto">
                Book a Free Strategy Call
              </button>

              <p className="text-sm text-zinc-500">
                For creators ready to build with more clarity, consistency, and
                taste.
              </p>
            </motion.div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
