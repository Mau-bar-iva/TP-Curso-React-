import { getProducts } from "../../services/products"
import { useEffect, useState } from "react"
import { Item } from "../Item/Item.jsx"
export default function OffersPage() {
    const [products, setProducts] = useState()

    useEffect(() => {
        getProducts()
            .then((data) => setProducts(data))
            .catch((error) => { console.error(error); });
    }, [])

    return (
        <div>
            {products && (
                products.map((product) => (
                    <Item {...product} />
                ))
            )}
        </div>
    )
}