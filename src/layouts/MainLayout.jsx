import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";

export const MainLayout = () => {
    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", minWidth: "100vw" }}>
            <Header />
            <main id="home" style={{ flex: 1, paddingTop: "90px", marginBottom: "90px" }}>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}