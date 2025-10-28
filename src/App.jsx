import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Hero from './components/Header/Hero.jsx'
import Carrito from './components/Carrito/Carrito.jsx';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer.jsx';
import MainApp from './components/Main/MainApp.jsx';
import Contact from './components/Contact/Contact.jsx';
import About from './components/About/About.jsx'
import ItemProvider from './components/Item/ItemContext.jsx';
import CarritoProvider from './components/Carrito/CarritoContext.jsx';
import ItemListContainer from './components/ItemListContainer/ItemListContainer.jsx';

function App() {
  // Estado para manejar la autenticación

  return(
    <ItemProvider>
      <CarritoProvider>
        <Router>
          <Hero/>
          <Routes>
            <Route path="/" element={<MainApp/>}/>
            <Route path="/products/:id" element={<ItemDetailContainer />} />
            <Route path="/carrito" element={<Carrito/>}/>
          </Routes>
        </Router>
      </CarritoProvider>
    </ItemProvider>
  )
}

export default App
