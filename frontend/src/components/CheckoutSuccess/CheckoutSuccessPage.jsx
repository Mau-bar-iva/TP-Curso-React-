import { Link, useLocation } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';

export default function CheckoutSuccessPage() {
    const location = useLocation();
    const order = location.state?.order ?? null;
    const items = location.state?.items ?? [];

    const total = order?.total ?? items.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0);

    return (
        <section className="mx-auto flex w-full max-w-5xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <Motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="w-full rounded-[32px] border border-emerald-200 bg-white p-6 shadow-[0_25px_60px_rgba(16,24,40,0.08)] sm:p-8 lg:p-10"
            >
                <div className="mb-6 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                    Order confirmed
                </div>

                <h1 className="font-serif text-4xl font-medium text-stone-900 sm:text-5xl">Thank you for your purchase</h1>
                <p className="mt-3 max-w-2xl text-stone-600">
                    Your order has been successfully processed and the cart has been cleared.
                </p>

                <div className="mt-8 grid gap-5 rounded-[28px] border border-stone-200 bg-[#f8f5f1] p-5 md:grid-cols-[1.1fr_0.9fr]">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">Order number</p>
                        <p className="mt-2 font-serif text-3xl text-stone-900">#{order?.id ?? 'N/A'}</p>
                    </div>

                    <div>
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">Total</p>
                        <p className="mt-2 font-serif text-3xl text-stone-900">${Number(total).toFixed(2)}</p>
                    </div>
                </div>

                {items.length > 0 && (
                    <div className="mt-8">
                        <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-stone-500">Order detail</p>
                        <div className="space-y-3">
                            {items.map((item) => (
                                <div key={item.id} className="flex items-center justify-between rounded-2xl border border-stone-200 bg-white px-4 py-3">
                                    <div>
                                        <p className="font-medium text-stone-900">{item.name}</p>
                                        <p className="text-sm text-stone-500">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-medium text-stone-900">${((Number(item.price) || 0) * (Number(item.quantity) || 1)).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center rounded-full bg-stone-900 px-5 py-3 text-sm font-medium uppercase tracking-[0.18em] text-white transition hover:bg-stone-700"
                    >
                        Continue shopping
                    </Link>
                    <Link
                        to="/offers"
                        className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-medium uppercase tracking-[0.18em] text-stone-800 transition hover:border-stone-400"
                    >
                        View offers
                    </Link>
                </div>
            </Motion.div>
        </section>
    );
}
