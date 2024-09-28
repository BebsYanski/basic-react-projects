import React, { useState } from 'react'
import './style.css'
import { FaStar } from 'react-icons/fa'

const Rating = ({ noOfStars = 5 }) => {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  function handleClick(getCurrentIndex) {
    console.log(getCurrentIndex)
    setRating(getCurrentIndex)
  }
  function handleMouseEnter(getCurrentIndex) {
    setHover(getCurrentIndex)
  }
  function handleMouseLeave() {
    setHover(rating)
  }
  return (
    <section className='container'>
      <div className='star-rating'>
        <h1>Rate us</h1>
        {[...Array(noOfStars)].map((_, index) => {
          index += 1
          return (
            <FaStar
              className={index <= (hover || rating) ? 'active' : 'inactive'}
              key={index}
              onClick={() => {
                handleClick(index)
              }}
              onMouseMove={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave()}
              size={40}
            />
          )
        })}
      </div>
    </section>
  )
}

export default Rating
