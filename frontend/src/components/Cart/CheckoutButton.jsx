import React, { useState } from 'react';
import { IconLoader, IconLock as IconLockLucide } from '../Icons';

const Spinner = ({ color = '#FFF' }) => (
    <IconLoader className="animate-spin h-5 w-5" stroke={color} />
);

export default function CheckoutButton({ onCheckout }) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleClick = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
            await onCheckout();
        } finally {
            setTimeout(() => setIsSubmitting(false), 500); // small debounce
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={isSubmitting}
            className={`mt-6 inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full px-4 text-sm uppercase tracking-[0.2em] transition ${isSubmitting ? 'bg-[#1A1714] opacity-80 cursor-wait' : 'bg-[#1A1714] hover:bg-[#2d2825]'} text-white`}
            aria-busy={isSubmitting}
        >
            {isSubmitting ? (
                <>
                    <Spinner color="#fff" />
                    <span>Procesando orden...</span>
                </>
            ) : (
                <>
                    <span>Proceed to checkout</span>
                </>
            )}
        </button>
    );
}

const IconLock = ({ className = 'h-4 w-4' }) => <IconLockLucide className={className} />;
