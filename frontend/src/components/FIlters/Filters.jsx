import { useState } from 'react';
import FilterIcon from '../../assets/filter.svg';
import closeIcon from '../../assets/close.svg';

export default function Filters({ products, setFilters }) {
    const colors = [
        ...new Set(
            (Array.isArray(products) ? products : [])
                .flatMap((p) => (Array.isArray(p?.variants) ? p.variants.map((v) => v?.color).filter(Boolean) : []))
        ),
    ];

    const brands = [
        ...new Set((Array.isArray(products) ? products : []).map((p) => p?.brand).filter(Boolean)),
    ];

    const sizes = [
        ...new Set(
            (Array.isArray(products) ? products : [])
                .flatMap((p) =>
                    Array.isArray(p?.variants)
                        ? p.variants.flatMap((v) => (Array.isArray(v?.sizes) ? v.sizes : [])).filter(Boolean)
                        : []
                )
        ),
    ];

    const [openFilters, setOpenFilters] = useState(false);

    const handleCheckBox = (e) => {
        const { name, value, checked } = e.target;

        setFilters((prev) => {
            const currentValues = prev?.[name] ?? [];

            return {
                ...prev,
                [name]: checked ? [...currentValues, value] : currentValues.filter((v) => v !== value),
            };
        });
    };

    const filterGroups = [
        { title: 'Colors', name: 'color', values: colors },
        { title: 'Brands', name: 'brand', values: brands },
        { title: 'Sizes', name: 'sizes', values: sizes },
    ];

    return (
        <aside className="w-full">
            <div className="mb-4 flex lg:hidden">
                <button
                    type="button"
                    onClick={() => setOpenFilters(!openFilters)}
                    className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-700 shadow-sm"
                >
                    <img src={FilterIcon} alt="menu-icon" className="h-4 w-4" />
                    Filters
                </button>
            </div>

            <div
                className={`${openFilters ? 'fixed inset-x-0 bottom-0 z-50 grid max-h-[55vh] grid-cols-2 gap-4 rounded-t-[28px] bg-[#1e1d1b] p-4 text-white lg:static lg:grid lg:max-h-none lg:rounded-none lg:bg-transparent lg:p-0 lg:text-stone-900' : 'hidden lg:block'} `}
            >
                <div className="col-span-2 flex items-center justify-between lg:hidden">
                    <h5 className="text-lg font-semibold">Filters</h5>
                    <button type="button" className="rounded-full bg-white/10 p-2" onClick={() => setOpenFilters(false)}>
                        <img src={closeIcon} alt="close-icon" className="h-4 w-4 invert" />
                    </button>
                </div>

                {filterGroups.map((group) => (
                    <div key={group.title} className="space-y-3">
                        <h5 className="text-sm font-semibold uppercase tracking-[0.14em] text-current lg:text-stone-700">{group.title}</h5>
                        <ul className="space-y-2 text-sm">
                            {group.values.map((value, index) => (
                                <li key={`${group.title}-${index}`} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name={group.name}
                                        value={value}
                                        onChange={handleCheckBox}
                                        className="h-4 w-4 accent-stone-900"
                                    />
                                    <span className="text-current lg:text-stone-700">{value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </aside>
    );
}