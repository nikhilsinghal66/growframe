"use client";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValueEvent,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import type { ChangeEvent, FormEvent, PointerEvent, ReactNode } from "react";
import { useState } from "react";

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

const cinematicFadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.78, ease: smoothEase },
  },
};

const reducedFadeUp: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.32, ease: "easeOut" },
  },
};

const magneticSpring = { stiffness: 180, damping: 18, mass: 0.45 };
const magneticTransition = {
  type: "spring",
  stiffness: 260,
  damping: 22,
  mass: 0.55,
} as const;

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Process", href: "#process" },
];

const initialContactForm = {
  fullName: "",
  email: "",
  niche: "",
  subscriberCount: "",
  message: "",
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
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount, margin: "0px 0px -8% 0px" }}
      variants={
        shouldReduceMotion ? revealContainer(0, 0) : revealContainer(stagger, delay)
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

function MagneticButton({
  children,
  className,
  href,
  type = "button",
  disabled = false,
}: {
  children: ReactNode;
  className: string;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const xValue = useMotionValue(0);
  const yValue = useMotionValue(0);
  const x = useSpring(xValue, magneticSpring);
  const y = useSpring(yValue, magneticSpring);
  const motionDisabled = disabled || shouldReduceMotion;

  const moveTowardPointer = (event: PointerEvent<HTMLElement>) => {
    if (motionDisabled || event.pointerType !== "mouse") {
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

  const motionProps = {
    className,
    style: { x, y },
    onPointerMove: moveTowardPointer,
    onPointerLeave: resetPosition,
    whileHover: motionDisabled ? undefined : { scale: 1.018 },
    whileTap: motionDisabled ? undefined : { scale: 0.985 },
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
    <motion.button type={type} disabled={disabled} {...motionProps}>
      {children}
    </motion.button>
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
  const [navElevated, setNavElevated] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [contactForm, setContactForm] = useState(initialContactForm);
  const [contactStatus, setContactStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [contactError, setContactError] = useState("");
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const fadeUp = shouldReduceMotion ? reducedFadeUp : cinematicFadeUp;
  const cardHover = shouldReduceMotion ? undefined : { y: -4, scale: 1.006 };
  const floatingMotion = shouldReduceMotion ? { y: 0 } : { y: [0, -10, 0] };
  const floatingMotionAlt = shouldReduceMotion ? { y: 0 } : { y: [0, 12, 0] };

  useMotionValueEvent(scrollY, "change", (latest) => {
    setNavElevated(latest > 24);

    if (latest > 80) {
      setMobileNavOpen(false);
    }
  });

  const updateContactField =
    (field: keyof typeof initialContactForm) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setContactForm((current) => ({
        ...current,
        [field]: event.target.value,
      }));

      if (contactStatus !== "idle") {
        setContactStatus("idle");
        setContactError("");
      }
    };

  const validateContactForm = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (contactForm.fullName.trim().length < 2) {
      return "Enter your full name.";
    }

    if (!emailPattern.test(contactForm.email.trim())) {
      return "Enter a valid email address.";
    }

    if (contactForm.niche.trim().length < 2) {
      return "Tell us your creator niche.";
    }

    if (contactForm.subscriberCount.trim().length < 1) {
      return "Add your current subscriber count.";
    }

    if (contactForm.message.trim().length < 20) {
      return "Share a little more about your goals.";
    }

    return null;
  };

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateContactForm();

    if (validationError) {
      setContactStatus("error");
      setContactError(validationError);
      return;
    }

    setContactStatus("submitting");
    setContactError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      });

      const result = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (!response.ok) {
        throw new Error(result?.error ?? "Something went wrong.");
      }

      setContactStatus("success");
      setContactForm(initialContactForm);
    } catch (error) {
      setContactStatus("error");
      setContactError(
        error instanceof Error
          ? error.message
          : "Unable to send your inquiry right now.",
      );
    }
  };

  return (
    <MotionConfig reducedMotion="user">
    <main className="relative min-h-screen overflow-hidden bg-[#0A0A0A] px-4 text-[#F5F5F5] selection:bg-[#7C3AED]/35 sm:px-6 lg:px-8">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-15%,rgba(124,58,237,0.24),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.045),transparent_18%,rgba(0,0,0,0.58)_86%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.08] [mask-image:radial-gradient(ellipse_at_center,black_18%,transparent_72%)]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
      </div>

      <motion.header
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: smoothEase }}
        className="sticky top-0 z-50 -mx-4 flex w-[calc(100%+2rem)] items-center justify-center px-4 py-3 sm:-mx-6 sm:w-[calc(100%+3rem)] sm:px-6 sm:py-4 lg:-mx-8 lg:w-[calc(100%+4rem)] lg:px-8"
      >
        <nav className="relative w-full max-w-6xl 2xl:max-w-7xl" aria-label="Primary navigation">
          <div
            className={`flex w-full items-center justify-between rounded-full border px-4 py-3 backdrop-blur-2xl transition-all duration-500 sm:px-5 md:px-6 md:py-3.5 ${
              navElevated
                ? "border-white/15 bg-[#101010]/80 shadow-[0_20px_90px_rgba(0,0,0,0.48),inset_0_1px_0_rgba(255,255,255,0.08)]"
                : "border-white/10 bg-white/[0.045] shadow-[0_18px_70px_rgba(0,0,0,0.32)]"
            }`}
          >
            <a
              href="#"
              className="flex min-h-10 items-center text-base font-semibold text-white transition-opacity duration-300 hover:opacity-80 md:text-lg"
              aria-label="Growframe home"
            >
              <Image
                src="/growframe-logo.svg"
                alt="Growframe"
                width={152}
                height={36}
                decoding="async"
                draggable={false}
                unoptimized
                className="hidden h-9 w-auto select-none md:block"
              />
              <span className="md:hidden">Growframe</span>
            </a>

            <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-black/20 p-1 text-sm font-medium text-zinc-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-4 py-2 transition-all duration-500 ease-out hover:bg-white/[0.07] hover:text-white hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="hidden items-center md:flex">
              <MagneticButton
                href="#contact"
                className="min-h-10 rounded-full border border-white/10 bg-white/10 px-5 py-2 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-[#7C3AED]/50 hover:bg-[#7C3AED]/20 hover:shadow-[0_16px_50px_rgba(124,58,237,0.24),inset_0_1px_0_rgba(255,255,255,0.16)] active:translate-y-0 active:scale-[0.98]"
              >
                Contact
              </MagneticButton>
            </div>

            <button
              type="button"
              aria-label={mobileNavOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-500 ease-out hover:border-white/20 hover:bg-white/[0.14] active:scale-95 md:hidden"
            >
              <span className="relative h-3.5 w-4">
                <span
                  className={`absolute left-0 top-0 h-px w-4 bg-white transition-transform duration-300 ${
                    mobileNavOpen ? "translate-y-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 bottom-0 h-px w-4 bg-white transition-transform duration-300 ${
                    mobileNavOpen ? "-translate-y-[7px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>

          <AnimatePresence>
            {mobileNavOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.28, ease: smoothEase }}
                className="absolute left-0 right-0 top-[calc(100%+0.5rem)] overflow-hidden rounded-lg border border-white/10 bg-[#101010]/90 p-2 shadow-[0_28px_90px_rgba(0,0,0,0.52),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl md:hidden"
              >
                <div className="grid gap-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileNavOpen(false)}
                      className="rounded-lg px-4 py-3 text-sm font-medium text-zinc-300 transition-all duration-300 hover:bg-white/[0.06] hover:text-white active:scale-[0.99]"
                    >
                      {link.label}
                    </a>
                  ))}
                  <a
                    href="#contact"
                    onClick={() => setMobileNavOpen(false)}
                    className="mt-1 rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-[#7C3AED]/40 hover:bg-[#7C3AED]/15 active:scale-[0.99]"
                  >
                    Contact
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>

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
        className="relative z-10 mx-auto grid min-h-[calc(100svh-84px)] w-full max-w-6xl items-center gap-12 py-14 sm:py-16 lg:grid-cols-[1.04fr_0.96fr] lg:py-10 2xl:max-w-7xl"
      >
        <div className="mx-auto max-w-4xl text-center lg:mx-0 lg:text-left">
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 text-[11px] font-medium uppercase tracking-[0.32em] text-zinc-500 sm:mb-6 sm:text-xs sm:tracking-[0.38em]"
          >
            Growframe Media
          </motion.p>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl font-semibold leading-[0.92] tracking-normal text-white sm:text-7xl lg:text-8xl xl:text-9xl"
          >
            Frame Content.
            <span className="block bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text pb-2 text-transparent">
              Grow Faster.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-2xl text-balance text-base leading-7 text-zinc-400 sm:mt-7 sm:leading-8 md:text-lg lg:mx-0 lg:text-xl"
          >
            We help creators build momentum with high-retention editing,
            refined thumbnails, and content systems designed for consistent
            output.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-9 sm:flex-row lg:justify-start"
          >
            <MagneticButton
              className="min-h-12 w-full rounded-full bg-[#7C3AED] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_18px_60px_rgba(124,58,237,0.34),inset_0_1px_0_rgba(255,255,255,0.16)] transition-shadow duration-500 ease-out hover:bg-[#8B5CF6] hover:shadow-[0_24px_85px_rgba(124,58,237,0.46),inset_0_1px_0_rgba(255,255,255,0.2)] sm:w-auto"
            >
              View Work
            </MagneticButton>

            <MagneticButton
              className="min-h-12 w-full rounded-full border border-white/10 bg-white/[0.035] px-7 py-3.5 text-sm font-semibold text-zinc-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-colors duration-500 ease-out hover:border-white/20 hover:bg-white/[0.07] hover:text-white sm:w-auto"
            >
              Free Sample Edit
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
          className="relative mx-auto hidden h-[520px] w-full max-w-[440px] lg:block"
        >
          <motion.div
            animate={floatingMotion}
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
            animate={floatingMotionAlt}
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

      <section id="services" className="relative z-10 mx-auto w-full max-w-6xl py-20 sm:py-24 lg:py-32 2xl:max-w-7xl">
        <ScrollReveal
          amount={0.35}
          className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16"
        >
          <div className="max-w-xl lg:pt-2">
            <motion.p
              variants={fadeUp}
              className="mb-4 text-[11px] font-medium uppercase tracking-[0.32em] text-zinc-500 sm:mb-5 sm:text-xs sm:tracking-[0.34em]"
            >
              Services
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="text-3xl font-semibold leading-tight tracking-normal text-white sm:text-4xl md:text-5xl"
            >
              Built for creators who treat content like a serious growth system.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-base leading-7 text-zinc-400 sm:mt-6 sm:leading-8 md:text-lg"
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
                whileHover={cardHover}
                transition={{ duration: 0.32, ease: smoothEase }}
                className="group relative min-h-56 overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl transition-colors duration-500 ease-out hover:border-white/20 hover:bg-white/[0.055] hover:shadow-[0_34px_110px_rgba(0,0,0,0.38)] sm:min-h-64 sm:p-6"
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.12),transparent_46%)]" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60" />
                <div className="relative flex h-full flex-col justify-between gap-8 sm:gap-10">
                  <div>
                    <p className="mb-5 text-xs font-medium text-zinc-600 sm:mb-7">
                      0{index + 1}
                    </p>
                    <h3 className="text-xl font-semibold tracking-normal text-white sm:text-2xl">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-sm leading-6 text-zinc-400 transition-colors duration-500 group-hover:text-zinc-300 sm:leading-7">
                    {service.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section id="portfolio" className="relative z-10 mx-auto w-full max-w-6xl py-20 sm:py-24 lg:py-32 2xl:max-w-7xl">
        <ScrollReveal amount={0.25} stagger={0.12}>
          <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-12 md:mb-16 md:flex-row md:items-end md:gap-8">
            <div className="max-w-2xl">
              <motion.p
                variants={fadeUp}
                className="mb-4 text-[11px] font-medium uppercase tracking-[0.32em] text-zinc-500 sm:mb-5 sm:text-xs sm:tracking-[0.34em]"
              >
                Portfolio
              </motion.p>

              <motion.h2
                variants={fadeUp}
                className="text-3xl font-semibold leading-tight tracking-normal text-white sm:text-4xl md:text-5xl"
              >
                Selected systems for creators building durable audience growth.
              </motion.h2>
            </div>

            <motion.p
              variants={fadeUp}
              className="max-w-sm text-sm leading-7 text-zinc-400 md:text-right"
            >
              A restrained look at the editorial, thumbnail, and scaling
              systems behind creator channels built to compound.
            </motion.p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {portfolioProjects.map((project, index) => (
              <motion.article
                key={project.title}
                variants={fadeUp}
                whileHover={cardHover}
                transition={{ duration: 0.32, ease: smoothEase }}
                className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] p-3 shadow-[0_28px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-colors duration-500 ease-out hover:border-white/20 hover:bg-white/[0.055] hover:shadow-[0_38px_130px_rgba(0,0,0,0.44)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-white/10 bg-[#101010] sm:aspect-[16/11]">
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

                <div className="px-2 pb-3 pt-5 sm:px-3 sm:pt-6">
                  <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.24em] text-zinc-500 sm:mb-4 sm:text-xs sm:tracking-[0.26em]">
                    {project.category}
                  </p>
                  <h3 className="text-xl font-semibold tracking-normal text-white sm:text-2xl">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400 transition-colors duration-500 group-hover:text-zinc-300 sm:mt-4 sm:leading-7">
                    {project.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section id="process" className="relative z-10 mx-auto w-full max-w-6xl py-20 sm:py-24 lg:py-32 2xl:max-w-7xl">
        <ScrollReveal amount={0.25} stagger={0.11}>
          <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-14 md:mb-20">
            <motion.p
              variants={fadeUp}
              className="mb-4 text-[11px] font-medium uppercase tracking-[0.32em] text-zinc-500 sm:mb-5 sm:text-xs sm:tracking-[0.34em]"
            >
              Process
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="text-3xl font-semibold leading-tight tracking-normal text-white sm:text-4xl md:text-5xl"
            >
              A clear operating rhythm from first audit to scaled output.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-5 max-w-2xl text-base leading-7 text-zinc-400 sm:mt-6 sm:leading-8"
            >
              The workflow is structured to remove ambiguity, protect creative
              quality, and keep every decision connected to channel growth.
            </motion.p>
          </div>

          <div className="relative">
            <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block" />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step, index) => (
                <motion.article
                  key={step.title}
                  variants={fadeUp}
                  whileHover={cardHover}
                  transition={{ duration: 0.32, ease: smoothEase }}
                  className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl transition-colors duration-500 ease-out hover:border-white/20 hover:bg-white/[0.05] hover:shadow-[0_34px_110px_rgba(0,0,0,0.38)] sm:p-6"
                >
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_20%_0%,rgba(124,58,237,0.1),transparent_42%)]" />
                  <div className="relative z-10 mb-8 flex items-center justify-between sm:mb-10">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#111111]/90 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors duration-500 group-hover:border-[#7C3AED]/40 sm:h-16 sm:w-16">
                      0{index + 1}
                    </div>
                    <div className="h-px flex-1 bg-white/10 lg:hidden" />
                  </div>

                  <h3 className="relative text-xl font-semibold tracking-normal text-white sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="relative mt-4 text-sm leading-6 text-zinc-400 transition-colors duration-500 group-hover:text-zinc-300 sm:mt-5 sm:leading-7">
                    {step.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section id="contact" className="relative z-10 mx-auto w-full max-w-6xl py-20 sm:py-24 lg:py-32 2xl:max-w-7xl">
        <ScrollReveal
          amount={0.25}
          stagger={0.1}
          className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16"
        >
          <div className="max-w-xl lg:pt-4">
            <motion.p
              variants={fadeUp}
              className="mb-4 text-[11px] font-medium uppercase tracking-[0.32em] text-zinc-500 sm:mb-5 sm:text-xs sm:tracking-[0.34em]"
            >
              Contact
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="text-3xl font-semibold leading-tight tracking-normal text-white sm:text-4xl md:text-5xl"
            >
              Tell us what you are building next.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-base leading-7 text-zinc-400 sm:mt-6 sm:leading-8 md:text-lg"
            >
              Share the signal behind your channel, where you want to go, and
              what needs to improve. We will review the fit and respond with a
              clear next step.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 rounded-lg border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-zinc-500 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl"
            >
              Serious creator inquiries only. No spam funnels, no bloated
              discovery process.
            </motion.div>
          </div>

          <motion.form
            variants={fadeUp}
            onSubmit={handleContactSubmit}
            className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] p-4 shadow-[0_34px_120px_rgba(0,0,0,0.38)] backdrop-blur-2xl sm:p-6"
          >
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.12),transparent_46%)]" />
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

            <div className="relative grid gap-4 sm:grid-cols-2">
              <label className="group block">
                <span className="mb-2 block text-xs font-medium uppercase tracking-[0.24em] text-zinc-500">
                  Full name
                </span>
                <input
                  name="fullName"
                  value={contactForm.fullName}
                  onChange={updateContactField("fullName")}
                  autoComplete="name"
                  placeholder="Your name"
                  className="min-h-12 w-full rounded-lg border border-white/10 bg-[#0F0F0F]/80 px-4 text-sm text-white outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-300 placeholder:text-zinc-700 focus:border-[#7C3AED]/45 focus:bg-[#111111] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.12),inset_0_1px_0_rgba(255,255,255,0.08)]"
                />
              </label>

              <label className="group block">
                <span className="mb-2 block text-xs font-medium uppercase tracking-[0.24em] text-zinc-500">
                  Email
                </span>
                <input
                  name="email"
                  type="email"
                  value={contactForm.email}
                  onChange={updateContactField("email")}
                  autoComplete="email"
                  placeholder="you@studio.com"
                  className="min-h-12 w-full rounded-lg border border-white/10 bg-[#0F0F0F]/80 px-4 text-sm text-white outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-300 placeholder:text-zinc-700 focus:border-[#7C3AED]/45 focus:bg-[#111111] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.12),inset_0_1px_0_rgba(255,255,255,0.08)]"
                />
              </label>

              <label className="group block">
                <span className="mb-2 block text-xs font-medium uppercase tracking-[0.24em] text-zinc-500">
                  Creator niche
                </span>
                <input
                  name="niche"
                  value={contactForm.niche}
                  onChange={updateContactField("niche")}
                  placeholder="Tech, finance, fitness..."
                  className="min-h-12 w-full rounded-lg border border-white/10 bg-[#0F0F0F]/80 px-4 text-sm text-white outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-300 placeholder:text-zinc-700 focus:border-[#7C3AED]/45 focus:bg-[#111111] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.12),inset_0_1px_0_rgba(255,255,255,0.08)]"
                />
              </label>

              <label className="group block">
                <span className="mb-2 block text-xs font-medium uppercase tracking-[0.24em] text-zinc-500">
                  Subscriber count
                </span>
                <input
                  name="subscriberCount"
                  value={contactForm.subscriberCount}
                  onChange={updateContactField("subscriberCount")}
                  placeholder="25k, 100k, 1M..."
                  className="min-h-12 w-full rounded-lg border border-white/10 bg-[#0F0F0F]/80 px-4 text-sm text-white outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-300 placeholder:text-zinc-700 focus:border-[#7C3AED]/45 focus:bg-[#111111] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.12),inset_0_1px_0_rgba(255,255,255,0.08)]"
                />
              </label>

              <label className="group block sm:col-span-2">
                <span className="mb-2 block text-xs font-medium uppercase tracking-[0.24em] text-zinc-500">
                  Project goals
                </span>
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={updateContactField("message")}
                  placeholder="What are you trying to improve, launch, or scale?"
                  rows={6}
                  className="w-full resize-none rounded-lg border border-white/10 bg-[#0F0F0F]/80 px-4 py-4 text-sm leading-7 text-white outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-300 placeholder:text-zinc-700 focus:border-[#7C3AED]/45 focus:bg-[#111111] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.12),inset_0_1px_0_rgba(255,255,255,0.08)]"
                />
              </label>
            </div>

            <div className="relative mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-h-6 text-sm">
                {contactStatus === "success" && (
                  <p className="text-[#A78BFA]">
                    Inquiry sent. We will review it and reply shortly.
                  </p>
                )}
                {contactStatus === "error" && (
                  <p className="text-red-300">{contactError}</p>
                )}
              </div>

              <MagneticButton
                type="submit"
                disabled={contactStatus === "submitting"}
                className="min-h-12 w-full rounded-full bg-[#7C3AED] px-8 py-4 text-sm font-semibold text-white shadow-[0_22px_80px_rgba(124,58,237,0.36),inset_0_1px_0_rgba(255,255,255,0.16)] transition-all duration-500 ease-out hover:bg-[#8B5CF6] hover:shadow-[0_30px_110px_rgba(124,58,237,0.46),inset_0_1px_0_rgba(255,255,255,0.2)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {contactStatus === "submitting"
                  ? "Sending inquiry..."
                  : "Send Inquiry"}
              </MagneticButton>
            </div>
          </motion.form>
        </ScrollReveal>
      </section>

      <section className="relative z-10 mx-auto w-full max-w-6xl pb-20 pt-12 sm:pb-24 sm:pt-16 lg:pb-32 lg:pt-24 2xl:max-w-7xl">
        <ScrollReveal
          amount={0.35}
          stagger={0.12}
          className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] px-5 py-14 text-center shadow-[0_40px_140px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:px-6 sm:py-16 md:px-12 md:py-24"
        >
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.18),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.055),transparent_34%)]" />
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

          <div className="relative mx-auto max-w-4xl">
            <motion.p
              variants={fadeUp}
              className="mb-5 text-[11px] font-medium uppercase tracking-[0.32em] text-zinc-500 sm:mb-6 sm:text-xs sm:tracking-[0.34em]"
            >
              Growframe
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="text-4xl font-semibold leading-[1.06] tracking-normal text-white sm:text-5xl md:text-7xl"
            >
              Built for creators serious about growth.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:mt-7 sm:leading-8 md:text-lg"
            >
              We help creators turn attention into consistent momentum through
              refined editing, systems, and scalable content operations.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col items-center justify-center gap-4 sm:mt-10"
            >
              <MagneticButton
                href="#contact"
                className="flex min-h-12 w-full items-center justify-center rounded-full bg-[#7C3AED] px-8 py-4 text-sm font-semibold text-white shadow-[0_22px_80px_rgba(124,58,237,0.38),inset_0_1px_0_rgba(255,255,255,0.16)] transition-shadow duration-500 ease-out hover:bg-[#8B5CF6] hover:shadow-[0_30px_110px_rgba(124,58,237,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] sm:w-auto"
              >
                Book a Free Strategy Call
              </MagneticButton>

              <p className="max-w-sm text-sm leading-6 text-zinc-500">
                For creators ready to build with more clarity, consistency, and
                taste.
              </p>
            </motion.div>
          </div>
        </ScrollReveal>
      </section>

      <footer className="relative z-10 mx-auto w-full max-w-6xl pb-8 sm:pb-10 2xl:max-w-7xl">
        <ScrollReveal amount={0.2} stagger={0.08}>
          <div className="border-t border-white/10 pt-8 sm:pt-10 md:pt-12">
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:gap-12">
              <motion.div variants={fadeUp} className="max-w-sm">
                <p className="text-lg font-semibold text-white">Growframe</p>
                <p className="mt-4 text-sm leading-7 text-zinc-500">
                  Refined editing, creator systems, and scalable content
                  operations for serious growth.
                </p>
              </motion.div>

              <motion.nav
                variants={fadeUp}
                aria-label="Footer navigation"
                className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-zinc-400 sm:flex sm:flex-col sm:gap-1"
              >
                <a href="#services" className="py-1.5 transition-colors duration-500 ease-out hover:text-white">
                  Services
                </a>
                <a href="#portfolio" className="py-1.5 transition-colors duration-500 ease-out hover:text-white">
                  Portfolio
                </a>
                <a href="#process" className="py-1.5 transition-colors duration-500 ease-out hover:text-white">
                  Process
                </a>
                <a href="#contact" className="py-1.5 transition-colors duration-500 ease-out hover:text-white">
                  Contact
                </a>
              </motion.nav>

              <motion.div variants={fadeUp} className="space-y-3 text-sm text-zinc-400">
                <a
                  href="https://instagram.com/growframe"
                  className="block py-1.5 transition-colors duration-500 ease-out hover:text-white"
                >
                  Instagram
                </a>
                <a
                  href="mailto:hello@growframe.co"
                  className="block py-1.5 transition-colors duration-500 ease-out hover:text-white"
                >
                  hello@growframe.co
                </a>
              </motion.div>
            </div>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs leading-6 text-zinc-600 sm:mt-12 sm:flex-row sm:items-center sm:justify-between"
            >
              <p>© 2026 Growframe. All rights reserved.</p>
              <p>Built for creators with taste and momentum.</p>
            </motion.div>
          </div>
        </ScrollReveal>
      </footer>
    </main>
    </MotionConfig>
  );
}
