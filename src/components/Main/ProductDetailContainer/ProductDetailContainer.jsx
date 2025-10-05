import { ProductContext } from '../Product/ProductContextDef.jsx';
import { useContext } from 'react';
import ProductDetail from '../ProductDetail/ProductDetail.jsx'

const ProductDetailContainer = () => {
    const { productos, cargando, error} = useContext(ProductContext);

    // Manejo de estados de carga y error al obtener productos
    if(cargando) return <p>Cargando productos...</p>
    if(error) return <p>{error}</p>

    if(!productos){
        return <h1>No existen productos</h1>
    }

    return(
        <main>
            {Object.keys(productos).length ? (
                <ProductDetail detail={productos}/>
                ): (
                    <p>Cargando...</p>
                )
            }
        </main>
    )
}

export default ProductDetailContainer