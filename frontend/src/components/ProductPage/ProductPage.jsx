import { useParams, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProducts, getCollections } from '../../services/products';
import { ItemList } from '../ItemList/ItemList.jsx';
import Filters from '../FIlters/Filters.jsx';

export default function ProductPage({ type }) {
    const { collection } = useParams();
    const [searchParams] = useSearchParams();

    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({
        color: [],
        sizes: [],
        brand: [],
    });
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 12;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageCount = Math.ceil(products.length / itemsPerPage);
    const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

    useEffect(() => {
        const loadData = async () => {
            const filtersSearch = {
                season: searchParams.get('season'),
                category: searchParams.getAll('category'),
                collection: searchParams.get('collection'),
            };

            try {
                let data;

                if (type === 'category') {
                    data = await getProducts();

                    Object.entries(filtersSearch).forEach(([key, value]) => {
                        if (!value) return;

                        if (key === 'category') {
                            const categories = (Array.isArray(value) ? value : [value])
                                .filter(Boolean)
                                .map((cat) => String(cat).toLowerCase());

                            data = data.filter((item) => {
                                const itemCategories = Array.isArray(item.category)
                                    ? item.category.map((cat) => String(cat).toLowerCase())
                                    : item.category
                                        ? [String(item.category).toLowerCase()]
                                        : [];

                                const itemSubCategories = item.subCategory
                                    ? [String(item.subCategory).toLowerCase()]
                                    : [];

                                const allValues = [...itemCategories, ...itemSubCategories];

                                return categories.every((cat) => allValues.includes(cat));
                            });

                            return;
                        }

                        data = data.filter((item) => {
                            if (Array.isArray(item[key])) {
                                return item[key].includes(value);
                            }
                            return item[key] === value;
                        });
                    });

                    setProducts(data);
                }

                if (type === 'collection') {
                    data = await getCollections(collection);
                    setProducts(data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        setCurrentPage(1);
        loadData();
    }, [searchParams, type, collection]);

    const filteredProducts = products.filter((product) => {
        const productVariants = Array.isArray(product?.variants) ? product.variants : [];

        const matchColor =
            filters.color.length === 0 ||
            productVariants.some((variant) => variant?.color && filters.color.includes(variant.color));

        const matchSize =
            filters.sizes.length === 0 ||
            productVariants.some(
                (variant) => Array.isArray(variant?.sizes) && variant.sizes.some((size) => filters.sizes.includes(size))
            );

        const matchBrand =
            filters.brand.length === 0 ||
            (product?.brand && filters.brand.some((b) => b.toLowerCase() === product.brand.toLowerCase()));

        return matchColor && matchSize && matchBrand;
    });

    const currentItems = filteredProducts.slice(startIndex, endIndex);

    return (
        <section className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-6 border-b border-stone-200 pb-4">
                <h3 className="font-serif text-3xl font-medium capitalize text-stone-900">Products</h3>
            </div>

            <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
                <div className="lg:pt-2">
                    <Filters products={products} setFilters={setFilters} />
                </div>

                <div className="space-y-6">
                    <div className="w-full">
                        <ItemList lista={currentItems} />
                    </div>

                    <div className="flex justify-center gap-3 pb-6">
                        {pages.map((page) => (
                            <button
                                key={page}
                                type="button"
                                onClick={() => setCurrentPage(page)}
                                disabled={page === currentPage}
                                className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-medium transition ${page === currentPage
                                    ? 'border-stone-900 bg-stone-900 text-white'
                                    : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
