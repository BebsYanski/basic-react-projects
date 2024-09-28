import React, { useEffect, useState } from 'react'
import './style.css'
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'

const ImageSlider = ({ url, limit = 5, page = 1 }) => {
  const [images, setImages] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [errorMsg, setErrorMsg] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleNext() {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1)
  }

  function handlePrevious() {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1)
  }

  async function fetchImages(getUrl) {
    try {
      setLoading(true)

      const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`)
      const data = await response.json()

      if (data) {
        setImages(data)
        setLoading(false)
      }
    } catch (error) {
      setErrorMsg(error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (url !== '') fetchImages(url)
  }, [url])

  console.log(images)

  if (loading) {
    return <div>Loading data ! Please wait...</div>
  }

  if (errorMsg !== null) {
    return <div>An Error Occurred !{errorMsg}</div>
  }
  return (
    <section className='container'>
      <h1>Image Slider</h1>
      <div className='slider'>
        <BsArrowLeftCircleFill
          onClick={handlePrevious}
          className='arrow arrow-left'
        />
        {images && images.length
          ? images.map((imageItem, index) => {
              return (
                <img
                  key={imageItem.id}
                  src={imageItem.download_url}
                  alt={imageItem.download_url}
                  className={
                    currentSlide === index
                      ? 'current-image'
                      : 'current-image hide-current-image'
                  }
                />
              )
            })
          : null}

        <BsArrowRightCircleFill
          onClick={handleNext}
          className='arrow arrow-right'
        />
        <span className='circle-indicators'>
          {images && images.length
            ? images.map((_, index) => (
                <button
                  key={index}
                  className={
                    currentSlide === index
                      ? 'current-indicator'
                      : 'current-indicator inactive-indicator'
                  }
                  onClick={() => setCurrentSlide(index)}
                ></button>
              ))
            : null}
        </span>
      </div>
    </section>
  )
}

export default ImageSlider
