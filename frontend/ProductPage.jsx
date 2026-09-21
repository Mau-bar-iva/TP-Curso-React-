import { useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProducts, getCollections } from "../../services/products";
import { ItemList } from "../ItemList/ItemList.jsx";
import Filters from "../FIlters/Filters.jsx"
import "./ProductPage.css"

export default function ProductPage({ type }) {
    const { collection } = useParams()
    const [searchParams] = useSearchParams();

    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({
        color: [],
        sizes: [],
        brand: [],
    });
    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 12

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    const pageCount = Math.ceil(products.length / itemsPerPage)
    const pages = Array.from({ length: pageCount }, (_, i) => i + 1)

    useEffect(() => {
        const loadData = async () => {
            const filtersSearch = {
                season: searchParams.get("season"),
                category: searchParams.getAll("category"),
                collection: searchParams.get("collection"),
            };

            try {
                let data;

                if (type === "category") {
                    data = await getProducts();


                    Object.entries(filtersSearch).forEach(([key, value]) => {
                        if (!value) return;

                        if (key === "category") {
                            const categories = Array.isArray(value) ? value : [value];

                            data = data.filter(item => {
                                if (Array.isArray(item.category)) {
                                    return categories.every(cat =>
                                        Array.isArray(item.category) && item.category.includes(cat)
                                    )
                                }
                                return categories.includes(item.category);
                            });

                            return;
                        }

                        data = data.filter(item => {
                            if (Array.isArray(item[key])) {
                                return item[key].includes(value);
                            }
                            return item[key] === value;
                        });
                    });

                    setProducts(data);
                }
                if (type === "collection") {
                    data = await getCollections(collection);
                    setProducts(data);
                }
            }
            catch (error) {
                console.error(error)
            }
        }
        setCurrentPage(1)
        loadData()
    }, [searchParams, type, collection])

    const filteredProducts = products.filter(product => {
        //si el filtro de color y sizes del producto esta incluido en el estado filters.color entonces devuelve true y crea un array con esos productos
        const matchColor =
            filters.color.length === 0 ||
            product.variants.some(c => filters.color.includes(c.color));

        const matchSize =
            filters.sizes.length === 0 ||
            product.variants.some(s => filters.sizes.includes(s.sizes[0]));

        const matchBrand =
            filters.brand.length === 0 ||
            filters.brand.some(b =>
                b.toLowerCase() === product.brand.toLowerCase()
            );

        return matchColor && matchSize && matchBrand;
    });

    const currentItems = filteredProducts.slice(startIndex, endIndex);


    return (
        <section className="productPage-container">
            <div className="productPage-title-container">
                <h3>Products</h3>
            </div>
            <div className="productPage-filters-container">
                <Filters products={products} setFilters={setFilters} />
            </div>
            <div className="productPage-products-container">
                <div>
                    <ItemList lista={currentItems} />
                </div>
                <div className="productPage-pagination-container">
                    {pages.map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            disabled={page === currentPage}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>

        </section>
    );
}
