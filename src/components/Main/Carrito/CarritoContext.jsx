import React, { useState } from 'react';
import { CarritoContext } from './CarritoContextDef.jsx';

export default function CarritoProvider({ children }) {
    const [carritoCompra, setCarritoCompra] = useState([]);
    
    return (
        <CarritoContext.Provider value={{ carritoCompra, setCarritoCompra }}>
            {children}
        </CarritoContext.Provider>
    );
}