import "./Filters.css"

export default function Filters({ products, setFilters }) {
    const colors = [...new Set(products.map(p => p.variants[0].color))];
    const brands = [...new Set(products.map(p => p.brand))];
    const sizes = [...new Set(products.map(p => p.variants[0].sizes[0]))];

    const handleCheckBox = (e) => {
        const { name, value, checked } = e.target;

        setFilters(prev => ({
            ...prev,
            [name]: checked
                ? [...prev[name], value]
                : prev[name].filter(v => v !== value)
        }));
    }

    return (
        <aside className="aside-filters-container">
            <ul className="filters-container">
                <h5 className="filters-title">Colors</h5>
                {colors.map((c, index) => (
                    <li key={index} className="filters-item">
                        <input type="checkbox" name="color" value={c} onChange={handleCheckBox} />
                        {c}
                    </li>))}
            </ul>

            <ul className="filters-container">
                <h5 className="filters-title">Brands</h5>
                {brands.map((b, index) => (
                    <li key={index} className="filters-item">
                        <input type="checkbox" name="brand" value={b} onChange={handleCheckBox} />
                        {b}
                    </li>))}
            </ul>

            <ul className="filters-container">
                <h5 className="filters-title">Sizes</h5>
                {sizes.map((s, index) => (
                    <li key={index} className="filters-item">
                        <input type="checkbox" name="sizes" value={s} onChange={handleCheckBox} />
                        {s}
                    </li>))}
            </ul>

        </aside>
    )
}