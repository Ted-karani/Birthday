import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowDown, Heart, Music } from "lucide-react";
import type { CustomSettings } from "@/types";

interface HeroProps {
  settings: CustomSettings;
  musicPlaying: boolean;
  onToggleMusic: () => void;
}

const floatingHearts = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 8,
  duration: 6 + Math.random() * 6,
  size: 12 + Math.random() * 16,
  opacity: 0.15 + Math.random() * 0.2,
}));

export default function Hero({ settings, musicPlaying, onToggleMusic }: HeroProps) {
  const [showContent, setShowContent] = useState(false);
  const daysAlive = useRef(Math.floor((Date.now() - new Date(settings.birthdate).getTime()) / 86400000));

  useEffect(() => {
    setTimeout(() => setShowContent(true), 300);
  }, []);

  const words = `Happy ${settings.age}th Birthday`.split(" ");

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-rose-950/30 via-zinc-950 to-pink-950/20">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <AnimatePresence>
          {floatingHearts.map((h) => (
            <motion.div
              key={h.id}
              className="absolute text-pink-400"
              style={{ left: `${h.x}%`, bottom: "-20px", fontSize: h.size }}
              initial={{ y: 0, opacity: 0 }}
              animate={{
                y: -(typeof window !== "undefined" ? window.innerHeight + 100 : 900),
                opacity: [0, h.opacity, 0],
                x: [0, (Math.random() - 0.5) * 80, 0],
              }}
              transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart fill="currentColor" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "4s" }} />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-medium tracking-widest uppercase text-pink-300/80">
            Chapter {settings.age} Begins
          </span>
          <Sparkles className="w-4 h-4 text-amber-400" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={showContent ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-none tracking-tight mb-4"
        >
          {words.map((word, i) => (
            <span key={i} className="inline-block mr-3">
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={showContent ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.15, duration: 0.7, ease: "easeOut" }}
                className={`bg-clip-text text-transparent bg-gradient-to-r ${
                  word.includes(settings.age.toString())
                    ? "from-amber-300 via-pink-300 to-rose-400"
                    : "from-pink-200 via-rose-200 to-pink-300"
                }`}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-lg sm:text-xl text-pink-200/70 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          A world of love, magic, and endless possibilities begins today for{" "}
          <span className="text-pink-300 font-semibold">{settings.herName}</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-12"
        >
          {[
            { label: "Days Alive", value: daysAlive.current.toLocaleString() },
            { label: "Moments Shared", value: "∞" },
            { label: "Hours of Joy", value: "Countless" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-amber-300 font-serif">{stat.value}</div>
              <div className="text-xs sm:text-sm text-pink-300/50 mt-1 tracking-wide uppercase">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={() => document.getElementById("cake")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-shadow active:scale-[0.98]"
          >
            <span className="flex items-center gap-2">
              Explore Memories
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </span>
          </button>
          <button
            onClick={onToggleMusic}
            className={`p-3 rounded-full border transition-all active:scale-[0.98] ${
              musicPlaying
                ? "border-amber-400/50 bg-amber-400/10 text-amber-300"
                : "border-pink-500/30 text-pink-300 hover:bg-pink-500/10"
            }`}
            aria-label={musicPlaying ? "Pause music" : "Play music"}
          >
            <Music className={`w-5 h-5 ${musicPlaying ? "animate-pulse" : ""}`} />
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={showContent ? { opacity: 1 } : {}}
        transition={{ delay: 2.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-pink-400/30 flex justify-center pt-2"
        >
          <motion.div className="w-1 h-2 bg-pink-400/50 rounded-full" animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
        </motion.div>
      </motion.div>
    </section>
  );
}