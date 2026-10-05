import React from 'react';
import { motion as m } from 'framer-motion';

const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const child = { hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } };

export default function ProductDetailSkeleton() {
    const prefersReduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    return (
        <m.div initial={prefersReduce ? 'visible' : 'hidden'} animate="visible" variants={container} aria-hidden="true">
            <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                    <m.div variants={child} className="aspect-[4/5] w-full bg-[#F7F4EF] rounded-[12px]"><div className="h-full w-full bg-stone-200/60 animate-pulse" /></m.div>
                    <m.div variants={child} className="flex gap-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-16 w-16 bg-[#F7F4EF] rounded-[8px]"><div className="h-full w-full bg-stone-200/60 animate-pulse" /></div>
                        ))}
                    </m.div>
                </div>

                <div className="space-y-4">
                    <m.div variants={child} className="h-6 w-3/4 bg-stone-200/60 rounded-md animate-pulse" />
                    <m.div variants={child} className="h-6 w-1/2 bg-stone-200/60 rounded-md animate-pulse" />
                    <m.div variants={child} className="flex items-center gap-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="h-8 w-8 rounded-full bg-stone-200/60 animate-pulse" />
                        ))}
                    </m.div>

                    <m.div variants={child} className="grid grid-cols-3 gap-2">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="h-10 w-full rounded-md bg-stone-200/60 animate-pulse" />
                        ))}
                    </m.div>

                    <m.div variants={child} className="h-12 w-full rounded-full bg-stone-200/60 animate-pulse" />
                </div>
            </div>
        </m.div>
    );
}
