import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, WandSparkles, Sparkles } from "lucide-react";

interface CakeProps {
  onAllBlown: () => void;
}

const Candle = ({ lit, index, onBlow }: { lit: boolean; index: number; onBlow: () => void }) => {
  const flickerX = Math.sin(index * 1.7) * 2;
  return (
    <motion.button
      className="absolute bottom-full pb-1 cursor-pointer focus:outline-none group/candle"
      style={{ left: `${10 + index * 5.2}%` }}
      onClick={onBlow}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* candle stick */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-3 w-[3px] h-4 rounded-full"
        style={{
          background: `linear-gradient(180deg, ${
            ["#fbcfe8", "#fde68a", "#c4b5fd", "#a5f3fc"][index % 4]
          }, transparent)`,
        }}
      />
      {lit ? (
        <motion.div
          className="relative"
          animate={{ x: [flickerX - 1, flickerX + 1, flickerX - 1] }}
          transition={{ duration: 0.3, repeat: Infinity }}
        >
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-amber-300/30 rounded-full blur-md group-hover/candle:bg-amber-200/50 transition-colors" />
          <Flame className="w-4 h-5 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.9)] relative z-10" fill="currentColor" />
          <motion.div
            className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-300/50 rounded-full blur-sm"
            animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <div className="w-3 h-3 bg-gradient-to-b from-zinc-500 to-zinc-700 rounded-full shadow-inner" />
          <motion.div
            initial={{ opacity: 0.6, y: 0 }}
            animate={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.8 }}
            className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-2 bg-zinc-400/40 rounded-full blur-[1px]"
          />
        </motion.div>
      )}
    </motion.button>
  );
};

const Sparkle = ({ delay, x, y }: { delay: number; x: number; y: number }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: `${x}%`, top: `${y}%` }}
    animate={{ opacity: [0, 1, 0], scale: [0.4, 1, 0.4], rotate: [0, 90] }}
    transition={{ duration: 2.5 + Math.random() * 2, delay, repeat: Infinity, repeatDelay: Math.random() * 3 }}
  >
    <Sparkles className="w-3 h-3 text-amber-300/70" fill="currentColor" />
  </motion.div>
);

