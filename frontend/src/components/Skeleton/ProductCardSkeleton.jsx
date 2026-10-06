import React from 'react';
import { motion as Motion } from 'framer-motion';

const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 },
};

export default function ProductCardSkeleton() {
    // Wrap in same container class used by real items (`block w-fit`) to match layout
    const prefersReduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    return (
        <Motion.div
            className="block w-fit"
            initial={prefersReduce ? 'visible' : 'hidden'}
            animate="visible"
            variants={itemVariants}
            transition={{ duration: prefersReduce ? 0 : 0.35 }}
            aria-hidden="true"
        >
            <article className="group relative flex w-full max-w-[260px] shrink-0 flex-col overflow-hidden rounded-[28px] border border-[#E7E1D6] bg-white shadow-[0_12px_24px_rgba(34,29,23,0.06)] transition duration-200">
                <div className="relative overflow-hidden bg-[#f7f4ef]">
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#F7F4EF] rounded-[24px]">
                        <div className="h-full w-full bg-stone-200/60 animate-pulse" />
                    </div>
                </div>

                <div className="flex flex-1 flex-col gap-2 px-4 pb-6 pt-3">
                    <div className="h-3 w-[40px] rounded-md bg-stone-200/60 animate-pulse" />
                    <div className="h-5 w-4/5 rounded-md bg-stone-200/60 animate-pulse" />
                    <div className="h-4 w-1/2 rounded-md bg-stone-200/60 animate-pulse mt-auto" />
                </div>
            </article>
        </Motion.div>
    );
}
