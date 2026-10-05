import type { MouseEvent } from 'react';
import { AnimatePresence, motion as Motion, useReducedMotion, type Variants } from 'framer-motion';
import { Heart } from 'lucide-react';


type FavoriteButtonSize = 'sm' | 'md';

interface FavoriteButtonProps {
    isFavorite?: boolean;
    onToggle?: () => void;
    size?: FavoriteButtonSize;
    label?: string;
    className?: string;
}

// "sm" para cards, "md" para el detalle de producto.
// En "sm" ampliamos el área táctil con un pseudo-elemento (36px visibles → 48px de toque)
// para cumplir el mínimo recomendado en mobile sin agrandar el botón visualmente.
const SIZE_STYLES: Record<FavoriteButtonSize, { button: string; icon: string }> = {
    sm: { button: 'h-10 w-10 before:absolute before:-inset-1', icon: 'h-5 w-5' },
    md: { button: 'h-11 w-11', icon: 'h-[22px] w-[22px]' },
};

const heartVariants: Variants = {
    inactive: { scale: 1 },
    active: {
        scale: [1, 1.3, 1],
        transition: { duration: 0.4, ease: 'easeOut' },
    },
};

export default function FavoriteButton({
    isFavorite = false,
    onToggle,
    size = 'sm',
    label = 'Guardar en favoritos',
    className = '',
}: FavoriteButtonProps) {
    const shouldReduce = useReducedMotion();
    const styles = SIZE_STYLES[size];


    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        // El botón vive dentro de <Link> en las cards: evitamos la navegación
        // y que el click llegue a la card.
        event.preventDefault();
        event.stopPropagation();
        onToggle?.();
    };


    return (
        <Motion.button
            type="button"
            aria-label={label}
            aria-pressed={isFavorite}
            onClick={handleClick}
            whileHover={shouldReduce ? undefined : { scale: 1.06 }}
            whileTap={shouldReduce ? undefined : { scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className={`relative flex shrink-0 touch-manipulation select-none items-center justify-center rounded-full border bg-white/90 shadow-[0_10px_20px_rgba(34,29,23,0.08)] backdrop-blur-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#221D17] focus-visible:ring-offset-2 ${styles.button} ${isFavorite
                ? 'border-[#A63D34]/30 text-[#A63D34]'
                : 'border-stone-200/80 text-stone-600 hover:border-[#A63D34]/40 hover:text-[#A63D34]'
                } ${className}`}
        >
            {/* Anillo sutil que se expande al guardar. initial={false}: no se dispara al montar */}
            <AnimatePresence initial={false}>
                {isFavorite && !shouldReduce && (
                    <Motion.span
                        key="ring"
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-full border border-[#A63D34]"
                        initial={{ scale: 0.8, opacity: 0.6 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        exit={{ opacity: 0, transition: { duration: 0.1 } }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                )}
            </AnimatePresence>

            <Motion.span
                variants={heartVariants}
                initial={false}
                animate={isFavorite && !shouldReduce ? 'active' : 'inactive'}
                className="flex"
            >
                <Heart
                    strokeWidth={1.75}
                    absoluteStrokeWidth
                    aria-hidden="true"
                    className={`${styles.icon} transition-colors duration-200 ${isFavorite ? 'fill-current' : 'fill-transparent'}`}
                />
            </Motion.span>
        </Motion.button>
    );
}