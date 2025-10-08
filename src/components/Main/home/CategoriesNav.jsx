import React from 'react';
import './CategoriesNav.css';
import { Link } from 'react-router-dom'

function CategoriesNav() {
    return(
        <nav className="categories-nav">
            <ul className='categories-list'>
                <li className='categories-list-item'>
                    <Link to={"/category/jacket"}>
                        <button className='list-item-btn'>
                            <img src="assets/jacket-img.png" className="list-item-img" alt="Jacket" />
                        </button>
                        <span>Jacket</span>
                    </Link>
                </li>
                <li className='categories-list-item'>
                    <Link to={"/category/shirt"}>
                        <button className='list-item-btn'>
                            <img src="assets/shirt-img.png" className="list-item-img" alt="Shirt" />
                        </button>
                        <span>Shirt</span>
                
                    </Link>
                </li>
                <li className='categories-list-item'>
                    <Link to={"/category/jeans"}>
                        <button className='list-item-btn'>
                            <img src="assets/jeans-img.png" className="list-item-img" alt="Jeans" />
                        </button>
                        <span>Jeans</span>
                    </Link>
                </li>
                <li className='categories-list-item'>
                    <Link to={"/category/bag"}>
                        <button className='list-item-btn'>
                            <img src="assets/bag-img.png" className="list-item-img" alt="Bag" />
                        </button>
                        <span>Bag</span>
                    </Link>
                </li>
                <li className='categories-list-item'>
                    <Link to={"/category/shoes"}>
                        <button className='list-item-btn'>
                            <img src="assets/shoes-img.png" className="list-item-img" alt="Shoes" />
                        </button>
                        <span>Shoes</span>
                    </Link>
                </li>
                <li className='categories-list-item'>
                    <Link to={"/category/watches"}>
                        <button className='list-item-btn'>
                            <img src="assets/watches-img.png" className="list-item-img" alt="Watches" />
                        </button>
                        <span>Watches</span>
                    </Link>
                </li>
                <li className='categories-list-item'>
                    <Link to={"/category/cap"}>
                        <button className='list-item-btn'>
                            <img src="assets/cap-img.png" className="list-item-img" alt="Cap" />
                        </button>
                        <span>Cap</span>
                    </Link>
                </li>
                <li className='categories-list-item'>
                    <Link to={"/category/allcategories"}>
                        <button className='list-item-btn'>
                            <img src="assets/category_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" className="list-item-img" alt="All Categories" />
                        </button>
                        <span>All Categories</span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default CategoriesNav;