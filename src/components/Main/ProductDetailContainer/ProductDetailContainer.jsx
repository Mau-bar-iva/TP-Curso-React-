import { ProductContext } from '../Product/ProductContextDef.jsx';
import { useContext } from 'react';
import ProductDetail from '../ProductDetail/ProductDetail.jsx'
import { useParams } from 'react-router-dom';
import './ProductDetailContainer.css'
import ProductList from '../ProductList/ProductList.jsx';


const ProductDetailContainer = () => {
    const { products, cargando, error} = useContext(ProductContext);
    const { id } = useParams()

    // Manejo de estados de carga y error al obtener productos
    if(cargando) return <p>Cargando productos...</p>
    if(error) return <p>{error}</p>

    if(!products){
        return <h1>No existen productos</h1>
    }

    const productDetail = products.find(p => p.id.toString() === id) //buscamos el producto que tenga el mismo id que el de la url product/id
    if(!productDetail) return <p>Producto no encontrado</p>

    return(
        <section className='section-product-detail'>
            <div className='product-detail-container'>
                {products.length ? (
                    <ProductDetail detail={productDetail}/>
                    ): (
                        <p>Cargando...</p>
                    )
                }
            </div>
            <div className='products-detail-container'>
                <h2 className='products-title'>You may also be interested in:</h2>
                <div className="products-carousel-container">
                    <ProductList list={products.filter(p => p.id !== productDetail.id)} />
                </div>
            </div>
        </section>
    )
}

export default ProductDetailContainer