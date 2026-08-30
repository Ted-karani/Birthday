import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Star, X } from "lucide-react";
import type { BirthdayReason } from "@/types";
import { defaultReasons } from "@/data/birthdayData";

interface ReasonsProps {
  reasons?: BirthdayReason[];
  onUpdateReasons?: (reasons: BirthdayReason[]) => void;
}

const categories = ["all", "sweet", "funny", "deep", "future"] as const;
const categoryLabels: Record<string, string> = {
  all: "All",
  sweet: "Sweet",
  funny: "Funny",
  deep: "Deep",
  future: "Future Dreams",
};
const categoryColors: Record<string, string> = {
  all: "from-pink-400 to-rose-400",
  sweet: "from-pink-400 to-rose-400",
  funny: "from-amber-400 to-yellow-400",
  deep: "from-violet-400 to-purple-400",
  future: "from-cyan-400 to-blue-400",
};

export default function NineteenReasons({ reasons: propReasons, onUpdateReasons }: ReasonsProps) {
  const [localReasons, setLocalReasons] = useState<BirthdayReason[]>(propReasons || defaultReasons);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [flippedId, setFlippedId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    let result = localReasons;
    if (activeCategory !== "all") {
      result = result.filter((r) => r.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((r) => r.title.toLowerCase().includes(q) || r.content.toLowerCase().includes(q));
    }
    return result;
  }, [localReasons, activeCategory, searchQuery]);

  const favoriteCount = useMemo(() => localReasons.filter((r) => r.favorite).length, [localReasons]);

  const toggleFavorite = useCallback(
    (id: number) => {
      const updated = localReasons.map((r) => (r.id === id ? { ...r, favorite: !r.favorite } : r));
      setLocalReasons(updated);
      onUpdateReasons?.(updated);
    },
    [localReasons, onUpdateReasons],
  );

  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-b from-zinc-950 via-rose-950/5 to-zinc-950">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-amber-300 mb-4">
            19 Reasons Why I Love You
          </motion.h2>
          <p className="text-pink-200/60 max-w-md mx-auto mb-8">
            Tap any card to flip it. Each one holds a piece of my heart.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 mb-8">
            <Star className="w-4 h-4 text-amber-400" fill="currentColor" />
            <span className="text-sm text-pink-200/70">
              {favoriteCount} / {localReasons.length} Favorited
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all active:scale-[0.98] ${
                  activeCategory === cat
                    ? `bg-gradient-to-r ${categoryColors[cat]} text-white shadow-lg`
                    : "bg-pink-500/10 text-pink-300/70 hover:bg-pink-500/20 border border-pink-500/20"
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>

          <div className="relative max-w-sm mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-400/50" />
            <input
              type="text"
              placeholder="Search reasons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-full bg-pink-500/5 border border-pink-500/20 text-pink-200 placeholder-pink-400/30 focus:outline-none focus:border-pink-400/50 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-400/50 hover:text-pink-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((reason, idx) => (
              <motion.div
                key={reason.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="perspective-[1000px] h-56"
                onClick={() => setFlippedId(flippedId === reason.id ? null : reason.id)}
              >
                <motion.div
                  className="relative w-full h-full"
                  animate={{ rotateY: flippedId === reason.id ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-900/40 to-rose-900/40 border border-pink-500/20 backdrop-blur-sm p-6 flex flex-col justify-between cursor-pointer hover:border-pink-400/40 transition-colors"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-5xl font-serif text-pink-400/30 font-bold">{reason.id}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(reason.id);
                        }}
                        className="text-pink-400/40 hover:text-amber-400 transition-colors"
                      >
                        <Star className="w-5 h-5" fill={reason.favorite ? "currentColor" : "none"} />
                      </button>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-pink-200 mb-1">{reason.title}</h3>
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs bg-gradient-to-r ${categoryColors[reason.category]} text-white/90`}>
                        {categoryLabels[reason.category]}
                      </span>
                    </div>
                  </div>

                  <div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-800/60 to-pink-900/60 border border-pink-400/30 p-6 flex flex-col justify-center items-center text-center"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <p className="text-pink-200/80 leading-relaxed text-sm">{reason.content}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-pink-300/40">
            <p className="text-lg">No reasons found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  );
}
