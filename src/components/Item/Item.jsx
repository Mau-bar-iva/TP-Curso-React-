import './Item.css'

export default function Item({ id, name, price, description, imageUrl, children}){
    return(
        <article id={id} className="product-item">
            <div className="product-img-container">
                <img src={imageUrl} alt={description} className="product-img" />
            </div>
            <div className="product-info">
                <h2 className="product-title">{name}</h2>
                <p>Precio: ${price}</p>
                <p className='product-descripcion'>{description}</p>
                {children}
            </div>
        </article>
    )
}