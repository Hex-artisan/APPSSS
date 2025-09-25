import React, { useState, useEffect } from 'react'
import ProductList from './components/ProductList'

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart') || '[]')
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(product, qty = 1) {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id)
      if (existing) {
        return prev.map(p => (p.id === product.id ? { ...p, qty: p.qty + qty } : p))
      }
      return [...prev, { ...product, qty }]
    })
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Ecommerce Clean</h1>
      </header>

      <main>
        <ProductList addToCart={addToCart} />
      </main>

      <footer className="footer">Made with React + Vite</footer>
    </div>
  )
}