export default function InteractiveCake({ onAllBlown }: CakeProps) {
  const NUM_CANDLES = 19;
  const [litCandles, setLitCandles] = useState<Set<number>>(new Set(Array.from({ length: NUM_CANDLES }, (_, i) => i)));
  const [celebrating, setCelebrating] = useState(false);

  const sparkles = useMemo(
    () => Array.from({ length: 18 }, (_, i) => ({ id: i, delay: Math.random() * 4, x: Math.random() * 100, y: Math.random() * 100 })),
    [],
  );

  const blowOne = useCallback((idx: number) => {
    setLitCandles((prev) => {
      const next = new Set(prev);
      next.delete(idx);
      if (next.size === 0) {
        setTimeout(() => setCelebrating(true), 400);
        setTimeout(() => onAllBlown(), 800);
      }
      return next;
    });
  }, [onAllBlown]);

  const blowAll = useCallback(() => {
    setLitCandles(new Set());
    setTimeout(() => setCelebrating(true), 400);
    setTimeout(() => onAllBlown(), 800);
  }, [onAllBlown]);

  const litCount = litCandles.size;

  return (
    <section
      id="cake"
      className="relative py-28 sm:py-40 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(244,114,182,0.08), transparent), radial-gradient(ellipse 60% 50% at 20% 80%, rgba(251,191,36,0.06), transparent), linear-gradient(180deg, #09090b, #150a12 40%, #09090b)",
      }}
    >
      {/* Ambient sparkle field */}
      <div className="absolute inset-0 pointer-events-none">
        {sparkles.map((s) => (
          <Sparkle key={s.id} delay={s.delay} x={s.x} y={s.y} />
        ))}
      </div>

      {/* Spotlight */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(251,191,36,0.1), rgba(244,114,182,0.05), transparent)" }}
      />

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/20 bg-amber-400/5 mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span className="text-[11px] tracking-[0.2em] uppercase text-amber-200/80 font-medium">A Moment Just For You</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-300 to-rose-300 mb-4 drop-shadow-[0_0_40px_rgba(244,114,182,0.15)]"
        >
          Make a Wish
        </motion.h2>
        <p className="text-pink-200/50 mb-20 max-w-md mx-auto text-sm sm:text-base tracking-wide">
          Click each candle, or blow them all at once — {litCount} of {NUM_CANDLES} still flickering
        </p>

        {/* Cake Container */}
        <div className="relative flex justify-center">
          {/* Candles */}
          <div className="relative w-full max-w-lg h-16 mb-0">
            {Array.from({ length: NUM_CANDLES }, (_, i) => (
              <Candle key={i} lit={litCandles.has(i)} index={i} onBlow={() => blowOne(i)} />
            ))}
          </div>

          {/* Cake Body */}
          <div className="relative drop-shadow-[0_25px_50px_rgba(244,114,182,0.15)]">
            {/* glow behind cake */}
            <div className="absolute inset-0 bg-gradient-to-b from-pink-400/20 to-transparent blur-2xl scale-110 -z-10" />

            {/* Top Tier */}
            <motion.div
              className="w-48 sm:w-56 h-16 sm:h-20 rounded-t-2xl shadow-xl relative overflow-hidden"
              style={{ background: "linear-gradient(180deg, #fbcfe8, #f9a8d4 60%, #f472b6)" }}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/10" />
              <div className="absolute inset-x-2 top-3 h-2 bg-white/40 rounded-full" />
              <div className="absolute inset-x-4 top-7 h-1.5 bg-white/25 rounded-full" />
              <div className="absolute -bottom-1 left-4 w-3 h-4 bg-white/50 rounded-b-full" />
              <div className="absolute -bottom-1 left-12 w-2.5 h-5 bg-white/40 rounded-b-full" />
              <div className="absolute -bottom-1 left-20 w-3 h-3 bg-white/50 rounded-b-full" />
              <div className="absolute -bottom-1 right-8 w-2.5 h-4 bg-white/40 rounded-b-full" />
              <div className="absolute -bottom-1 right-3 w-3 h-3 bg-white/50 rounded-b-full" />
            </motion.div>

            {/* Middle Tier */}
            <motion.div
              className="w-60 sm:w-72 h-16 sm:h-20 relative overflow-hidden"
              style={{ background: "linear-gradient(180deg, #fda4af, #fb7185 60%, #e11d48)" }}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/5" />
              <div className="absolute inset-x-2 top-3 h-2 bg-white/30 rounded-full" />
              <div className="absolute inset-x-4 top-7 h-1.5 bg-white/20 rounded-full" />
              <div className="absolute -bottom-1 left-6 w-3 h-5 bg-white/30 rounded-b-full" />
              <div className="absolute -bottom-1 left-16 w-2.5 h-4 bg-white/30 rounded-b-full" />
              <div className="absolute -bottom-1 left-28 w-3 h-6 bg-white/30 rounded-b-full" />
              <div className="absolute -bottom-1 right-10 w-2.5 h-4 bg-white/30 rounded-b-full" />
              <div className="absolute -bottom-1 right-4 w-3 h-5 bg-white/30 rounded-b-full" />
              {/* gold trim */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-300/70 to-transparent" />
            </motion.div>

            {/* Bottom Tier */}
            <motion.div
              className="w-72 sm:w-84 h-18 sm:h-22 rounded-b-3xl relative overflow-hidden"
              style={{ background: "linear-gradient(180deg, #f472b6, #be123c 70%, #881337)" }}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/15 via-transparent to-white/5" />
              <div className="absolute inset-x-3 top-3 h-2 bg-white/20 rounded-full" />
              <div className="absolute inset-x-5 top-7 h-1.5 bg-white/15 rounded-full" />
              <div className="absolute inset-x-3 top-10 h-1.5 bg-white/15 rounded-full" />
              {/* Gold band */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
            </motion.div>

            {/* Plate with glow ring */}
            <motion.div
              className="relative mx-auto"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div
                className="absolute -inset-4 top-0 blur-xl"
                style={{ background: "radial-gradient(circle, rgba(251,191,36,0.2), rgba(244,114,182,0.1), transparent)" }}
              />
              <div className="w-80 sm:w-96 h-4 rounded-full mx-auto shadow-2xl relative" style={{ background: "linear-gradient(180deg, #fde68a, #d4af37 40%, #92702a)" }}>
                <div className="absolute inset-x-4 top-0.5 h-1 bg-white/40 rounded-full" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Blow All Button */}
        {!celebrating && litCandles.size > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12"
          >
            <button
              onClick={blowAll}
              className="group relative px-7 py-3 rounded-full font-medium text-sm tracking-wide overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(251,191,36,0.12), rgba(244,114,182,0.12))",
                border: "1px solid rgba(251,191,36,0.3)",
              }}
            >
              <span className="relative z-10 flex items-center gap-2 text-amber-200">
                <WandSparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                Blow All Candles
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-300/20 to-amber-400/0"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </button>
          </motion.div>
        )}

        {/* Celebration Overlay */}
        <AnimatePresence>
          {celebrating && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
            >
              <motion.div
                className="relative text-center p-8 sm:p-12 rounded-3xl overflow-hidden max-w-md mx-4 shadow-2xl"
                style={{
                  background: "linear-gradient(160deg, rgba(136,19,55,0.9), rgba(76,5,25,0.95))",
                  border: "1px solid rgba(244,114,182,0.35)",
                  boxShadow: "0 0 80px rgba(244,114,182,0.25)",
                }}
                initial={{ y: 40 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", bounce: 0.4 }}
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-400/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl" />
                <motion.div
                  className="text-6xl mb-4 relative"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: 2 }}
                >
                  🎂
                </motion.div>
                <h3 className="font-serif text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-pink-300 mb-3 relative">
                  Happy Birthday!
                </h3>
                <p className="text-pink-200/70 mb-6 relative">Your wish has been sent to the stars ✨</p>
                <button
                  onClick={() => setCelebrating(false)}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-shadow active:scale-[0.98] relative"
                >
                  Continue Exploring
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
