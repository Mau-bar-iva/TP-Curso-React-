import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { getProducts, getCollections } from '../../services/products';
import { ItemList } from '../ItemList/ItemList.jsx';
import ProductCardSkeleton from '../Skeleton/ProductCardSkeleton';
import Filters from '../FIlters/Filters.jsx';
import Dropdown from '../Dropdown/Dropdown.jsx';

const SORT_OPTIONS = [
    { value: 'featured', label: 'Destacados' },
    { value: 'price-asc', label: 'Precio: Menor a Mayor' },
    { value: 'price-desc', label: 'Precio: Mayor a Menor' },
    { value: 'discount-desc', label: 'Mayor Descuento' },
];

const getProductPrice = (product) => Number(product?.price ?? 0);

const getProductDiscount = (product) => {
    if (!product?.oldPrice || Number(product.oldPrice) <= Number(product.price)) return 0;
    return Math.round(100 - (Number(product.price) / Number(product.oldPrice)) * 100);
};

const normalizeValue = (value) => String(value ?? '').trim().toLowerCase();

export default function ProductPage({ type = 'category' }) {
    const { collection } = useParams();
    const [searchParams] = useSearchParams();

    const [products, setProducts] = useState([]);
    const [sortBy, setSortBy] = useState('featured');
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState({
        color: [],
        sizes: [],
        brand: [],
    });

    const itemsPerPage = 12;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const routeFilters = {
                    season: searchParams.get('season'),
                    category: searchParams.getAll('category'),
                    collection: searchParams.get('collection'),
                };

                let data = [];

                if (type === 'category') {
                    data = await getProducts();

                    Object.entries(routeFilters).forEach(([key, value]) => {
                        if (!value) return;

                        if (key === 'category') {
                            const categories = (Array.isArray(value) ? value : [value])
                                .filter(Boolean)
                                .map((cat) => normalizeValue(cat));

                            if (categories.length === 0) return;

                            data = data.filter((item) => {
                                const itemCategories = Array.isArray(item.category)
                                    ? item.category.map((cat) => normalizeValue(cat))
                                    : item.category
                                        ? [normalizeValue(item.category)]
                                        : [];

                                const itemSubCategories = item.subCategory
                                    ? [normalizeValue(item.subCategory)]
                                    : [];

                                const allValues = [...itemCategories, ...itemSubCategories];

                                return categories.every((cat) => allValues.includes(cat));
                            });

                            return;
                        }

                        data = data.filter((item) => {
                            const itemValue = Array.isArray(item[key]) ? item[key] : item[key];
                            if (Array.isArray(itemValue)) return itemValue.includes(value);
                            return itemValue === value;
                        });
                    });
                }

                if (type === 'collection') {
                    data = await getCollections(collection);
                }

                setProducts(data || []);
            } catch (error) {
                console.error(error);
                setProducts([]);
            }
            finally {
                setLoading(false);
            }
        };

        setSelectedFilters({
            color: [],
            sizes: [],
            brand: [],
        });

        loadData();
    }, [searchParams, collection, type]);

    const toggleFilter = (group, value) => {
        setSelectedFilters((prev) => {
            const current = prev[group] ?? [];
            const next = current.includes(value)
                ? current.filter((entry) => entry !== value)
                : [...current, value];

            return { ...prev, [group]: next };
        });
    };

    const clearAllFilters = () => {
        setSelectedFilters({ color: [], sizes: [], brand: [] });
    };

    const activeFilters = useMemo(
        () =>
            Object.entries(selectedFilters).flatMap(([group, values]) =>
                values.map((value) => ({ group, value }))
            ),
        [selectedFilters]
    );

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const variants = Array.isArray(product?.variants) ? product.variants : [];

            const colorMatch =
                selectedFilters.color.length === 0 ||
                variants.some((variant) => {
                    const color = variant?.color;
                    return color && selectedFilters.color.includes(color);
                });

            const sizeMatch =
                selectedFilters.sizes.length === 0 ||
                variants.some((variant) => {
                    const sizes = Array.isArray(variant?.sizes) ? variant.sizes : [];
                    return sizes.some((size) => selectedFilters.sizes.includes(size));
                });

            const brandMatch =
                selectedFilters.brand.length === 0 ||
                (product?.brand && selectedFilters.brand.includes(product.brand));

            return colorMatch && sizeMatch && brandMatch;
        });
    }, [products, selectedFilters]);

    const sortedProducts = useMemo(() => {
        const items = [...filteredProducts];

        switch (sortBy) {
            case 'price-asc':
                return items.sort((a, b) => getProductPrice(a) - getProductPrice(b));
            case 'price-desc':
                return items.sort((a, b) => getProductPrice(b) - getProductPrice(a));
            case 'discount-desc':
                return items.sort(
                    (a, b) => getProductDiscount(b) - getProductDiscount(a)
                );
            case 'featured':
            default:
                return items.sort((a, b) => getProductDiscount(b) - getProductDiscount(a) || getProductPrice(a) - getProductPrice(b));
        }
    }, [filteredProducts, sortBy]);

    const totalResults = sortedProducts.length;
    const pageCount = Math.max(1, Math.ceil(totalResults / itemsPerPage));
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [sortBy, selectedFilters, searchParams, collection, type]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

    const pageNumbers = Array.from({ length: pageCount }, (_, index) => index + 1);

    const breadcrumbs = (() => {
        const crumbs = [
            { label: 'Inicio', to: '/' },
            { label: 'Catálogo', to: '/category' },
        ];

        if (type === 'collection' && collection) {
            crumbs.push({ label: collection, to: `/collection/${collection}` });
        }

        const categories = searchParams.getAll('category') || [];
        if (categories.length > 0) {
            categories.forEach((cat) => {
                // link to catalog with that category selected
                crumbs.push({ label: cat, to: `/category?category=${encodeURIComponent(cat)}` });
            });
        }

        return crumbs;
    })();

    return (
        <section className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">

            <header className="mb-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    {/* BREADCRUMB EDITORIAL */}
                    <nav aria-label="Breadcrumb" className="mb-3 ml-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-stone-500">
                        {breadcrumbs.map((crumb, idx) => (
                            <span key={`${crumb.label}-${idx}`} className="flex items-center gap-2">
                                {idx !== 0 && <span className="text-stone-300">/</span>}
                                {idx < breadcrumbs.length - 1 ? (
                                    <Link to={crumb.to} className="hover:text-stone-900 transition">{crumb.label}</Link>
                                ) : (
                                    <span className="font-medium text-stone-900 uppercase tracking-[0.2em]">{crumb.label}</span>
                                )}
                            </span>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3 self-start lg:self-auto">
                        <Dropdown
                            options={SORT_OPTIONS}
                            value={sortBy}
                            onChange={(val) => setSortBy(val)}
                            className=""
                            buttonClass={'appearance-none rounded-full bg-white px-4 py-2.5 pr-10 text-sm text-stone-700 shadow-sm outline-none transition focus:border-stone-900'}
                            menuClass={'absolute right-0 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-300 ring-opacity-5 z-50'}
                            itemClass={'cursor-pointer px-4 py-2 text-sm text-stone-700 hover:bg-stone-100'}
                        />
                    </div>
                </div>
            </header>

            <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
                <div className="hidden lg:block">
                    <Filters
                        products={products}
                        selectedFilters={selectedFilters}
                        onToggleFilter={toggleFilter}
                        onClearAll={clearAllFilters}
                        activeFiltersCount={activeFilters.length}
                    />
                </div>

                <div className="space-y-6">
                    {loading ? (
                        <div aria-busy="true" aria-live="polite">
                            <div className="grid w-full justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {Array.from({ length: itemsPerPage }).map((_, i) => (
                                    <ProductCardSkeleton key={i} />
                                ))}
                            </div>
                        </div>
                    ) : totalResults === 0 ? (
                        <div className="rounded-[30px] border border-[#E7E1D6] bg-[#F7F4EF] px-6 py-12 text-center shadow-[0_16px_42px_rgba(34,29,23,0.04)]">
                            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">
                                Sin resultados
                            </p>
                            <h3 className="mt-3 font-serif text-3xl text-[#221D17]">
                                No encontramos prendas con los filtros seleccionados
                            </h3>
                            <button
                                type="button"
                                onClick={clearAllFilters}
                                className="mt-6 inline-flex items-center justify-center rounded-full bg-[#1A1714] px-5 py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white transition hover:bg-[#2f2924]"
                            >
                                Reiniciar filtros
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="w-full">
                                <ItemList lista={currentItems} />
                            </div>

                            {pageCount > 1 && (
                                <div className="flex justify-center gap-3 pb-6">
                                    {pageNumbers.map((page) => (
                                        <button
                                            key={page}
                                            type="button"
                                            onClick={() => setCurrentPage(page)}
                                            disabled={page === currentPage}
                                            className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-medium transition ${page === currentPage
                                                ? 'border-[#221D17] bg-[#221D17] text-white'
                                                : 'border-[#E7E1D6] bg-white text-stone-700 hover:border-stone-400'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#1A1714] px-4 py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white shadow-[0_20px_40px_rgba(34,29,23,0.2)] lg:hidden"
            >
                Filtros y Ordenar
                {activeFilters.length > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-[9px] font-semibold text-[#221D17]">
                        {activeFilters.length}
                    </span>
                )}
            </button>

            {mobileFiltersOpen && (
                <div className="fixed inset-0 z-50 bg-[#221D17]/40 lg:hidden">
                    <div className="absolute inset-x-0 bottom-0 max-h-[80vh] overflow-y-auto rounded-t-[28px] bg-[#F7F4EF] p-4 shadow-[0_-20px_40px_rgba(34,29,23,0.12)]">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="font-serif text-2xl text-[#221D17]">Filtros</h3>
                            <button
                                type="button"
                                onClick={() => setMobileFiltersOpen(false)}
                                className="rounded-full border border-[#E7E1D6] bg-white px-3 py-2 text-sm text-stone-700"
                            >
                                Cerrar
                            </button>
                        </div>

                        <Filters
                            products={products}
                            selectedFilters={selectedFilters}
                            onToggleFilter={toggleFilter}
                            onClearAll={clearAllFilters}
                            mobile
                        />

                        <button
                            type="button"
                            onClick={() => setMobileFiltersOpen(false)}
                            className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-full bg-[#1A1714] px-4 text-[10px] font-medium uppercase tracking-[0.18em] text-white"
                        >
                            Ver resultados
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}