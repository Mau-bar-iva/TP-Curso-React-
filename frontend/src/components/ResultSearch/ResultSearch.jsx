import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../../services/products';

const quickSuggestions = ['Remeras', 'Abrigos', 'Calzado'];

export default function ResultSearch({ search }) {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        getProducts().then((data) => setProducts(data)).catch(() => { });
    }, []);

    useEffect(() => {
        setOpen(Boolean(search?.trim()));
    }, [search]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    if (!search) return null;

    const filteredProducts = (products || [])
        .filter((product) => {
            const productName = String(product?.name ?? '').toLowerCase();
            const searchTerm = String(search ?? '').toLowerCase();
            return productName.includes(searchTerm);
        })
        .slice(0, 5);

    const total = filteredProducts.length;

    return (
        <>
            {open && (
                <div
                    ref={menuRef}
                    className="absolute right-0 top-full z-50 mt-3 w-[360px] rounded-3xl border border-[#E7E1D6] bg-white p-4 shadow-[0_25px_50px_-12px_rgba(34,29,23,0.18)] sm:w-[420px]"
                >
                    <div className="mb-3 flex items-center justify-between gap-2">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-400">
                            Prendas sugeridas
                        </p>
                        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-stone-500">
                            {total} encontrada{total === 1 ? '' : 's'}
                        </span>
                    </div>

                    {total > 0 ? (
                        <>
                            <div className="space-y-1">
                                {filteredProducts.map((product) => {
                                    const productPrice = Number(product.price ?? 0);
                                    const oldPrice = Number(product.oldPrice ?? 0);
                                    const hasDiscount = oldPrice > productPrice;

                                    return (
                                        <Link
                                            key={product.id}
                                            to={`/detail/${product.id}`}
                                            onClick={() => setOpen(false)}
                                            className="block rounded-2xl p-2 transition hover:bg-[#FAF9F6]"
                                        >
                                            <article className="grid grid-cols-[64px_1fr] gap-3">
                                                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-[#F7F4EF]">
                                                    <img
                                                        src={product.imageUrl || '/assets/logo.png'}
                                                        alt={product.name}
                                                        className="h-full w-full object-contain"
                                                    />
                                                </div>

                                                <div className="min-w-0 flex flex-col justify-center">
                                                    <p className="text-[9px] uppercase tracking-[0.14em] text-stone-500">
                                                        {Array.isArray(product.category)
                                                            ? product.category[0]
                                                            : product.category || 'Colección'}
                                                    </p>
                                                    <h4 className="mt-1 line-clamp-1 font-serif text-sm font-medium text-stone-900">
                                                        {product.name}
                                                    </h4>
                                                    <div className="mt-1 flex items-center gap-2 text-xs text-stone-700">
                                                        <span className="font-serif text-sm font-medium tabular-nums text-stone-900">
                                                            ${productPrice}
                                                        </span>
                                                        {hasDiscount && (
                                                            <span className="text-[11px] text-stone-400 line-through">
                                                                ${oldPrice}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </article>
                                        </Link>
                                    );
                                })}
                            </div>

                            <div className="mt-4 border-t border-[#E7E1D6] pt-3">
                                <Link
                                    to={`/category?search=${encodeURIComponent(search.trim())}`}
                                    onClick={() => setOpen(false)}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#221D17] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#312a25]"
                                >
                                    Ver todos los resultados ({total})
                                    <span aria-hidden="true">→</span>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-[#E7E1D6] bg-[#F9F6F1] p-4 text-center">
                            <p className="text-sm text-stone-700">
                                No encontramos prendas para <span className="font-medium text-stone-900">"{search}"</span>.
                            </p>
                            <div className="mt-3 flex flex-wrap justify-center gap-2">
                                {quickSuggestions.map((suggestion) => (
                                    <button
                                        key={suggestion}
                                        type="button"
                                        onClick={() => {
                                            const input = document.getElementById('searchbar');
                                            if (input) {
                                                input.value = suggestion;
                                                input.dispatchEvent(new Event('input', { bubbles: true }));
                                            }
                                        }}
                                        className="rounded-full border border-[#E7E1D6] bg-white px-2.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-stone-600 transition hover:border-stone-300 hover:text-stone-900"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}