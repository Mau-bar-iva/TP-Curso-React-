export const Footer = () => {
  return (
    <footer className="border-t border-stone-200 bg-[#f8f4f0] text-stone-700">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:grid-cols-3 md:px-8 lg:px-10">
        <div className="space-y-2">
          <h4 className="font-serif text-2xl text-stone-900">Modea Velour</h4>
          <p className="text-sm">Moda, estilo y calidad.</p>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">Contacto</h4>
          <p className="text-sm">Email: contacto@modeavelour.com</p>
          <p className="text-sm">Tel: +54 11 5555-5555</p>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">Redes</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:text-stone-900">Instagram</a></li>
            <li><a href="#" className="hover:text-stone-900">Facebook</a></li>
          </ul>
        </div>
      </div>

      <p className="border-t border-stone-200 bg-white/40 px-4 py-4 text-center text-xs uppercase tracking-[0.18em] text-stone-500 md:text-sm">
        © {new Date().getFullYear()} Modea Velour — Page has been created for me.
      </p>
    </footer>
  );
};