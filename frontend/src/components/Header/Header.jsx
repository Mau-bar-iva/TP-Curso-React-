import { Nav } from '../Nav/Nav.jsx';
import { Link } from 'react-router-dom';

export function Header() {
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    return (
        <header className="fixed left-0 top-0 z-[1000] w-full border-b border-stone-200 bg-white/90 shadow-[0_2px_14px_rgba(34,29,23,0.06)] backdrop-blur-sm">
            <div className="mx-auto flex h-[90px] w-full max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
                <div className="flex min-w-0 flex-1 items-center justify-start">
                    <Link to="/" onClick={scrollToTop} className="flex items-center">
                        <img src="/assets/logo.png" alt="logo-ModeaVelour" className="h-[50px] w-auto object-contain" />
                    </Link>
                </div>

                <div className="flex items-center justify-end">
                    <Nav />
                </div>
            </div>
        </header>
    );
}
