import React from 'react'

export default function ProductCard({ product, onView, addToCart }) {
  const img = product && (product.thumbnail || (product.images && product.images[0]))
  const title = product?.title || 'Product'
  return (
    <article className="card">
      <img src={img || 'https://via.placeholder.com/300x200?text=No+Image'} alt={title} />
      <div className="card-body">
        <h3>{title}</h3>
        <p className="brand">{product?.brand || 'Unknown'} • {product?.category || 'Uncategorized'}</p>
        <div className="price-row">
          <span className="price">${product?.price ?? '0'}</span>
          {product?.discountPercentage > 0 && <span className="discount">-{product.discountPercentage}%</span>}
        </div>
        <div className="meta">Rating: {product?.rating ?? 'N/A'} • Stock: {product?.stock ?? 'N/A'}</div>
        <div className="actions">
          <button onClick={()=>onView(product)}>View</button>
          <button onClick={()=>addToCart(product,1)}>Add</button>
        </div>
      </div>
    </article>
  )
}
