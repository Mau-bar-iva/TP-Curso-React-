import { useEffect, useRef, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import ChevronRightIcon from '../../assets/chevronRight.svg';
import ChevronLeftIcon from '../../assets/chevronLeft.svg';

export default function CarouselItems({ children }) {
    const carouselRef = useRef(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    const updateArrows = () => {
        const el = carouselRef.current;
        if (!el) return;

        const desktop = window.innerWidth >= 768;
        setIsDesktop(desktop);

        if (!desktop) {
            setShowLeft(false);
            setShowRight(false);
            return;
        }

        setShowLeft(el.scrollLeft > 0);
        setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 12);
    };

    const scroll = (direction) => {
        const el = carouselRef.current;
        if (!el) return;

        const scrollAmount = 360;
        el.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
    };

    useEffect(() => {
        const el = carouselRef.current;
        if (!el) return;

        updateArrows();

        const onResize = () => updateArrows();
        window.addEventListener('resize', onResize);

        const resizeObserver = new ResizeObserver(() => updateArrows());
        resizeObserver.observe(el);

        const images = el.querySelectorAll('img');
        images.forEach((img) => {
            if (!img.complete) img.addEventListener('load', updateArrows);
        });

        el.addEventListener('scroll', updateArrows);

        return () => {
            window.removeEventListener('resize', onResize);
            resizeObserver.disconnect();
            el.removeEventListener('scroll', updateArrows);
            images.forEach((img) => img.removeEventListener('load', updateArrows));
        };
    }, [children]);

    return (
        <div className="relative w-full">
            {isDesktop && showLeft && (
                <Motion.button
                    type="button"
                    aria-label="Scroll left"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                    className="absolute -left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-stone-200 bg-white/90 text-stone-900 shadow-[0_10px_30px_rgba(0,0,0,0.08)] md:h-14 md:w-14"
                    onClick={() => scroll('left')}
                >
                    <img src={ChevronLeftIcon} alt="" className="h-5 w-5 md:h-6 md:w-6" />
                </Motion.button>
            )}

            <div className="flex gap-4 overflow-x-auto scroll-smooth px-2 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:px-10 [&::-webkit-scrollbar]:hidden" ref={carouselRef}>
                {children}
            </div>

            {isDesktop && showRight && (
                <Motion.button
                    type="button"
                    aria-label="Scroll right"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                    className="absolute -right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-stone-200 bg-white/90 text-stone-900 shadow-[0_10px_30px_rgba(0,0,0,0.08)] md:h-14 md:w-14"
                    onClick={() => scroll('right')}
                >
                    <img src={ChevronRightIcon} alt="" className="h-5 w-5 md:h-6 md:w-6" />
                </Motion.button>
            )}
        </div>
    );
}
