import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../../services/products';

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

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!search) return null;

    return (
        <>
            {open && (
                <div ref={menuRef} className="w-[320px] rounded-[24px] border border-stone-200 bg-white p-4 shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
                    <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">Products</h4>

                    <div className="space-y-3">
                        {products
                            ?.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
                            .slice(0, 3)
                            .map((p) => (
                                <Link to={`/detail/${p.id}`} key={p.id} className="block text-stone-900 hover:no-underline" onClick={() => setOpen(false)}>
                                    <article className="grid grid-cols-[88px_1fr] gap-3 rounded-2xl border border-stone-100 bg-stone-50 p-2">
                                        <img src={p.imageUrl} alt="" className="h-[88px] w-[88px] rounded-xl object-cover" />
                                        <div className="flex flex-col justify-center">
                                            <h5 className="text-[10px] font-medium uppercase tracking-[0.14em] text-stone-500">
                                                {Array.isArray(p.category) ? p.category[0] : p.category}
                                            </h5>
                                            <h4 className="mt-1 line-clamp-2 text-sm font-semibold text-stone-900">{p.name}</h4>
                                            <p className="mt-1 text-sm font-medium text-stone-700">${p.price}</p>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                    </div>

                    <Link to="/" className="mt-4 block text-sm font-semibold text-stone-900 hover:text-stone-600">
                        Ver todo "{search}"
                    </Link>
                </div>
            )}
        </>
    );
}