"use client";

import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  loading: boolean;
}

export default function LoadingScreen({
  loading,
}: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#f7f4ef]"
        >
          <div className="text-center">

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .8 }}
              className="font-display text-7xl text-black"
            >
              Voyae
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: .65 }}
              transition={{ delay: .4 }}
              className="mt-4 uppercase tracking-[0.35em] text-sm"
            >
              Loading your journey...
            </motion.p>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 180 }}
              transition={{
                duration: 1.8,
                ease: "easeInOut",
              }}
              className="mx-auto mt-8 h-[2px] rounded-full bg-[var(--primary)]"
            />

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}