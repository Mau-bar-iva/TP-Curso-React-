import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";

export const MainLayout = () => {
    return (
        <div className="flex min-h-screen min-w-full flex-col bg-[#f7f4ef] text-stone-900">
            <Header />
            <main id="home" className="flex-1 pt-[90px] pb-[90px] min-h-[620px]">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};