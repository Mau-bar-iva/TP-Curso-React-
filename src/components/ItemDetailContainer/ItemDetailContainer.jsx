import { ItemContext } from '../Item/ItemContextDef.jsx';
//import { useContext } from 'react';
import { useEffect, useState } from 'react';
import ItemDetail from '../ItemDetail/ItemDetail.jsx'
import { useParams } from 'react-router-dom';
import './ItemDetailContainer.css'
import ItemList from '../ItemList/ItemList.jsx';


const ItemDetailContainer = () => {
    //const { products, cargando, error} = useContext(ItemContext);
    const [detail, setDetail] = useState({});

    const { id } = useParams()

    // Manejo de estados de carga y error al obtener productos
    //if(cargando) return <p>Cargando productos...</p>
    //if(error) return <p>{error}</p>
//
    //if(!products){
    //    return <h1>No existen productos</h1>
    //}
//
    //const productDetail = products.find(p => p.id.toString() === id) //buscamos el producto que tenga el mismo id que el de la url product/id
    //if(!productDetail) return <p>Producto no encontrado</p>

    useEffect(() => {
    fetch('https://68cda302da4697a7f30695ae.mockapi.io/productos')
      .then((res) => {
        if (!res.ok) {
          throw new Error("No se encontro el producto");
        }

        return res.json();
      })
      .then((data) => {
        const found = data.find((p) => p.id === id); //Usamos el param para comparar el id del producto en el json
        if (found) {
          setDetail(found);
        } else {
          throw new Error("Producto no encontrado");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

    return(
        <main>
            {Object.keys(detail).length ? (
                <ItemDetail detail={detail} />
            ) : (
                <p>Cargando...</p>
            )}
        </main>
        //<section className='section-product-detail'>
        //    <div className='product-detail-container'>
        //        {products.length ? (
        //            <ItemDetail detail={productDetail}/>
        //            ): (
        //                <p>Cargando...</p>
        //            )
        //        }
        //    </div>
        //    <div className='products-detail-container'>
        //        <h2 className='products-title'>You may also be interested in:</h2>
        //        <div className="products-carousel-container">
        //            <ItemList list={products.filter(p => p.id !== productDetail.id)} />
        //        </div>
        //    </div>
        //</section>
    )
}

export default ItemDetailContainer