import { ItemListContainer } from "../ItemListContainer/ItemListContainer.jsx";
import Banner from "../Banner/Banner.jsx";
import CarouselItems from "../CarouselItems/CarouselItems.jsx";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {

    return (
        <section className="Home">
            <Banner
                Titulo="Moda Sostenible"
                Descripcion="Descubre las últimas tendencias en moda sostenible con nuestra nueva colección ecológica." />
            <section className="home-section-1-container">
                <div className="section-1-text-container">
                    <h2 className="section-1-titulo">Our new collection</h2>
                    <p className="section-1-subtitulo">Explore our selection of clothing and accessories designed with recycled materials and ethical processes.</p>
                </div>
                <div className="section-1-imgs-container">
                    {/* si no muestra productos es porque hay que agregarle la colección */}
                    <Link to="/collection/elegant sustainable fashion" >
                        <div className="img-container"></div>
                    </Link>
                    <Link to="/collection/sporty sustainable wear">
                        <div className="img-container"></div>
                    </Link>
                </div>
            </section>
            <section className="home-section-2-container">
                <div className="section-2-content-wrapper">
                    <h2 className="section-2-title">The new of our indumentary</h2>
                    <div className="section-2-itemlist-container">
                        <CarouselItems>
                            <ItemListContainer />
                        </CarouselItems>
                    </div>
                </div>

                <div className="section-2-content-wrapper">
                    <h2 className="section-2-title">Browse by Category</h2>
                    <ul className="section-2-category-container">
                        <li>
                            <Link to="/category?category=clothes&category=shirt">
                                <img src="./assets/shirt-img.png" />
                            </Link>

                        </li>
                        <li>
                            <Link to="/category?category=clothes&category=jacket">
                                <img src="./assets/jacket-img.png" />
                            </Link>

                        </li>
                        <li>
                            <Link to="/category?category=clothes&category=shoes">
                                <img src="./assets/shoes-img.png" />
                            </Link>

                        </li>
                        <li>
                            <Link to="/category?category=accessories&category=cap">
                                <img src="./assets/cap-img.png" />
                            </Link>

                        </li>
                        <li>
                            <Link to="/category?category=accessories&category=bag">
                                <img src="./assets/bag-img.png" />
                            </Link>

                        </li>
                        <li>
                            <Link to="/category?category=accessories&category=watch">
                                <img src="./assets/watches-img.png" />
                            </Link>

                        </li>
                    </ul>
                </div>

                <div className="section-2-content-wrapper">
                    <h2 className="section-2-title">Shop by Season</h2>
                    <div className="season-section">
                        <ul className="season-list">
                            <li className="season-card summer">
                                <Link to="/category?category=season&category=summer">
                                    <h3>Summer</h3>
                                </Link>

                            </li>
                            <li className="season-card fall">
                                <Link to="/category?season=fall">
                                    <h3>Fall</h3>
                                </Link>

                            </li>
                            <li className="season-card winter">
                                <Link to="/category?season=winter">
                                    <h3>Winter</h3>
                                </Link>

                            </li>
                            <li className="season-card spring">
                                <Link to="/category?season=spring">
                                    <h3>Spring</h3>
                                </Link>

                            </li>
                        </ul>
                    </div>

                </div>
            </section>

        </section>
    );
}