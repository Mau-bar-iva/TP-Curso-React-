import "./Filters.css"

export default function Filters({ products }) {
    const colors = [...new Set(products.map(p => p.color))];
    const brands = [...new Set(products.map(p => p.brand))];
    const sizes = [...new Set(products.map(p => p.size))];


    return (
        <aside className="aside-filters-container">
            <ul className="filters-container">
                <h5 className="filters-title">Colors</h5>
                {colors.map((c) => (
                    <li className="filters-item">
                        <input type="checkbox" />
                        {c}
                    </li>))}
            </ul>

            <ul className="filters-container">
                <h5 className="filters-title">Brands</h5>
                {brands.map((b) => (
                    <li className="filters-item">
                        <input type="checkbox" />
                        {b}
                    </li>))}
            </ul>

            <ul className="filters-container">
                <h5 className="filters-title">Sizes</h5>
                {sizes.map((s) => (
                    <li className="filters-item">
                        <input type="checkbox" />
                        {s}
                    </li>))}
            </ul>

        </aside>
    )
}