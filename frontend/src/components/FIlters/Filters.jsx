import "./Filters.css"
import FilterIcon from "../../assets/filter.svg";
import { useState } from "react";
import closeIcon from "../../assets/close.svg";

export default function Filters({ products, setFilters }) {
    const colors = [...new Set(products.map(p => p.variants[0].color))];
    const brands = [...new Set(products.map(p => p.brand))];
    const sizes = [...new Set(products.map(p => p.variants[0].sizes[0]))];
    const [openFilters, setOpenFilters] = useState(false);

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


            <div className="filters-menu">
                <button className="filters-menu-btn" onClick={() => setOpenFilters(!openFilters)}>
                    <img src={FilterIcon} alt="menu-icon" className="filters-menu-icon" />
                    <h5 className="filters-menu-btn-title">Filters</h5>
                </button>
            </div>

            <div className={`filters-options-container ${openFilters ? 'open-filters' : ''}`}>
                <div className="filters-options-header">
                    <h5 className="filters-options-title">Filters</h5>
                    {openFilters && (
                        <button className="filters-menu-btn-close">
                            <img src={closeIcon} alt="close-icon" className="filters-close-icon" onClick={() => setOpenFilters(!openFilters)} />
                        </button>
                    )}
                </div>
                <ul className="filters-container">
                    <h5 className="filters-title">Colors</h5>
                    {colors.map((c, index) => (
                        <li key={index} className="filters-item">
                            <input type="checkbox" name="color" value={c} onChange={handleCheckBox} className="filter-option-checkbox" />
                            {c}
                        </li>))}
                </ul>

                <ul className="filters-container">
                    <h5 className="filters-title">Brands</h5>
                    {brands.map((b, index) => (
                        <li key={index} className="filters-item">
                            <input type="checkbox" name="brand" value={b} onChange={handleCheckBox} className="filter-option-checkbox" />
                            {b}
                        </li>))}
                </ul>

                <ul className="filters-container">
                    <h5 className="filters-title">Sizes</h5>
                    {sizes.map((s, index) => (
                        <li key={index} className="filters-item">
                            <input type="checkbox" name="sizes" value={s} onChange={handleCheckBox} className="filter-option-checkbox" />
                            {s}
                        </li>))}
                </ul>
            </div>


        </aside>
    )
}