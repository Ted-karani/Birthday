import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, TicketCheck, Stamp, Plus } from "lucide-react";
import type { PolaroidMemory, LoveCoupon } from "@/types";
import { defaultPolaroids, defaultCoupons } from "@/data/birthdayData";

interface MemoriesAndCouponsProps {
  polaroids?: PolaroidMemory[];
  coupons?: LoveCoupon[];
  onUpdatePolaroids?: (p: PolaroidMemory[]) => void;
  onUpdateCoupons?: (c: LoveCoupon[]) => void;
}

export default function MemoriesAndCoupons({
  polaroids: propPolaroids,
  coupons: propCoupons,
  onUpdatePolaroids,
  onUpdateCoupons,
}: MemoriesAndCouponsProps) {
  const [localPolaroids, setLocalPolaroids] = useState<PolaroidMemory[]>(propPolaroids || defaultPolaroids);
  const [localCoupons, setLocalCoupons] = useState<LoveCoupon[]>(propCoupons || defaultCoupons);
  const [editingCaption, setEditingCaption] = useState<number | null>(null);
  const [captionText, setCaptionText] = useState("");

  const handleImageUpload = useCallback(
    (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const updated = localPolaroids.map((p) => (p.id === id ? { ...p, imageUrl: reader.result as string } : p));
        setLocalPolaroids(updated);
        onUpdatePolaroids?.(updated);
      };
      reader.readAsDataURL(file);
    },
    [localPolaroids, onUpdatePolaroids],
  );

  const toggleRedeemed = useCallback(
    (id: number) => {
      const coupon = localCoupons.find((c) => c.id === id);
      if (!coupon || coupon.redeemed) return;
      const updated = localCoupons.map((c) => (c.id === id ? { ...c, redeemed: true } : c));
      setLocalCoupons(updated);
      onUpdateCoupons?.(updated);
    },
    [localCoupons, onUpdateCoupons],
  );

  const redeemCount = localCoupons.filter((c) => c.redeemed).length;

  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-b from-zinc-950 via-pink-950/10 to-zinc-950">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="font-serif text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-rose-300 mb-4">
            Our Memory Wall
          </h2>
          <p className="text-pink-200/60 max-w-md mb-12">
            Snapshots of our favorite moments. Click a photo to upload your own.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {localPolaroids.map((mem, idx) => {
                const tilt = Math.sin(idx * 1.3) * 3;
                return (
                  <motion.div
                    key={mem.id}
                    layout
                    initial={{ opacity: 0, rotate: tilt - 5, y: 40 }}
                    animate={{ opacity: 1, rotate: tilt, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
                    className="group relative cursor-pointer"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-yellow-100/30 rotate-[-2deg] rounded-sm z-10 backdrop-blur-sm" />

                    <motion.div
                      className="bg-white p-3 pb-12 rounded-sm shadow-xl group-hover:shadow-2xl group-hover:shadow-pink-500/10 transition-shadow"
                      whileHover={{ rotate: tilt + 2, scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="aspect-square bg-gradient-to-br from-pink-100 to-rose-100 overflow-hidden relative">
                        {mem.imageUrl ? (
                          <img src={mem.imageUrl} alt={mem.caption} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-pink-300/50">
                            <Camera className="w-10 h-10" />
                          </div>
                        )}
                        <label className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer">
                          <Plus className="w-8 h-8 text-white drop-shadow-lg" />
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(mem.id, e)} />
                        </label>
                      </div>

                      <div className="mt-3 text-center">
                        {editingCaption === mem.id ? (
                          <div className="flex gap-2 justify-center">
                            <input
                              value={captionText}
                              onChange={(e) => setCaptionText(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  const updated = localPolaroids.map((p) =>
                                    p.id === mem.id ? { ...p, caption: captionText } : p,
                                  );
                                  setLocalPolaroids(updated);
                                  onUpdatePolaroids?.(updated);
                                  setEditingCaption(null);
                                }
                              }}
                              onBlur={() => {
                                const updated = localPolaroids.map((p) =>
                                  p.id === mem.id ? { ...p, caption: captionText } : p,
                                );
                                setLocalPolaroids(updated);
                                onUpdatePolaroids?.(updated);
                                setEditingCaption(null);
                              }}
                              className="text-sm text-zinc-700 bg-transparent border-b border-pink-300 focus:outline-none text-center w-full"
                              autoFocus
                            />
                          </div>
                        ) : (
                          <p
                            onClick={() => {
                              setEditingCaption(mem.id);
                              setCaptionText(mem.caption);
                            }}
                            className="text-sm text-zinc-600 font-medium italic hover:text-pink-500 transition-colors cursor-pointer"
                          >
                            {mem.caption}
                          </p>
                        )}
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] bg-pink-100 text-pink-500 uppercase tracking-wider">
                          {mem.tag}
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-serif text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-pink-300 mb-2">
                Love Coupons
              </h2>
              <p className="text-pink-200/60">
                {redeemCount} / {localCoupons.length} Redeemed
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/10 border border-amber-400/20">
              <TicketCheck className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-amber-300/70">{localCoupons.length - redeemCount} Left</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {localCoupons.map((coupon, idx) => (
                <motion.div
                  key={coupon.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  className={`relative rounded-2xl overflow-hidden border transition-all ${
                    coupon.redeemed
                      ? "bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30"
                      : "bg-gradient-to-br from-pink-900/30 to-rose-900/30 border-pink-500/20 hover:border-pink-400/40"
                  }`}
                >
                  {coupon.redeemed && (
                    <div className="absolute top-4 right-4 z-10">
                      <motion.div
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                        className="px-3 py-1 rounded-full bg-green-500/20 border border-green-400/40 text-green-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1"
                      >
                        <Stamp className="w-3 h-3" />
                        Redeemed
                      </motion.div>
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        coupon.redeemed ? "bg-green-500/20" : "bg-amber-400/20"
                      }`}>
                        <TicketCheck className={`w-5 h-5 ${coupon.redeemed ? "text-green-400" : "text-amber-400"}`} />
                      </div>
                      <h3 className="text-lg font-semibold text-pink-200">{coupon.title}</h3>
                    </div>
                    <p className="text-pink-200/60 text-sm leading-relaxed mb-4">{coupon.description}</p>

                    {!coupon.redeemed && (
                      <button
                        onClick={() => toggleRedeemed(coupon.id)}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-pink-500 text-white font-medium text-sm shadow-lg shadow-pink-500/20 hover:shadow-pink-500/30 transition-shadow active:scale-[0.98]"
                      >
                        Redeem This Coupon
                      </button>
                    )}
                  </div>

                  <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-pink-500/10 to-transparent rounded-tl-full" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
