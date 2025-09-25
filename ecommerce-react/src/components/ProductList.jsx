import React, { useEffect, useState, useRef } from 'react'
import ProductCard from './ProductCard'
import ProductDetails from './ProductDetails'

export default function ProductList({ addToCart }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // query is the value used to filter results (debounced)
  const [query, setQuery] = useState('')
  // displayQuery updates immediately with user input; query updates after 1s
  const [displayQuery, setDisplayQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('none')
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [maxPrice, setMaxPrice] = useState(10000)
  const [selected, setSelected] = useState(null)
  const [categories, setCategories] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const debounceRef = useRef(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const res = await fetch('https://dummyjson.com/products?limit=100')
        const data = await res.json()
        setProducts(data.products)
  // extract categories (ignore falsy values)
  const cats = Array.from(new Set(data.products.map(p => p.category).filter(Boolean)))
        setCategories(cats)
        // set default max price
      const max = Math.max(...data.products.map(p => p.price))
      setMaxPrice(max)
      setPriceRange([0, max])
      } catch (err) {
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Debounce: apply displayQuery to query after 1 second
  useEffect(()=>{
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(()=>{
      setQuery(displayQuery.trim())
    }, 1000)
    return ()=>{ if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [displayQuery])

  // Update suggestions immediately based on displayQuery (short list)
  useEffect(()=>{
    if (!displayQuery) { setSuggestions([]); return }
    const q = String(displayQuery).toLowerCase()
    const list = products.filter(p => (p?.title || '').toLowerCase().includes(q) || (p?.brand || '').toLowerCase().includes(q)).slice(0,6)
    setSuggestions(list)
  }, [displayQuery, products])

  function filtered() {
    let list = products.slice()
    if (query) {
      const q = String(query).toLowerCase()
      list = list.filter(p => (p?.title || '').toLowerCase().includes(q) || (p?.brand || '').toLowerCase().includes(q) || (p?.description || '').toLowerCase().includes(q))
    }
  if (category !== 'all') list = list.filter(p => (p?.category || '') === category)
  list = list.filter(p => (p?.price ?? 0) >= (priceRange[0] ?? 0) && (p?.price ?? 0) <= (priceRange[1] ?? Infinity))
  if (sort === 'price-asc') list.sort((a,b)=> (a?.price ?? 0) - (b?.price ?? 0))
  if (sort === 'price-desc') list.sort((a,b)=> (b?.price ?? 0) - (a?.price ?? 0))
  if (sort === 'rating-desc') list.sort((a,b)=> (b?.rating ?? 0) - (a?.rating ?? 0))
    return list
  }

  if (loading) return <div className="center">Loading products...</div>
  if (error) return <div className="center error">{error}</div>

  return (
    <div className="product-area">
      <aside className="filters">
        <div className="search-wrap">
          <input placeholder="Search products..." value={displayQuery} onChange={e=>setDisplayQuery(e.target.value)} />
          {suggestions.length > 0 && (
            <ul className="suggestions">
              {suggestions.map(s => (
                <li key={s.id} onClick={()=>{ setDisplayQuery(s.title); setQuery(s.title); setSuggestions([]); }}>
                  <strong>{s.title}</strong>
                  <div className="s-meta">{s.brand} • ${s.price}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <label>Category</label>
        <select value={category} onChange={e=>setCategory(e.target.value)}>
          <option value="all">All</option>
          {categories.map(c=> <option key={c} value={c}>{c}</option>)}
        </select>
        <label>Sort</label>
        <select value={sort} onChange={e=>setSort(e.target.value)}>
          <option value="none">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating</option>
        </select>
  <label>Max Price: {priceRange[1]}</label>
  <input type="range" min="0" max={maxPrice} value={priceRange[1]} onChange={e=>setPriceRange([0, Number(e.target.value)])} />
  <button onClick={()=>{setQuery(''); setCategory('all'); setSort('none'); setPriceRange([0,maxPrice])}}>Reset</button>
      </aside>
      <section className="products">
        {filtered().map(p => (
          <ProductCard key={p.id} product={p} onView={()=>setSelected(p)} addToCart={addToCart} />
        ))}
      </section>
      {selected && <ProductDetails product={selected} onClose={()=>setSelected(null)} addToCart={addToCart} />}
    </div>
  )
}
