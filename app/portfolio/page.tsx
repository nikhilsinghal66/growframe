"use client";
import {
  MotionConfig,
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";
import type { PointerEvent, ReactNode } from "react";

const smoothEase = [0.16, 1, 0.3, 1] as const;

const revealContainer = (stagger = 0.1, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

const cinematicFadeUp: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(8px)", scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 0.76, ease: smoothEase },
  },
};

const reducedFadeUp: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.32, ease: "easeOut" },
  },
};

const cardSpring = { stiffness: 170, damping: 20, mass: 0.6 };
const cardTransition = {
  type: "spring",
  stiffness: 230,
  damping: 24,
  mass: 0.65,
} as const;

type ProjectCategory = "podcast" | "youtube-long" | "shorts" | "reels" | "educational" | "tech";

interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  accent: string;
  metrics: {
    before: string;
    after: string;
  };
  thumbnail?: string;
}

interface CreatorCategory {
  name: string;
  category: ProjectCategory;
  count: number;
  description: string;
  accent: string;
}

interface ResultHighlight {
  metric: string;
  description: string;
  accent: string;
}

function ScrollReveal({
  children,
  className,
  amount = 0.25,
  stagger = 0.08,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  stagger?: number;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount, margin: "0px 0px -10% 0px" }}
      variants={
        shouldReduceMotion ? revealContainer(0, 0) : revealContainer(stagger, delay)
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

function PremiumCard({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const rotateXValue = useMotionValue(0);
  const rotateYValue = useMotionValue(0);
  const rotateX = useSpring(rotateXValue, cardSpring);
  const rotateY = useSpring(rotateYValue, cardSpring);

  const moveCard = (event: PointerEvent<HTMLElement>) => {
    if (shouldReduceMotion || event.pointerType !== "mouse") {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerX = event.clientX - bounds.left;
    const pointerY = event.clientY - bounds.top;
    const xPercent = pointerX / bounds.width;
    const yPercent = pointerY / bounds.height;

    rotateXValue.set((0.5 - yPercent) * 3);
    rotateYValue.set((xPercent - 0.5) * 3);
  };

  const resetCard = () => {
    rotateXValue.set(0);
    rotateYValue.set(0);
  };

  return (
    <motion.article
      data-cursor="card"
      variants={shouldReduceMotion ? reducedFadeUp : cinematicFadeUp}
      whileHover={shouldReduceMotion ? undefined : { y: -5, scale: 1.008 }}
      whileTap={
        shouldReduceMotion
          ? undefined
          : {
              scale: 0.982,
              y: -2,
              transition: {
                type: "spring",
                stiffness: 450,
                damping: 24,
                mass: 0.4,
              },
            }
      }
      transition={cardTransition}
      onPointerMove={moveCard}
      onPointerLeave={resetCard}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
      }}
      className={className}
    >
      {children}
    </motion.article>
  );
}

function MagneticButton({
  children,
  className,
  href,
}: {
  children: ReactNode;
  className: string;
  href?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const xValue = useMotionValue(0);
  const yValue = useMotionValue(0);
  const x = useSpring(xValue, { stiffness: 180, damping: 18, mass: 0.45 });
  const y = useSpring(yValue, { stiffness: 180, damping: 18, mass: 0.45 });

  const moveTowardPointer = (event: PointerEvent<HTMLElement>) => {
    if (shouldReduceMotion || event.pointerType !== "mouse") {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const xOffset = event.clientX - bounds.left - bounds.width / 2;
    const yOffset = event.clientY - bounds.top - bounds.height / 2;

    xValue.set((xOffset / bounds.width) * 12);
    yValue.set((yOffset / bounds.height) * 9);
  };

  const resetPosition = () => {
    xValue.set(0);
    yValue.set(0);
  };

  const magneticTransition = {
    type: "spring" as const,
    stiffness: 260,
    damping: 22,
    mass: 0.55,
  };

  const motionProps = {
    className,
    "data-cursor": "button",
    style: { x, y },
    onPointerMove: moveTowardPointer,
    onPointerLeave: resetPosition,
    whileHover: shouldReduceMotion ? undefined : { scale: 1.018 },
    whileTap: shouldReduceMotion
      ? undefined
      : {
          scale: 0.96,
          transition: {
            type: "spring" as const,
            stiffness: 450,
            damping: 24,
            mass: 0.4,
          },
        },
    transition: magneticTransition,
  };

  if (href) {
    return (
      <motion.a href={href} {...motionProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button {...motionProps}>
      {children}
    </motion.button>
  );
}

// Featured Projects Data
const projects: Project[] = [
  {
    id: "podcast-1",
    title: "Podcast Narrative Overhaul",
    description:
      "Transformed 2-hour raw recordings into 12 viral podcast clips per month, averaging 45K views with retention hooks at every cut.",
    category: "podcast",
    accent: "linear-gradient(135deg, rgba(59,130,246,0.95), rgba(124,58,237,0.65))",
    metrics: {
      before: "1.2K avg views",
      after: "45K avg views",
    },
  },
  {
    id: "youtube-1",
    title: "Channel Scaling System",
    description:
      "Built a repeatable editing and publishing pipeline for a tech creator, scaling from 2 to 4 videos per week with improved retention.",
    category: "youtube-long",
    accent: "linear-gradient(135deg, rgba(245,158,11,0.95), rgba(249,115,22,0.65))",
    metrics: {
      before: "2 videos/week",
      after: "4 videos/week",
    },
  },
  {
    id: "shorts-1",
    title: "Short-Form Velocity Strategy",
    description:
      "Designed a shorts-first content system that converted long-form uploads into 8 platform-specific shorts daily with 60% higher engagement.",
    category: "shorts",
    accent: "linear-gradient(135deg, rgba(20,184,166,0.95), rgba(14,165,233,0.65))",
    metrics: {
      before: "18% avg engagement",
      after: "60% avg engagement",
    },
  },
];

// Creator Categories Data
const creatorCategories: CreatorCategory[] = [
  {
    name: "Podcast Editing",
    category: "podcast",
    count: 24,
    description:
      "Cinematic podcast clips with tight narrative arcs, clean transitions, and platform-specific pacing for multi-platform distribution.",
    accent: "linear-gradient(135deg, rgba(59,130,246,0.95), rgba(124,58,237,0.65))",
  },
  {
    name: "YouTube Long Form",
    category: "youtube-long",
    count: 18,
    description:
      "Retention-optimized editing for 10-60 minute videos with strategic pacing, visual depth, and retention-tested thumbnail moments.",
    accent: "linear-gradient(135deg, rgba(245,158,11,0.95), rgba(249,115,22,0.65))",
  },
  {
    name: "Shorts Editing",
    category: "shorts",
    count: 32,
    description:
      "High-velocity short-form edits designed for immediate hook, consistent visual language, and algorithmic performance across platforms.",
    accent: "linear-gradient(135deg, rgba(20,184,166,0.95), rgba(14,165,233,0.65))",
  },
  {
    name: "Reels Editing",
    category: "reels",
    count: 28,
    description:
      "Native Instagram Reels format with sound design, motion graphics, and engagement-optimized pacing for social-first audiences.",
    accent: "linear-gradient(135deg, rgba(167,139,250,0.95), rgba(244,114,182,0.65))",
  },
  {
    name: "Educational Content",
    category: "educational",
    count: 16,
    description:
      "Educational video production with strategic chapter breaks, infographics, and retention-first pacing for learning platforms.",
    accent: "linear-gradient(135deg, rgba(236,72,153,0.95), rgba(168,85,247,0.65))",
  },
  {
    name: "Tech Content",
    category: "tech",
    count: 22,
    description:
      "Software walkthroughs and technical tutorials with clear screen recording, emphasis layers, and step-by-step narrative structure.",
    accent: "linear-gradient(135deg, rgba(34,197,94,0.95), rgba(34,197,94,0.65))",
  },
];

// Results Highlights Data
const resultHighlights: ResultHighlight[] = [
  {
    metric: "8.2x Average Growth",
    description: "Median audience growth across active creator projects over 12 months",
    accent: "linear-gradient(135deg, rgba(59,130,246,0.95), rgba(124,58,237,0.65))",
  },
  {
    metric: "142 Creators Served",
    description: "Active partnerships across podcast, YouTube, educational, and tech niches",
    accent: "linear-gradient(135deg, rgba(245,158,11,0.95), rgba(249,115,22,0.65))",
  },
  {
    metric: "3.4B+ Total Views",
    description: "Cumulative views generated across all creator content in the last 24 months",
    accent: "linear-gradient(135deg, rgba(20,184,166,0.95), rgba(14,165,233,0.65))",
  },
  {
    metric: "52 Week Avg Retention",
    description: "Average audience retention improvement per creator within first 90 days",
    accent: "linear-gradient(135deg, rgba(167,139,250,0.95), rgba(244,114,182,0.65))",
  },
];

function PortfolioPage() {
  const shouldReduceMotion = useReducedMotion();
  const fadeUp = shouldReduceMotion ? reducedFadeUp : cinematicFadeUp;

  return (
    <MotionConfig reducedMotion={shouldReduceMotion ? "always" : "user"}>
      <main className="relative min-h-screen w-full overflow-hidden bg-[#0A0A0A]">
        {/* Atmosphere Effects */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 2.4, ease: smoothEase, delay: 0.15 }}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-14%,rgba(124,58,237,0.20),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.045),transparent_16%,rgba(0,0,0,0.62)_88%)]" />
            <motion.div
              animate={
                shouldReduceMotion
                  ? { y: 0 }
                  : {
                      x: [0, 18, -10, 0],
                      y: [0, -22, 12, 0],
                      scale: [1, 1.04, 0.98, 1],
                    }
              }
              transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-[-18rem] h-[36rem] w-[52rem] -translate-x-1/2 rounded-full bg-[#7C3AED]/14 blur-[150px]"
            />
            <motion.div
              animate={
                shouldReduceMotion
                  ? { y: 0 }
                  : {
                      x: [0, -14, 16, 0],
                      y: [0, 18, -10, 0],
                      scale: [1, 0.97, 1.03, 1],
                    }
              }
              transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-[-18rem] top-[34rem] h-[42rem] w-[42rem] rounded-full bg-[#A78BFA]/8 blur-[160px]"
            />
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Portfolio Hero */}
          <section className="relative min-h-screen w-full pt-40 pb-20 sm:pt-52 sm:pb-24 lg:pb-32">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <ScrollReveal amount={0.3} className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <motion.div variants={revealContainer(0.08, 0.1)} className="text-center">
                <motion.p
                  variants={fadeUp}
                  className="mb-3 text-[11px] font-medium uppercase tracking-[0.32em] text-zinc-500 sm:text-xs sm:tracking-[0.34em]"
                >
                  Portfolio
                </motion.p>

                <motion.h1
                  variants={fadeUp}
                  className="text-5xl font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-6xl md:text-7xl"
                >
                  Growth
                  <span className="block bg-gradient-to-r from-[#7C3AED] via-[#A78BFA] to-[#DDD6FE] bg-clip-text text-transparent">
                    Made Visible
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400 sm:text-xl sm:leading-9"
                >
                  142 creators across podcasts, YouTube, and short-form have scaled their audiences
                  using systems designed for retention, consistency, and sustainable growth.
                </motion.p>

                <motion.div variants={fadeUp} className="mt-10 flex justify-center gap-4">
                  <MagneticButton
                    href="/#contact"
                    className="flex min-h-12 items-center justify-center rounded-full bg-[#7C3AED] px-8 py-4 text-sm font-semibold text-white shadow-[0_22px_80px_rgba(124,58,237,0.38),inset_0_1px_0_rgba(255,255,255,0.16)] transition-shadow duration-500 ease-out hover:bg-[#8B5CF6] hover:shadow-[0_30px_110px_rgba(124,58,237,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]"
                  >
                    Start Your Growth
                  </MagneticButton>
                </motion.div>
              </motion.div>
            </ScrollReveal>
          </section>

          {/* Featured Projects */}
          <section className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <ScrollReveal amount={0.25}>
              <div className="mx-auto mb-12 max-w-3xl text-center">
                <motion.p
                  variants={fadeUp}
                  className="mb-3 text-[11px] font-medium uppercase tracking-[0.32em] text-zinc-500 sm:text-xs sm:tracking-[0.34em]"
                >
                  Featured Work
                </motion.p>

                <motion.h2
                  variants={fadeUp}
                  className="text-4xl font-semibold leading-tight tracking-normal text-white sm:text-5xl md:text-6xl"
                >
                  Projects that scaled
                </motion.h2>

                <motion.p
                  variants={fadeUp}
                  className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-400 sm:mt-5 sm:leading-8"
                >
                  Real results from real creators. Each project showcases our approach to retention-first editing and scalable systems.
                </motion.p>
              </div>

              <motion.ul
                variants={revealContainer(0.08, 0.06)}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {projects.map((project) => (
                  <PremiumCard
                    key={project.id}
                    className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#111111]/92 via-[#0A0A0A]/80 to-[#080808]/95 p-6 shadow-[0_32px_112px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:p-8"
                  >
                    <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.12),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.05),transparent)]" />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl"
                      style={{ background: project.accent }}
                    />

                    <div className="relative z-10 flex h-full flex-col justify-between gap-4">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.28em] text-zinc-500">
                          {project.category.replace("-", " ")}
                        </p>
                        <h3 className="mt-3 text-xl font-semibold tracking-[-0.01em] text-white sm:text-2xl">
                          {project.title}
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-zinc-300">
                          {project.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-4">
                        <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] p-3">
                          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-zinc-500">
                            Before
                          </p>
                          <p className="mt-2 text-xs font-semibold text-zinc-400">
                            {project.metrics.before}
                          </p>
                        </div>
                        <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] p-3">
                          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-zinc-500">
                            After
                          </p>
                          <p
                            className="mt-2 text-xs font-semibold"
                            style={{
                              background: project.accent,
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text",
                            }}
                          >
                            {project.metrics.after}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-px"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
                      }}
                    />
                  </PremiumCard>
                ))}
              </motion.ul>
            </ScrollReveal>
          </section>

          {/* Video Showcase Grid */}
          <section className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <ScrollReveal amount={0.25}>
              <div className="mx-auto mb-12 max-w-3xl text-center">
                <motion.p
                  variants={fadeUp}
                  className="mb-3 text-[11px] font-medium uppercase tracking-[0.32em] text-zinc-500 sm:text-xs sm:tracking-[0.34em]"
                >
                  Showcase
                </motion.p>

                <motion.h2
                  variants={fadeUp}
                  className="text-4xl font-semibold leading-tight tracking-normal text-white sm:text-5xl md:text-6xl"
                >
                  Content Examples
                </motion.h2>

                <motion.p
                  variants={fadeUp}
                  className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-400 sm:mt-5 sm:leading-8"
                >
                  Explore our work across different content formats and creator niches. Real videos will be integrated as projects complete.
                </motion.p>
              </div>

              <motion.ul
                variants={revealContainer(0.08, 0.06)}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {creatorCategories.map((item) => (
                  <motion.li
                    key={item.category}
                    role="listitem"
                    variants={shouldReduceMotion ? reducedFadeUp : cinematicFadeUp}
                    whileHover={shouldReduceMotion ? undefined : { y: -8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 220, damping: 22, mass: 0.55 }}
                    className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_32px_112px_rgba(0,0,0,0.42)]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#111111]/92 via-[#0A0A0A]/80 to-[#080808]/95 backdrop-blur-2xl">
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(124,58,237,0.15),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_42%,rgba(255,255,255,0.035))]"
                      />

                      <div
                        aria-hidden="true"
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(135deg, ${item.accent.split("(")[1].split(",")[0]}40, transparent)`,
                        }}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent" />

                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          whileHover={shouldReduceMotion ? undefined : { scale: 1.15 }}
                          whileTap={shouldReduceMotion ? undefined : { scale: 0.9 }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                          className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/40 bg-white/10 backdrop-blur-xl transition-all duration-300 group-hover:border-white/60 group-hover:bg-white/20"
                        >
                          <svg
                            className="h-6 w-6 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </motion.div>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end gap-3 p-4 sm:p-5">
                        <div>
                          <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/60">
                            {item.count} Projects
                          </p>
                          <p className="mt-1 text-lg font-semibold tracking-[-0.01em] text-white sm:text-xl">
                            {item.name}
                          </p>
                        </div>
                        <p className="text-xs leading-5 text-white/70 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-px"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${item.accent.split("(")[1].split(",")[0]}80, transparent)`,
                      }}
                    />
                  </motion.li>
                ))}
              </motion.ul>
            </ScrollReveal>
          </section>

          {/* Results Highlights */}
          <section className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <ScrollReveal amount={0.25}>
              <div className="mx-auto mb-12 max-w-3xl text-center">
                <motion.p
                  variants={fadeUp}
                  className="mb-3 text-[11px] font-medium uppercase tracking-[0.32em] text-zinc-500 sm:text-xs sm:tracking-[0.34em]"
                >
                  By The Numbers
                </motion.p>

                <motion.h2
                  variants={fadeUp}
                  className="text-4xl font-semibold leading-tight tracking-normal text-white sm:text-5xl md:text-6xl"
                >
                  Collective Impact
                </motion.h2>
              </div>

              <motion.ul
                variants={revealContainer(0.08, 0.06)}
                className="grid gap-6 sm:grid-cols-2"
              >
                {resultHighlights.map((item, idx) => (
                  <motion.li
                    key={idx}
                    variants={shouldReduceMotion ? reducedFadeUp : cinematicFadeUp}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#111111]/92 via-[#0A0A0A]/80 to-[#080808]/95 p-8 shadow-[0_32px_112px_rgba(0,0,0,0.42)] backdrop-blur-2xl"
                  >
                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.12),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.05),transparent)]" />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl"
                      style={{ background: item.accent }}
                    />

                    <div className="relative z-10">
                      <p
                        className="text-3xl font-bold sm:text-4xl"
                        style={{
                          background: item.accent,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        {item.metric}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-zinc-400">
                        {item.description}
                      </p>
                    </div>

                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-px"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)`,
                      }}
                    />
                  </motion.li>
                ))}
              </motion.ul>
            </ScrollReveal>
          </section>

          {/* CTA Section */}
          <section className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-12 sm:px-6 sm:pb-24 sm:pt-16 lg:px-8 lg:pb-32 lg:pt-24">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <ScrollReveal amount={0.35}>
              <motion.div
                variants={revealContainer(0.12, 0.08)}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] px-8 py-16 text-center shadow-[0_40px_140px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:px-12 sm:py-20 md:px-16 md:py-28"
              >
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.18),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.055),transparent_34%)]" />
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                <div className="relative mx-auto max-w-2xl">
                  <motion.p
                    variants={fadeUp}
                    className="text-[11px] font-medium uppercase tracking-[0.32em] text-zinc-500 sm:text-xs sm:tracking-[0.34em]"
                  >
                    Ready to Grow
                  </motion.p>

                  <motion.h2
                    variants={fadeUp}
                    className="mt-4 text-4xl font-semibold leading-[1.1] tracking-normal text-white sm:text-5xl md:text-6xl"
                  >
                    Let&apos;s scale your audience
                  </motion.h2>

                  <motion.p
                    variants={fadeUp}
                    className="mx-auto mt-6 max-w-xl text-base leading-7 text-zinc-400 sm:mt-8 sm:text-lg sm:leading-8"
                  >
                    Join 142+ creators building sustainable momentum. Book a free strategy call or send your brief to growframe.agency@gmail.com.
                  </motion.p>

                  <motion.div
                    variants={fadeUp}
                    className="mt-8 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row"
                  >
                    <MagneticButton
                      href="/#contact"
                      className="flex min-h-12 w-full items-center justify-center rounded-full bg-[#7C3AED] px-8 py-4 text-sm font-semibold text-white shadow-[0_22px_80px_rgba(124,58,237,0.38),inset_0_1px_0_rgba(255,255,255,0.16)] transition-shadow duration-500 ease-out hover:bg-[#8B5CF6] hover:shadow-[0_30px_110px_rgba(124,58,237,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] sm:w-auto"
                    >
                      Book Free Call
                    </MagneticButton>
                    <a
                      href="mailto:growframe.agency@gmail.com"
                      className="flex min-h-12 w-full items-center justify-center rounded-full border border-white/20 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/[0.08] sm:w-auto"
                    >
                      Send Brief
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </ScrollReveal>
          </section>
        </div>
      </main>
    </MotionConfig>
  );
}

export default PortfolioPage;
