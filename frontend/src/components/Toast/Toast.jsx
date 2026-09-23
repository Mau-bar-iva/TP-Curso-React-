import { useEffect, useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';

const palette = {
    success: {
        container: 'border-emerald-200 bg-emerald-50 text-emerald-900',
        dot: 'bg-emerald-500',
        accent: 'from-emerald-500 to-emerald-600',
    },
    error: {
        container: 'border-red-200 bg-red-50 text-red-900',
        dot: 'bg-red-500',
        accent: 'from-red-500 to-red-600',
    },
    info: {
        container: 'border-sky-200 bg-sky-50 text-sky-900',
        dot: 'bg-sky-500',
        accent: 'from-sky-500 to-sky-600',
    },
};

export default function Toast() {
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const handleToast = (event) => {
            const payload = event.detail ?? {};
            const { message, title, description, type = 'success', duration = 3200, className = '' } = payload;
            if (!message && !title) return;

            setToast({ message, title, description, type, duration, className });
        };

        window.addEventListener('app-toast', handleToast);
        return () => window.removeEventListener('app-toast', handleToast);
    }, []);

    useEffect(() => {
        if (!toast) return undefined;

        const timeoutId = window.setTimeout(() => setToast(null), toast.duration ?? 3200);
        return () => window.clearTimeout(timeoutId);
    }, [toast]);

    const styles = toast ? palette[toast.type] ?? palette.success : null;

    return (
        <AnimatePresence>
            {toast && (
                <Motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.97 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className={`fixed top-25 right-5 z-[100] w-[min(92vw,380px)] rounded-2xl border shadow-[0_20px_40px_rgba(33,29,23,0.14)] backdrop-blur-sm ${toast.className ?? ''}`}
                    style={{ pointerEvents: 'auto' }}
                >
                    <div className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${styles.container}`}>
                        <span className={`relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${styles.accent}`}>
                            <span className="h-2.5 w-2.5 rounded-full bg-white" />
                        </span>

                        <div className="min-w-0 flex-1">
                            {toast.title && <p className="text-sm font-semibold leading-5">{toast.title}</p>}
                            <p className="text-sm leading-5 text-current/80">{toast.message}</p>
                            {toast.description && (
                                <p className="mt-1 text-xs opacity-75">{toast.description}</p>
                            )}
                        </div>
                    </div>
                </Motion.div>
            )}
        </AnimatePresence>
    );
}
