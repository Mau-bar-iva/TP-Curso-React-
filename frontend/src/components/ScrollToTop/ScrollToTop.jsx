import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scrolls to top on route change. Skips when navigating to Home ('/')
export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        if (pathname === '/') return; // keep Home as-is
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [pathname]);

    return null;
}
