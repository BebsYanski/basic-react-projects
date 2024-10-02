import React, { useEffect, useRef, useState } from 'react'
import './style.css'

const LoadData = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [products, setProducts] = useState([])
  const [count, setCount] = useState(0)
  const [disableButton, setDisableButton] = useState(false)
  const bottomRef = useRef(null)

  async function fetchProducts() {
    try {
      setLoading(true)
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${
          count === 0 ? 0 : count * 20
        }`
      )
      const result = await response.json()

      if (result && result.products && result.products.length) {
        setProducts((prevData) => [...prevData, ...result.products])
        setLoading(false)
      }
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchProducts()
  }, [count])

  useEffect(() => {
    if (products && products.length === 100) setDisableButton(true)
  }, [products])

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  if (loading) {
    return <div>Loading Data ...</div>
  }

  if (error != null) {
    return <div>An error Occurred, {error}</div>
  }

  return (
    <section className='load-more-container'>
      <div className='product-container'>
        {products && products.length
          ? products.map((item) => (
              <div className='product' key={item.id}>
                <img src={item.thumbnail} alt={item.title} />
                <p>{item.title}</p>
              </div>
            ))
          : null}
        <div ref={bottomRef} />
      </div>
      <div className='btn-container'>
        <button
          disabled={disableButton}
          onClick={() => {
            setCount(count + 1)
            scrollToBottom()
          }}
        >
          Load More Products
        </button>
        {disableButton ? (
          <p>You have reached the maximum number of products</p>
        ) : null}
      </div>
    </section>
  )
}

export default LoadData
