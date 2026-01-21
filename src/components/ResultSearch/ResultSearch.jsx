import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import { getProducts } from "../../services/products"
import "./ResultSearch.css"
export default function ResultSearch({ search }) {
    const [products, setProducts] = useState([])
    const [open, setOpen] = useState(false)
    const menuRef = useRef(null)

    useEffect(() => {
        getProducts()
            .then((data) => setProducts(data))
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        if (search?.trim()) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [search]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!search) return null;
    return (
        <>
            {open && (
                <div ref={menuRef} className="result-container">
                    <h4 className="result-title">Products</h4>

                    {products?.filter((p) =>
                        p.name.toLowerCase().includes(search.toLowerCase())
                    )
                        .slice(0, 3)
                        .map((p) => (
                            <Link to={`/detail/${p.id}`} key={p.id} className="product-link" onClick={() => setOpen(false)}>
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
            )}
        </>
    )
}