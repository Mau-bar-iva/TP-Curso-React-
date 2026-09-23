import { motion as Motion } from 'framer-motion';
import { ItemListContainer } from '../ItemListContainer/ItemListContainer.jsx';
import Banner from '../Banner/Banner.jsx';
import CarouselItems from '../CarouselItems/CarouselItems.jsx';
import { Link } from 'react-router-dom';

export default function Home() {
    const categoryCards = [
        { to: '/category?category=clothes&category=shirt', img: '/assets/shirt-img.png', label: 'Shirts' },
        { to: '/category?category=clothes&category=jacket', img: '/assets/jacket-img.png', label: 'Jackets' },
        { to: '/category?category=clothes&category=shoes', img: '/assets/shoes-img.png', label: 'Shoes' },
        { to: '/category?category=accessories&category=cap', img: '/assets/cap-img.png', label: 'Caps' },
        { to: '/category?category=accessories&category=bag', img: '/assets/bag-img.png', label: 'Bags' },
        { to: '/category?category=accessories&category=watch', img: '/assets/watches-img.png', label: 'Watches' },
    ];

    const seasonalCards = [
        { label: 'Summer', to: '/category?season=summer', className: 'bg-gradient-to-br from-[#f9d423] to-[#ff4e50]' },
        { label: 'Fall', to: '/category?season=fall', className: 'bg-gradient-to-br from-[#c79081] to-[#dfa579]' },
        { label: 'Winter', to: '/category?season=winter', className: 'bg-gradient-to-br from-[#83a4d4] to-[#b6fbff]' },
        { label: 'Spring', to: '/category?season=spring', className: 'bg-gradient-to-br from-[#a8e063] to-[#56ab2f]' },
    ];

    return (
        <section className="w-full">
            <Banner
                Titulo="Sustainable Fashion"
                Descripcion="Discover the latest trends in sustainable fashion with our new eco-friendly collection."
            />

            <Motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="mx-auto flex w-full max-w-[1400px] flex-col items-center px-4 py-12 sm:px-6 lg:px-10"
            >
                <div className="mb-8 flex flex-col items-center justify-center gap-3 text-center">
                    <h2 className="font-serif text-3xl font-medium text-stone-900 md:text-5xl">Our new collection</h2>
                    <p className="max-w-3xl text-base text-stone-600 md:text-lg">
                        Explore our selection of clothing and accessories designed with recycled materials and ethical processes.
                    </p>
                </div>

                <div className="grid w-full gap-4 md:grid-cols-2">
                    {[
                        { to: '/collection/elegant sustainable fashion', background: '/assets/Home-section-1-pic-1.png', title: 'Elegant sustainable fashion' },
                        { to: '/collection/sporty sustainable wear', background: '/assets/Home-section-1-pic-2.png', title: 'Sporty sustainable wear' },
                    ].map((item, index) => (
                        <Motion.div key={item.to} initial={{ opacity: 0, x: index % 2 === 0 ? -12 : 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }}>
                            <Link to={item.to} className="group relative block h-[420px] overflow-hidden rounded-[26px] md:h-[560px]">
                                <div className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105 group-hover:brightness-75" style={{ backgroundImage: `url(${item.background})` }} />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/15">
                                    <span className="text-center text-2xl font-medium text-white md:text-4xl">{item.title}</span>
                                </div>
                            </Link>
                        </Motion.div>
                    ))}
                </div>
            </Motion.section>

            <section className="mx-auto flex w-full max-w-[1400px] flex-col gap-12 px-4 py-8 pb-16 sm:px-6 lg:px-10">
                <div className="space-y-4">
                    <h2 className="font-serif text-3xl font-medium text-stone-900 md:text-4xl">The new of our indumentary</h2>
                    <CarouselItems>
                        <ItemListContainer orderBy="newest" mode="carousel" />
                    </CarouselItems>
                </div>

                <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-4">
                    <h2 className="font-serif text-3xl font-medium text-stone-900 md:text-4xl">Browse by Category</h2>
                    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
                        {categoryCards.map((item, index) => (
                            <Motion.li
                                key={item.to}
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.06 }}
                                whileHover={{ y: -6 }}
                                className="list-none rounded-[24px] bg-white p-4 shadow-[0_20px_35px_rgba(0,0,0,0.05)] ring-1 ring-stone-200 transition"
                            >
                                <Link to={item.to} className="flex h-[180px] w-full flex-col items-center justify-center gap-3">
                                    <img src={item.img} alt={item.label} className="h-full w-full object-contain" />
                                </Link>
                            </Motion.li>
                        ))}
                    </ul>
                </Motion.div>

                <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-4">
                    <h2 className="font-serif text-3xl font-medium text-stone-900 md:text-4xl">Shop by Season</h2>
                    <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {seasonalCards.map((season, index) => (
                            <Motion.li
                                key={season.label}
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.08 }}
                                whileHover={{ y: -4 }}
                                className="list-none"
                            >
                                <Link
                                    to={season.to}
                                    className={`${season.className} relative flex h-[180px] items-center justify-center overflow-hidden rounded-[24px] shadow-[0_18px_35px_rgba(0,0,0,0.18)] transition`}
                                >
                                    <span className="absolute inset-0 bg-black/20" />
                                    <h3 className="relative z-10 text-3xl font-semibold uppercase tracking-[0.12em] text-white">{season.label}</h3>
                                </Link>
                            </Motion.li>
                        ))}
                    </ul>
                </Motion.div>
            </section>
        </section>
    );
}