'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Kombinasi cerdas: Cek apakah dokumen sudah siap, ATAU gunakan fallback maskimal 2.5 detik
    // agar layar tidak pernah "stuck" selamanya hanya karena 1 gambar lambat dimuat.
    const hidePreloader = () => {
      setIsLoading(false);
    };

    if (document.readyState === 'complete') {
      setTimeout(hidePreloader, 800); // Sedikit delay estetik jika cache sudah ada
    } else {
      window.addEventListener('load', hidePreloader);
    }

    // Safety Fallback: Apapun yang terjadi, paksa hapus preloader setelah 3 detik
    // sehingga pengunjung bisa melihat website (Lazy Load / Image component akan mengurus sisanya)
    const fallbackTimer = setTimeout(hidePreloader, 3000);

    return () => {
      window.removeEventListener('load', hidePreloader);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background-dark/80 backdrop-blur-xl"
        >
          {/* Newton's Cradle Animation from globals.css */}
          <div className="newtons-cradle">
            <div className="newtons-cradle__dot"></div>
            <div className="newtons-cradle__dot"></div>
            <div className="newtons-cradle__dot"></div>
            <div className="newtons-cradle__dot"></div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 font-mono text-xs tracking-[0.3em] text-primary/70 uppercase cursor-blink"
          >
            loading
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
