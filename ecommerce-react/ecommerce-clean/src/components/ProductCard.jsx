import React from 'react'

export default function ProductCard({ product, addToCart }) {
  const img = product?.thumbnail || (product?.images && product.images[0]) || ''
  return (
    <div className="card">
      {img ? <img src={img} alt={product.title} /> : <div style={{height:160,background:'#f3f4f6',borderRadius:6}} />}
      <h3>{product.title}</h3>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <strong>${product.price}</strong>
        <button className="btn" onClick={() => addToCart(product, 1)}>Add</button>
      </div>
    </div>
  )
}
