import React, { useEffect, useState } from 'react'
import { ProductContext } from './ProductContextDef'

export default function ProductProvider({ children }) {
    const [products, setProducts] = useState([])  // Estado para almacenar los productos
    const [cargando, setCargando] = useState(true) // Estado para manejar la carga
    const [error, setError] = useState(null) // Estado para manejar errores

    // Llamada a la API para obtener los productos
    useEffect(()=>{
      fetch('https://68cda302da4697a7f30695ae.mockapi.io/productos')
        .then((respuesta)=>{
          if(!respuesta.ok){
            throw new Error("No se encontró el producto")
          }
          return respuesta.json()
        })
        .then((datos)=>{
          const found = datos.find((p)=>p.id === "3")
          if(found){
            setProducts(datos)
            setCargando(false)
          }else{
            throw new Error("producto no encontrado")
          }
          
        })
        .catch((error)=>{
          setError('Error al cargar productos. Inténtalo más tarde', error)
          setCargando(false)
        })
    },[])

    return(
        <ProductContext.Provider value={{ products, cargando, error }}>
            {children}
        </ProductContext.Provider>
    )
}