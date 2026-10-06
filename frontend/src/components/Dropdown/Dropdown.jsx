import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Dropdown({
    options = [],
    value,
    onChange,
    className = '',
    buttonClass = '',
    menuClass = '',
    itemClass = '',
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const selected = options.find((o) => o.value === value) || options[0] || { label: '', value: '' };

    useEffect(() => {
        const handleDoc = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };

        const handleKey = (e) => {
            if (e.key === 'Escape') setOpen(false);
        };

        document.addEventListener('mousedown', handleDoc);
        document.addEventListener('keydown', handleKey);

        return () => {
            document.removeEventListener('mousedown', handleDoc);
            document.removeEventListener('keydown', handleKey);
        };
    }, []);

    const toggle = () => setOpen((s) => !s);

    const handleSelect = (val) => {
        onChange?.(val);
        setOpen(false);
    };

    // Un solo movimiento orquestado: el menú se abre desde el botón,
    // y cada opción entra en cascada muy breve. Nada de hover animado
    // en cada item; el foco visual está en la apertura, no en la lista.
    const menuVariants = {
        hidden: { opacity: 0, scale: 0.96, y: -6 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.16,
                ease: [0.16, 1, 0.3, 1],
                staggerChildren: 0.025,
                delayChildren: 0.02,
            },
            overflow: 'hidden',
        },
        exit: {
            opacity: 0,
            scale: 0.98,
            y: -4,
            transition: { duration: 0.12, ease: [0.4, 0, 1, 1] },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: -4 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div ref={ref} className={`relative inline-block text-left ${className}`}>
            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={toggle}
                className={
                    buttonClass ||
                    'appearance-none rounded-full border border-[#E7E1D6] bg-white px-4 py-2.5 pr-10 text-sm text-stone-700 shadow-sm outline-none transition-colors focus:border-stone-900'
                }
            >
                <span className="truncate">{selected.label}</span>
                <Motion.span
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-500"
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                >
                    <ChevronDown className="h-4 w-4" />
                </Motion.span>
            </button>

            <AnimatePresence>
                {open && (
                    <Motion.ul
                        role="listbox"
                        tabIndex={-1}
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        style={{ transformOrigin: 'top right' }}
                        className={
                            menuClass ||
                            'absolute right-0 mt-2 w-56 origin-top-right divide-y divide-transparent rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50'
                        }
                    >
                        {options.map((opt) => {
                            const isSelected = opt.value === value;
                            return (
                                <Motion.li
                                    key={opt.value}
                                    variants={itemVariants}
                                    role="option"
                                    aria-selected={isSelected}
                                    onClick={() => handleSelect(opt.value)}
                                    className={
                                        itemClass ||
                                        `flex items-center justify-between cursor-pointer px-4 py-2 text-sm transition-colors hover:bg-stone-100 ${isSelected ? 'text-stone-900 font-medium' : 'text-stone-700'
                                        }`
                                    }
                                >
                                    <span className="truncate">{opt.label}</span>
                                </Motion.li>
                            );
                        })}
                    </Motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}