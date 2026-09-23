import { useEffect, useMemo, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { getProducts } from '../../services/products';
import { ItemList } from '../ItemList/ItemList.jsx';

export default function OffersPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        getProducts()
            .then((data) => setProducts(data || []))
            .catch((error) => {
                console.error(error);
                setProducts([]);
            })
            .finally(() => setLoading(false));
    }, []);

    const offerProducts = useMemo(
        () => products.filter((product) => product.oldPrice && Number(product.oldPrice) > Number(product.price)),
        [products]
    );

    return (
        <section className="mx-auto w-full max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">
            <Motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="mb-8 overflow-hidden rounded-[28px] border border-[#eadfce] bg-[linear-gradient(135deg,#f5efe9,#efe7df)] p-6 md:p-8"
            >
                <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                    <div className="space-y-3">
                        <p className="text-xs font-medium uppercase tracking-[0.22em] text-stone-500">Limited time</p>
                        <h1 className="font-serif text-4xl font-medium text-stone-900 md:text-6xl">Seasonal offers</h1>
                    </div>

                    <div className="rounded-full border border-stone-200 bg-white/70 px-4 py-2 text-sm font-medium text-stone-700 shadow-sm">
                        {offerProducts.length} items on sale
                    </div>
                </div>
            </Motion.div>

            {loading ? (
                <div className="rounded-[24px] border border-stone-200 bg-white px-6 py-10 text-center text-stone-600 shadow-sm">
                    Loading offers...
                </div>
            ) : offerProducts.length ? (
                <Motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-6"
                >
                    <div className="flex items-center justify-between gap-4 border-b border-stone-200 pb-3">
                        <h2 className="font-serif text-2xl font-medium text-stone-900 md:text-4xl">Fresh drops with discounts</h2>
                    </div>

                    <ItemList lista={offerProducts} />
                </Motion.div>
            ) : (
                <div className="rounded-[28px] border border-dashed border-stone-300 bg-white/60 px-6 py-14 text-center shadow-sm">
                    <h2 className="font-serif text-3xl text-stone-900">No offers available right now</h2>
                    <p className="mt-2 text-stone-600">Check back soon for new seasonal discounts.</p>
                </div>
            )}
        </section>
    );
}