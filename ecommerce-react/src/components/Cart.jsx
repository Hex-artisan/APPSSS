import React, { useState } from 'react'

export default function Cart({ items, updateQty, clearCart }) {
  const [open, setOpen] = useState(false)
  const total = items.reduce((s,i)=>s + i.price * i.qty, 0)

  function checkout() {
    // simple checkout simulation
    alert(`Checkout - Total: $${total.toFixed(2)}. Thank you!`)
    clearCart()
    setOpen(false)
  }

  return (
    <div className="cart">
      <button onClick={()=>setOpen(!open)}>Cart ({items.length})</button>
      {open && (
        <div className="cart-panel">
          {items.length === 0 ? <p>Your cart is empty</p> : (
            <>
              <ul>
                {items.map(i=> {
                  const img = i && (i.thumbnail || (i.images && i.images[0]))
                  return (
                  <li key={i.id}>
                    <img src={img || 'https://via.placeholder.com/80x80?text=No+Image'} alt={i?.title || 'Item'} />
                    <div>
                      <strong>{i?.title || 'Item'}</strong>
                      <div>${i?.price ?? '0'} × <input type="number" value={i.qty} min="1" max="99" onChange={e=>updateQty(i.id, Number(e.target.value))} /></div>
                    </div>
                  </li>
                  )
                })}
              </ul>
              <div className="cart-summary">
                <div>Total: <strong>${total.toFixed(2)}</strong></div>
                <div className="cart-actions"><button onClick={checkout}>Checkout</button> <button onClick={clearCart}>Clear</button></div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
