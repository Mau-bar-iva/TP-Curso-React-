import { ItemListContainer } from "../ItemListContainer/ItemListContainer.jsx";
import Banner from "../Banner/Banner.jsx";
import CarouselItems from "../CarouselItems/CarouselItems.jsx";
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
                    <div className="img-container">
                    </div>
                    <div className="img-container">
                    </div>
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
                            <img src="./assets/shirt-img.png" />
                        </li>
                        <li>
                            <img src="./assets/jacket-img.png" />
                        </li>
                        <li>
                            <img src="./assets/shoes-img.png" />
                        </li>
                        <li>
                            <img src="./assets/cap-img.png" />
                        </li>
                        <li>
                            <img src="./assets/bag-img.png" />
                        </li>
                        <li>
                            <img src="./assets/watches-img.png" />
                        </li>
                    </ul>
                </div>

                <div className="section-2-content-wrapper">
                    <h2 className="section-2-title">Shop by Season</h2>
                    <div className="season-section">
                        <ul className="season-list">
                            <li className="season-card summer">
                                <h3>Summer</h3>
                            </li>
                            <li className="season-card fall">
                                <h3>Fall</h3>
                            </li>
                            <li className="season-card winter">
                                <h3>Winter</h3>
                            </li>
                            <li className="season-card spring">
                                <h3>Spring</h3>
                            </li>
                        </ul>
                    </div>

                </div>
            </section>

        </section>
    );
}