"use client";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 22, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

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
            <a href="#" className="transition-colors duration-300 hover:text-white">
              Services
            </a>
            <a href="#" className="transition-colors duration-300 hover:text-white">
              Portfolio
            </a>
            <a href="#" className="transition-colors duration-300 hover:text-white">
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
    </main>
  );
}
