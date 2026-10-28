import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { AuthProvider } from "./context/AuthContext/AuthProvider.jsx";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import ProductPage from "./components/ProductPage/ProductPage.jsx";
import { CartProvider } from "./context/CartContext/CartProvider";
import { Cart } from "./components/Cart/Cart";
import { FavoriteProvider } from "./context/FavoriteContext/FavoriteProvider.jsx";
import Favorite from "./components/Favorite/Favorite.jsx";
import RutaProtegida from "./components/RutaProtegida/RutaProtegida.jsx";
import { MainLayout } from "./layouts/MainLayout";
import { AdminLayout } from "./layouts/AdminLayout.jsx";
import Home from "./components/Home/Home.jsx";
import OffersPage from "./components/OffersPage/OffersPage.jsx";
import CheckoutSuccessPage from "./components/CheckoutSuccess/CheckoutSuccessPage.jsx";

const Login = lazy(() => import("./components/Login/Login.jsx"));
const ProductFormContainer = lazy(async () => {
  const module = await import("./components/AdminComponents/ProductFormContainer/ProductFormContainer.jsx");
  return { default: module.ProductFormContainer };
});

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <CartProvider>
          <FavoriteProvider>
            <Routes>
              <Route element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="/offers" element={<OffersPage />} />
                <Route path="/category" element={<ProductPage type="category" />} />
                <Route path="/collection/:collection" element={<ProductPage type="collection" />} />
                <Route path="/detail/:id" element={<ItemDetailContainer />} />
                <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
                <Route
                  path="/favorite"
                  element={
                    <RutaProtegida>
                      <Favorite />
                    </RutaProtegida>
                  }
                />
                <Route path="/carrito" element={<Cart />} />
              </Route>

              <Route path="/admin" element={<AdminLayout />}>
                <Route
                  index
                  element={
                    <Suspense fallback={<div className="flex min-h-[40vh] items-center justify-center text-sm uppercase tracking-[0.2em] text-stone-500">Cargando panel…</div>}>
                      <Login />
                    </Suspense>
                  }
                />
                <Route
                  path="alta-productos"
                  element={
                    <Suspense fallback={<div className="flex min-h-[40vh] items-center justify-center text-sm uppercase tracking-[0.2em] text-stone-500">Cargando panel…</div>}>
                      <RutaProtegida role="admin">
                        <ProductFormContainer />
                      </RutaProtegida>
                    </Suspense>
                  }
                />
              </Route>
            </Routes>
          </FavoriteProvider>
        </CartProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;