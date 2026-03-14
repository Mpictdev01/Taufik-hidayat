'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        question: "How fast can you deliver the project?",
        answer: "I deliver Web3 landing pages in 24-48 hours and complete SaaS MVPs in under 3 days."
    },
    {
        question: "Do you provide post-launch support?",
        answer: "Yes, I provide complimentary post-launch support to guarantee your project runs flawlessly in production."
    },
    {
        question: "How do revisions work?",
        answer: "I offer a maximum of 5 minor revisions before final deployment to perfectly align the project with your vision."
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="w-full max-w-[1200px] mx-auto py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                {/* Left Column: Heading */}
                <div className="lg:sticky lg:top-32">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                        <span className="material-symbols-outlined text-blue-400 text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>help</span>
                        <span className="text-[11px] font-bold uppercase tracking-widest text-blue-400">FAQ</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                        Frequently Asked<br />Questions
                    </h2>
                    <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-md">
                        Got questions? Here are the answers to the most common ones about my workflow, timeline, and delivery process.
                    </p>
                </div>

                {/* Right Column: Accordion */}
                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <div
                            key={index}
                            className={`bg-glass-bg border rounded-2xl overflow-hidden transition-all duration-300 ${
                                openIndex === index 
                                    ? 'border-blue-500/30 shadow-[0_0_25px_rgba(59,130,246,0.08)]' 
                                    : 'border-glass-border hover:border-white/15'
                            }`}
                        >
                            <button
                                onClick={() => toggle(index)}
                                className="w-full flex items-center justify-between px-6 py-5 text-left group"
                            >
                                <span className={`text-base md:text-lg font-bold tracking-tight transition-colors ${
                                    openIndex === index ? 'text-white' : 'text-slate-300 group-hover:text-white'
                                }`}>
                                    {item.question}
                                </span>
                                <motion.span
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className={`material-symbols-outlined text-[22px] shrink-0 ml-4 transition-colors ${
                                        openIndex === index ? 'text-blue-400' : 'text-slate-500'
                                    }`}
                                >
                                    expand_more
                                </motion.span>
                            </button>

                            <AnimatePresence initial={false}>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-5 pt-0">
                                            <div className="border-t border-white/10 pt-4">
                                                <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                                                    {item.answer}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
