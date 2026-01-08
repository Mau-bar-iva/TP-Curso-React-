import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getProducts } from "../../services/products"
import "./ResultSearch.css"
export default function ResultSearch({ search }) {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts()
            .then((data) => setProducts(data))
            .catch((err) => console.log(err))
    }, [])

    if (!search) return null;

    return (
        <div className="result-container">
            <h4 className="result-title">Products</h4>
            {products?.filter((p) =>
                p.name.toLowerCase().includes(search.toLowerCase())
            )
                .slice(0, 3)
                .map((p) => (
                    <Link to={`/detail/${p.id}`} key={p.id} className="product-link">
                        <article className="result-product">
                            <img src={p.imageUrl} alt="" className="product-img" />
                            <div className="product-info">
                                <h5 className="product-category">{p.category}</h5>
                                <h4 className="product-name">{p.name}</h4>
                                <p className="product-price">${p.price}</p>
                            </div>
                        </article>
                    </Link>

                ))}
            <Link to={"/"}>
                <p className="result-all">Ver todo "{search}"</p>
            </Link>
        </div>
    )
}