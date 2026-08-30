import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, X, Download } from "lucide-react";
import type { CustomSettings } from "@/types";
import { defaultLetter } from "@/data/birthdayData";

interface LetterProps {
  settings: CustomSettings;
}

export default function LetterAndCustomizeModal({ settings }: LetterProps) {
  const [letterOpen, setLetterOpen] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (!letterRef.current) return;
    const content = letterRef.current.innerText;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `love-letter-for-${settings.herName.replace(/\s+/g, "-").toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <section className="relative py-24 sm:py-32 bg-gradient-to-b from-zinc-950 via-rose-950/10 to-zinc-950">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div
              className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-pink-500/20 to-rose-500/20 border border-pink-500/30 cursor-pointer hover:border-pink-400/50 transition-colors"
              whileHover={{ scale: 1.05, rotate: [0, -3, 3, 0] }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLetterOpen(true)}
            >
              <Mail className="w-10 h-10 text-pink-300" />
            </motion.div>

            <div>
              <h2 className="font-serif text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-amber-300 mb-4">
                A Letter For You
              </h2>
              <p className="text-pink-200/60 max-w-md mx-auto mb-8">
                Something sealed with love, just for you. Tap the envelope to open it.
              </p>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setLetterOpen(true)}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-shadow active:scale-[0.98]"
                >
                  Open Letter
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Wax Seal Letter Modal */}
      <AnimatePresence>
        {letterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
            onClick={() => setLetterOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl bg-gradient-to-b from-rose-950/90 to-pink-950/90 border border-pink-500/30 shadow-2xl shadow-pink-500/10"
            >
              <button
                onClick={() => setLetterOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-pink-500/10 hover:bg-pink-500/20 transition-colors"
              >
                <X className="w-5 h-5 text-pink-300" />
              </button>

              <button
                onClick={handleDownload}
                className="absolute top-4 left-4 z-10 p-2 rounded-full bg-pink-500/10 hover:bg-pink-500/20 transition-colors"
              >
                <Download className="w-5 h-5 text-pink-300" />
              </button>

              <div ref={letterRef} className="p-8 sm:p-10 space-y-6">
                <p className="text-xl text-pink-200 font-serif italic">{defaultLetter.salutation}</p>
                <div className="text-pink-200/80 leading-relaxed whitespace-pre-wrap">{defaultLetter.body}</div>
                <div className="pt-4 space-y-2">
                  <p className="text-pink-200 font-serif italic">{defaultLetter.closing}</p>
                  <p className="text-pink-300 font-serif text-lg">{defaultLetter.signature}</p>
                </div>

                <div className="flex items-center justify-center gap-3 pt-6">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-pink-500/30" />
                  <HeartIcon className="w-4 h-4 text-pink-400/50" />
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-pink-500/30" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}