import { useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Banner({ Titulo = '', Descripcion = '' }) {
  const imagenes = ['/assets/slide1.png', '/assets/slide2.png', '/assets/slide3.png'];
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndice((prev) => (prev + 1) % imagenes.length);
    }, 3000);

    return () => clearInterval(intervalo);
  }, [imagenes.length]);

  return (
    <section className="relative h-[92vh] w-full overflow-hidden bg-stone-900">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-[-10%] scale-110 bg-cover bg-center blur-[50px] transition-all duration-500"
          style={{ backgroundImage: `url(${imagenes[indice]})` }}
        />
        <img src={imagenes[indice]} alt={Titulo} className="relative z-10 h-full w-full object-cover brightness-75" />
      </div>

      <div className="relative z-20 flex h-full items-center pl-6 sm:pl-12 md:pl-20">
        <div className="max-w-md space-y-4 text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.7)]">
          <Motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="text-xl font-medium uppercase tracking-[0.18em] text-stone-100"
          >
            {Titulo}
          </Motion.p>
          <Motion.h3
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
            className="text-3xl font-bold leading-tight md:text-5xl"
          >
            {Descripcion}
          </Motion.h3>
          <Motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16, ease: 'easeOut' }}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link to="/offers" className="inline-block">
              <button
                type="button"
                className="mt-3 rounded-full border border-white/30 bg-black px-6 py-3 text-sm font-medium uppercase tracking-[0.2em] text-white transition-all duration-200 hover:bg-[#e6d3bb] hover:text-black"
              >
                Explore products
              </button>
            </Link>
          </Motion.div>
        </div>
      </div>
    </section>
  );
}

export default Banner;