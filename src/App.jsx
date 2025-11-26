import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Footer } from "./components/Footer/Footer.jsx";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { CartProvider } from "./context/CartContext/CartProvider";
import { Cart } from "./components/Cart/Cart";
import { ProductFormContainer } from "./components/AdminComponents/ProductFormContainer/ProductFormContainer";
import RutaProtegida from "./components/RutaProtegida/RutaProtegida.jsx";
import Login from "./components/Login/Login.jsx";
import { MainLayoout } from "./layouts/MainLayout.jsx";
import { AdminLayout } from "./layouts/Adminlayout.jsx";
import Banner from "./components/Banner/Banner.jsx";
function App() {
  return (
    <BrowserRouter>
        <CartProvider>
          {/* Dejamos fuera del Routes lo que queremos que no se vuelva a renderizar al navegar */}
          <Routes>
            <Route element={<MainLayoout/>}>
              <Route
                path="/"
                element={
                  <>
                    <Banner 
                      Titulo="Moda Sostenible" 
                      Descripcion="Descubre las últimas tendencias en moda sostenible con nuestra nueva colección ecológica." />
                    <ItemListContainer 
                      titulo={"Bienvenidos"} />
                  </>
                  }
              />
              <Route
                path="/category/:category"
                element={<ItemListContainer titulo={"Bienvenidos"} />}
              />
              <Route path="/detail/:id" element={<ItemDetailContainer />} />
              <Route path="/carrito" element={<Cart />} />
            </Route>
            
            <Route path="/admin" element={<AdminLayout/>}>
              <Route index element={<Login/>}></Route>
              <Route path="alta-productos"
                element={
                  <RutaProtegida>
                    <ProductFormContainer/>
                  </RutaProtegida>
                }/>
            </Route>
          </Routes>
          {/* Dejamos fuera del Routes lo que queremos que no se vuelva a renderizar al navegar */}
          <Footer/>
        </CartProvider>
    </BrowserRouter>
  );
}

export default App;