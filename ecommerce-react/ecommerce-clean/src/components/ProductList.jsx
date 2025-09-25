import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

export default function ProductList({ addToCart }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const [displayQuery, setDisplayQuery] = useState('')

  useEffect(() => {
    let mounted = true
    fetch('https://dummyjson.com/products?limit=100')
      .then(res => res.json())
      .then(data => {
        if (!mounted) return
        setProducts(data.products || [])
        setLoading(false)
      })
      .catch(err => {
        if (!mounted) return
        setError(err.message || 'Failed to load')
        setLoading(false)
      })
    return () => (mounted = false)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setQuery(displayQuery.trim()), 1000)
    return () => clearTimeout(t)
  }, [displayQuery])

  const filtered = products.filter(p => {
    if (!query) return true
    const q = String(query).toLowerCase()
    const title = String(p.title || p.name || '').toLowerCase()
    const brand = String(p.brand || '').toLowerCase()
    return title.includes(q) || brand.includes(q)
  })

  if (loading) return <div className="container">Loading...</div>
  if (error) return <div className="container">Error: {error}</div>

  return (
    <div className="container">
      <div style={{ marginBottom: 12 }}>
        <input
          className="input"
          placeholder="Search products..."
          value={displayQuery}
          onChange={e => setDisplayQuery(e.target.value)}
        />
      </div>

      <div className="grid">
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} addToCart={addToCart} />
        ))}
      </div>
    </div>
  )
}
