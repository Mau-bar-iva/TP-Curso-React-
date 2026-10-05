import { useMemo } from 'react';

const getSwatchColor = (colorName) => {
    const value = String(colorName || '').toLowerCase();

    if (value.includes('black')) return '#1b1b1b';
    if (value.includes('white') || value.includes('ivory')) return '#F4EFE8';
    if (value.includes('beige') || value.includes('sand') || value.includes('tan')) return '#C7A98B';
    if (value.includes('brown') || value.includes('camel')) return '#8D6B4F';
    if (value.includes('navy') || value.includes('blue')) return '#2D4266';
    if (value.includes('olive') || value.includes('green')) return '#6A715A';
    if (value.includes('red') || value.includes('coral')) return '#C86759';
    if (value.includes('gray') || value.includes('grey')) return '#9EA3A1';
    if (value.includes('pink')) return '#D9A4A0';
    if (value.includes('gold')) return '#C6A15B';
    return '#D8C7B2';
};

/* Grupo de filtros con checkboxes, reutilizado por Brands y Colores */
function CheckboxFilterGroup({
    title,
    group,
    options,
    selectedValues = [],
    onToggle,
    emptyText,
    renderPrefix,
}) {
    return (
        <div>
            <h4 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-500">
                {title}
            </h4>

            {options.length > 0 ? (
                <div className="space-y-1.5">
                    {options.map(({ name }) => (
                        <label
                            key={name}
                            className="flex items-center gap-2.5 text-xs text-stone-700 hover:text-stone-900 cursor-pointer py-1"
                        >
                            <input
                                type="checkbox"
                                checked={selectedValues.includes(name)}
                                onChange={() => onToggle(group, name)}
                                className="rounded cursor-pointer border-stone-300 accent-stone-900 h-4 w-4"
                            />
                            {renderPrefix?.(name)}
                            <span>{name}</span>
                        </label>
                    ))}
                </div>
            ) : (
                emptyText && <p className="text-sm text-stone-500">{emptyText}</p>
            )}
        </div>
    );
}

export default function Filters({
    products = [],
    selectedFilters = { color: [], sizes: [], brand: [] },
    onToggleFilter,
    onClearAll,
    activeFiltersCount = 0,
    mobile = false,
}) {
    const colors = useMemo(() => {
        const map = new Map();

        products.forEach((product) => {
            const variants = Array.isArray(product?.variants) ? product.variants : [];

            variants.forEach((variant) => {
                const color = variant?.color;
                if (!color) return;
                map.set(color, (map.get(color) || 0) + 1);
            });
        });

        return [...map.entries()].map(([name, count]) => ({ name, count }));
    }, [products]);

    const brands = useMemo(() => {
        const map = new Map();

        products.forEach((product) => {
            const brand = product?.brand;
            if (!brand) return;
            map.set(brand, (map.get(brand) || 0) + 1);
        });

        return [...map.entries()].map(([name, count]) => ({ name, count }));
    }, [products]);

    const sizes = useMemo(() => {
        const map = new Map();

        products.forEach((product) => {
            const variants = Array.isArray(product?.variants) ? product.variants : [];

            variants.forEach((variant) => {
                const list = Array.isArray(variant?.sizes) ? variant.sizes : [];
                list.forEach((size) => {
                    if (!size) return;
                    map.set(size, (map.get(size) || 0) + 1);
                });
            });
        });

        return [...map.entries()].map(([name, count]) => ({ name, count }));
    }, [products]);

    const handleToggle = (group, value) => {
        if (onToggleFilter) onToggleFilter(group, value);
    };

    const panelClass = mobile
        ? 'space-y-5'
        : 'space-y-6 rounded-[28px] border border-[#E7E1D6] bg-white p-4 shadow-[0_18px_42px_rgba(34,29,23,0.04)]';

    return (
        <aside className={panelClass}>
            {/* ENCABEZADO CON LIMPIAR FILTROS DEBAJO */}
            <div className="border-b border-stone-200 pb-3">
                <h3 className="font-serif text-2xl text-[#221D17]">Filtros</h3>
            </div>

            <div className="space-y-5">
                {activeFiltersCount > 0 && onClearAll && (
                    <button
                        type="button"
                        onClick={onClearAll}
                        className="text-xs text-stone-500 hover:text-stone-900 tracking-wide transition block text-left"
                    >
                        Limpiar filtros ({activeFiltersCount})
                    </button>
                )}

                <CheckboxFilterGroup
                    title="Brands"
                    group="brand"
                    options={brands}
                    selectedValues={selectedFilters.brand}
                    onToggle={handleToggle}
                />

                <CheckboxFilterGroup
                    title="Colores"
                    group="color"
                    options={colors}
                    selectedValues={selectedFilters.color}
                    onToggle={handleToggle}
                    emptyText="Sin colores disponibles"
                    renderPrefix={(name) => (
                        <span
                            className="h-4 w-4 shrink-0 rounded-full border border-stone-300"
                            style={{ backgroundColor: getSwatchColor(name) }}
                            aria-hidden="true"
                        />
                    )}
                />

                <div>
                    <h4 className="mb-3 text-[10px] font-medium uppercase tracking-[0.18em] text-stone-500">
                        Talles
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {sizes.length > 0 ? (
                            sizes.map(({ name, count }) => {
                                const selected = selectedFilters.sizes?.includes(name);

                                return (
                                    <button
                                        key={name}
                                        type="button"
                                        onClick={() => handleToggle('sizes', name)}
                                        className={`flex h-10 w-10 items-center justify-center rounded-[10px] border text-sm transition ${selected
                                            ? 'border-[#221D17] bg-[#221D17] text-white'
                                            : 'border-[#E7E1D6] bg-white text-stone-700 hover:border-stone-400'
                                            }`}
                                        title={`${name} (${count})`}
                                    >
                                        {name}
                                    </button>
                                );
                            })
                        ) : (
                            <p className="text-sm text-stone-500">Sin talles disponibles</p>
                        )}
                    </div>
                </div>
            </div>
        </aside>
    );
}