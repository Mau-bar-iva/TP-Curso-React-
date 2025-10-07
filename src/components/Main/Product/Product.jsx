import './Product.css'

export default function Product({ id, name, price, description, imageUrl, children}){
    return(
        <article if={id} className="product-item">
            <div className="product-img-container">
                <img src={imageUrl} alt={id} className="product-img" />
            </div>
            <div className="product-info">
                <h1 className="product-title">{name}</h1>
                <p className='product-descripcion'>{description}</p>
                <span className="product-precio">${price}</span>
                {children}
            </div>
        </article>
    )
}