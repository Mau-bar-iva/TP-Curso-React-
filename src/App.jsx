import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Hero from './components/Header/Hero.jsx'
import Carrito from './components/Main/Carrito/Carrito.jsx';
import ProductDetail from './components/Main/ProductDetail/ProductDetail.jsx';
import Contact from './components/Main/Contact/Contact.jsx'
import MainApp from './components/Main/MainApp.jsx';
import ProductProvider from './components/Main/Product/ProductContext.jsx';
import CarritoProvider from './components/Main/Carrito/CarritoContext.jsx';
import About from './components/Main/About/About.jsx';
import Home from './components/Main/home/Home.jsx';

function App() {
  // Estado para manejar la autenticación

  return(
    <ProductProvider>
      <CarritoProvider>
        <Router>
          <Hero/>
          <MainApp/>
          <Routes>
            <Route path="/section-home" element={<Home/>}/>
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/carrito" element={<Carrito/>}/>
          </Routes>
        </Router>
      </CarritoProvider>
    </ProductProvider>
  )
}

export default App
