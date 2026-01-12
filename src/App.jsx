import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext/AuthProvider.jsx";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import ProductPage from "./components/ProductPage/ProductPage.jsx";
import { CartProvider } from "./context/CartContext/CartProvider";
import { Cart } from "./components/Cart/Cart";
import { FavoriteProvider } from "./context/FavoriteContext/FavoriteProvider.jsx";
import Favorite from "./components/Favorite/Favorite.jsx";
import { ProductFormContainer } from "./components/AdminComponents/ProductFormContainer/ProductFormContainer";
import RutaProtegida from "./components/RutaProtegida/RutaProtegida.jsx";
import Login from "./components/Login/Login.jsx";
import { MainLayout } from "./layouts/MainLayout";
import { AdminLayout } from "./layouts/AdminLayout.jsx";
import Home from "./components/Home/Home.jsx";
import OffersPage from "./components/OffersPage/OffersPage.jsx"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <CartProvider>
          <FavoriteProvider>
            {/* Dejamos fuera del Routes lo que queremos que no se vuelva a renderizar al navegar */}
            <Routes>
              <Route element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route
                  path="/offers"
                  element={<OffersPage />}
                />
                <Route
                  path="/category/:category"
                  element={<ProductPage />}
                />
                <Route
                  path="/detail/:id"
                  element={<ItemDetailContainer />} />
                <Route
                  path="/favorite"
                  element={
                    <RutaProtegida>
                      <Favorite />
                    </RutaProtegida>} />
                <Route
                  path="/carrito"
                  element={
                    <RutaProtegida>
                      <Cart />
                    </RutaProtegida>
                  }
                />
              </Route>

              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Login />}></Route>
                <Route path="alta-productos"
                  element={
                    <RutaProtegida role="admin">
                      <ProductFormContainer />
                    </RutaProtegida>
                  } />
              </Route>
            </Routes>
            {/* Dejamos fuera del Routes lo que queremos que no se vuelva a renderizar al navegar */}
          </FavoriteProvider>
        </CartProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;