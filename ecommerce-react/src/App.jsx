import React, { useState, useEffect } from 'react'
import ProductList from './components/ProductList'
import Cart from './components/Cart'

export default function App() {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    // load cart from localStorage
    const saved = localStorage.getItem('cart')
    if (saved) setCartItems(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  function addToCart(product, qty = 1) {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i)
      }
      return [...prev, { ...product, qty }]
    })
  }

  function updateQty(id, qty) {
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i).filter(i => i.qty > 0))
  }

  function clearCart() {
    setCartItems([])
  }

  return (
    <div className="app">
      <header className="header">
        <center></center>
        <h1>Jonas E-Commerce Shop</h1>
        <Cart items={cartItems} updateQty={updateQty} clearCart={clearCart} />
      </header>
      <main>
        <ProductList addToCart={addToCart} />
      </main>
      <footer className="footer">Built for Midterm - Demo Shop</footer>
    </div>
  )
}
