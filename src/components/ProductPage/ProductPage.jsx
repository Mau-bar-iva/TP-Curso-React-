import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProducts } from "../../services/products";
import { ItemList } from "../ItemList/ItemList.jsx";
import Filters from "../FIlters/Filters.jsx"
import "./ProductPage.css"

export default function CategoryPage() {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 12

    const startIndex = (currentPage - 1) * itemsPerPage
    const enIndex = startIndex + itemsPerPage

    const pageCount = Math.ceil(products.length / itemsPerPage)
    const pages = Array.from({ length: pageCount }, (_, i) => i + 1)


    useEffect(() => {
        getProducts(category)
            .then((data) => { setProducts(data); })
            .catch((error) => { console.error(error); });
    }, [category]);

    const currentitems = products.slice(startIndex, enIndex)

    return (
        <section className="productPage-container">
            <div className="productPage-title-container">
                <h3>{category}</h3>
            </div>
            <div className="productPage-filters-container">
                <h5>Filters</h5>
                <Filters products={products} />
            </div>
            <div className="productPage-products-container">
                <div>
                    <ItemList lista={currentitems} />
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
