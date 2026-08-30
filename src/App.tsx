import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Music } from "lucide-react";
import { playBirthdayMelody, playFanfare, startMusicBox, stopMusicBox } from "@/utils/audio";
import Hero from "@/components/Hero";
import InteractiveCake from "@/components/InteractiveCake";
import NineteenReasons from "@/components/NineteenReasons";
import MemoriesAndCoupons from "@/components/MemoriesAndCoupons";
import LetterAndCustomizeModal from "@/components/LetterAndCustomizeModal";
import type { BirthdayReason, LoveCoupon, PolaroidMemory, CustomSettings } from "@/types";
import { defaultSettings, defaultReasons, defaultCoupons, defaultPolaroids } from "@/data/birthdayData";

const STORAGE_KEYS = {
  settings: "birthday-settings",
  reasons: "birthday-reasons",
  coupons: "birthday-coupons",
  polaroids: "birthday-polaroids",
};

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or unavailable
  }
}

export default function App() {
  const [settings, setSettings] = useState<CustomSettings>(() => loadFromStorage(STORAGE_KEYS.settings, defaultSettings));
  const [reasons, setReasons] = useState<BirthdayReason[]>(() => loadFromStorage(STORAGE_KEYS.reasons, defaultReasons));
  const [coupons, setCoupons] = useState<LoveCoupon[]>(() => loadFromStorage(STORAGE_KEYS.coupons, defaultCoupons));
  const [polaroids, setPolaroids] = useState<PolaroidMemory[]>(() => loadFromStorage(STORAGE_KEYS.polaroids, defaultPolaroids));
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const [confettiParticles, setConfettiParticles] = useState<Array<{ id: number; x: number; y: number; color: string; rotation: number }>>([]);

  useEffect(() => { saveToStorage(STORAGE_KEYS.settings, settings); }, [settings]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.reasons, reasons); }, [reasons]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.coupons, coupons); }, [coupons]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.polaroids, polaroids); }, [polaroids]);

  const toggleMusic = useCallback(() => {
    setMusicPlaying((prev) => {
      if (prev) {
        stopMusicBox();
        return false;
      } else {
        startMusicBox();
        return true;
      }
    });
  }, []);

  const handleAllCandlesBlown = useCallback(() => {
    playBirthdayMelody();
    setTimeout(() => playFanfare(), 500);
    const colors = ["#f472b6", "#fb7185", "#fbbf24", "#a78bfa", "#34d399", "#f87171"];
    const particles = Array.from({ length: 60 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
    }));
    setConfettiParticles(particles);
    setTimeout(() => setConfettiParticles([]), 4000);
  }, []);

  const spawnHeart = useCallback((e: React.MouseEvent) => {
    const heart = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      size: 16 + Math.random() * 20,
    };
    setFloatingHearts((prev) => [...prev, heart]);
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== heart.id));
    }, 2000);
  }, []);

  return (
    <div
      className="min-h-screen bg-zinc-950 text-pink-100 selection:bg-pink-500/30"
      onClick={spawnHeart}
    >
      <AnimatePresence>
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="fixed pointer-events-none z-[100] text-pink-400"
            style={{ left: heart.x, top: heart.y, fontSize: heart.size }}
            initial={{ opacity: 1, y: 0, scale: 0.5 }}
            animate={{ opacity: 0, y: -120, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <Heart fill="currentColor" />
          </motion.div>
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {confettiParticles.length > 0 && (
          <div className="fixed inset-0 pointer-events-none z-[90]">
            {confettiParticles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute w-2 h-2 rounded-sm"
                style={{ left: `${p.x}%`, top: "-5%", backgroundColor: p.color }}
                initial={{ y: 0, rotate: p.rotation, opacity: 1 }}
                animate={{ y: "110vh", rotate: p.rotation + 720, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3 + Math.random() * 2, delay: Math.random() * 0.5, ease: "easeIn" }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={(e) => {
          e.stopPropagation();
          toggleMusic();
        }}
        className={`fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg transition-all active:scale-[0.98] ${
          musicPlaying
            ? "bg-pink-500 text-white shadow-pink-500/30"
            : "bg-zinc-800/80 text-pink-300 border border-pink-500/20 hover:bg-zinc-700/80"
        }`}
        aria-label={musicPlaying ? "Pause music" : "Play music"}
      >
        <Music className={`w-5 h-5 ${musicPlaying ? "animate-pulse" : ""}`} />
      </motion.button>

      <Hero
        settings={settings}
        musicPlaying={musicPlaying}
        onToggleMusic={toggleMusic}
      />

      <InteractiveCake onAllBlown={handleAllCandlesBlown} />

      <NineteenReasons reasons={reasons} onUpdateReasons={setReasons} />

      <MemoriesAndCoupons
        polaroids={polaroids}
        coupons={coupons}
        onUpdatePolaroids={setPolaroids}
        onUpdateCoupons={setCoupons}
      />

      <LetterAndCustomizeModal settings={settings} />

      <footer className="py-12 text-center text-pink-300/30 text-sm">
        <p>Made with{" "}
          <Heart className="w-3 h-3 inline text-pink-400 mx-1" fill="currentColor" />
          for {settings.herName}
        </p>
        <p className="mt-1">Happy {settings.age}th Birthday ✨</p>
      </footer>
    </div>
  );
}