import React, { useState } from 'react'

export default function ProductDetails({ product, onClose, addToCart }) {
  const [qty, setQty] = useState(1)
  const images = product?.images || (product?.thumbnail ? [product.thumbnail] : [])
  const title = product?.title || 'Product'
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="detail-grid">
          <div className="gallery">
            {images.length > 0 ? images.slice(0,4).map((src,i)=> <img key={i} src={src} alt={title} />) : <img src="https://via.placeholder.com/300x200?text=No+Image" alt="No image" />}
          </div>
          <div className="info">
            <h2>{title}</h2>
            <p className="brand">{product?.brand || 'Unknown'} • {product?.category || 'Uncategorized'}</p>
            <p className="desc">{product?.description || ''}</p>
            <div className="price-row">
              <span className="price">${product?.price ?? '0'}</span>
              {product?.discountPercentage > 0 && <span className="discount">-{product.discountPercentage}%</span>}
            </div>
            <div className="meta">Rating: {product?.rating ?? 'N/A'} • Stock: {product?.stock ?? 'N/A'}</div>
            <div className="buy">
              <input type="number" min="1" max={product?.stock ?? 1} value={qty} onChange={e=>setQty(Number(e.target.value))} />
              <button onClick={()=>{addToCart(product, qty); onClose()}}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
