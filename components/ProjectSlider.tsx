'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const MotionImage = motion.create(Image);

interface ProjectSliderProps {
    images: string[];
}

export default function ProjectSlider({ images }: ProjectSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // If no images (shouldn't happen, but fallback)
    if (!images || images.length === 0) {
        return (
            <div className="w-full h-[60vh] md:h-[80vh] max-h-screen rounded-2xl overflow-hidden shadow-neon-strong ring-1 ring-primary/20 bg-surface-dark flex items-center justify-center">
                <span className="text-slate-500 font-mono">NO_IMAGE_DATA</span>
            </div>
        );
    }

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1 === images.length ? 0 : prev + 1));
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 < 0 ? images.length - 1 : prev - 1));
    };

    return (
        <div className="relative group w-full h-[60vh] md:h-[80vh] max-h-screen rounded-2xl overflow-hidden shadow-neon-strong ring-1 ring-primary/20 bg-background-dark">
            <AnimatePresence mode="wait">
                <MotionImage
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt={`Project Gallery ${currentIndex + 1}`}
                    priority={currentIndex === 0} // Prioritize first image load
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1400px"
                    unoptimized={true} // Bypass Next.js built-in optimizer which is too slow for 2.5MB AVIFs without sharp installed
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="object-cover"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe = offset.x;

                        if (swipe < -50) {
                            handleNext();
                        } else if (swipe > 50) {
                            handlePrev();
                        }
                    }}
                />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent pointer-events-none"></div>

            {/* Navigation Buttons (only show if more than 1 image) */}
            {images.length > 1 && (
                <>
                    <button 
                        onClick={handlePrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 size-12 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm border border-white/10 hover:bg-primary/20 hover:text-primary transition-all opacity-0 group-hover:opacity-100"
                    >
                        <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <button 
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 size-12 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm border border-white/10 hover:bg-primary/20 hover:text-primary transition-all opacity-0 group-hover:opacity-100"
                    >
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>

                    {/* Indicators */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    idx === currentIndex ? 'w-8 bg-primary shadow-[0_0_10px_rgba(56,189,248,0.8)]' : 'w-2 bg-white/30 hover:bg-white/60'
                                }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
            
            {/* Visual Label */}
            <div className="absolute top-6 right-6 px-3 py-1 bg-black/50 backdrop-blur-md rounded border border-white/10 text-[10px] font-mono text-white/70 uppercase tracking-widest">
                {currentIndex + 1} / {images.length} — Visual Data
            </div>
        </div>
    );
}
