import "./Filters.css"
import FilterIcon from "../../assets/filter.svg";
import { useState } from "react";
import closeIcon from "../../assets/close.svg";

export default function Filters({ products, setFilters }) {
    const colors = [
        ...new Set(
            (Array.isArray(products) ? products : [])
                .flatMap((p) => Array.isArray(p?.variants) ? p.variants.map((v) => v?.color).filter(Boolean) : [])
        )
    ];

    const brands = [
        ...new Set(
            (Array.isArray(products) ? products : [])
                .map((p) => p?.brand)
                .filter(Boolean)
        )
    ];

    const sizes = [
        ...new Set(
            (Array.isArray(products) ? products : [])
                .flatMap((p) =>
                    Array.isArray(p?.variants)
                        ? p.variants.flatMap((v) => (Array.isArray(v?.sizes) ? v.sizes : [])).filter(Boolean)
                        : []
                )
        )
    ];

    const [openFilters, setOpenFilters] = useState(false);

    const handleCheckBox = (e) => {
        const { name, value, checked } = e.target;

        setFilters(prev => {
            const currentValues = prev?.[name] ?? [];

            return {
                ...prev,
                [name]: checked
                    ? [...currentValues, value]
                    : currentValues.filter(v => v !== value)
            };
        });
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