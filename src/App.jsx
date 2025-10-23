import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Hero from './components/Header/Hero.jsx'
import Carrito from './components/Main/Carrito/Carrito.jsx';
import ProductDetailContainer from './components/Main/ProductDetailContainer/ProductDetailContainer.jsx';
import MainApp from './components/Main/MainApp.jsx';
import Contact from './components/Main/Contact/Contact.jsx';
import About from './components/Main/About/About.jsx'
import ProductProvider from './components/Main/Product/ProductContext.jsx';
import CarritoProvider from './components/Main/Carrito/CarritoContext.jsx';
import ProductListContainer from './components/Main/ProductListContainer/ProductListContainer.jsx';

function App() {
  // Estado para manejar la autenticación

  return(
    <ProductProvider>
      <CarritoProvider>
        <Router>
          <Hero/>
          <Routes>
            <Route path="/" element={<MainApp/>}/>
            <Route path="/products/:id" element={<ProductDetailContainer />} />
            <Route path="/carrito" element={<Carrito/>}/>
          </Routes>
        </Router>
      </CarritoProvider>
    </ProductProvider>
  )
}

export default App
