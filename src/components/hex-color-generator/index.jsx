import React, { useEffect, useState } from 'react'
import './style.css'

const RandomColor = () => {
  const [typeOfColor, setTypeOfColor] = useState('hex')
  const [color, setColor] = useState('#001F3F')

  const handleCreateRandomHexColor = () => {
    //#262593
    console.log('random Hex Color')
    const hexValues = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
    ]
    let hexColor = '#'
    for (let i = 0; i < 6; i++) {
      hexColor += hexValues[randomColorUtility(hexValues.length)]
    }
    console.log(hexColor)
    setColor(hexColor)
  }
  const handleCreateRandomRgbColor = () => {
    console.log('random RGB Color')
    const r = randomColorUtility(255)
    const g = randomColorUtility(255)
    const b = randomColorUtility(255)

    let rgbColor = `rgb(${r},${g},${b})`
    console.log(rgbColor)
    setColor(rgbColor)
  }

  function randomColorUtility(length) {
    return Math.floor(Math.random() * length)
  }
  useEffect(() => {
    typeOfColor === 'hex'
      ? handleCreateRandomHexColor()
      : handleCreateRandomRgbColor()
  }, [typeOfColor])
  return (
    <section
      style={{
        width: '100vw',
        height: '100vh',
        display: 'grid',
        placeItems: 'center',
        backgroundColor: color,
      }}
    >
      <div className='app'>
        <button
          className={typeOfColor === 'hex' && 'chosen'}
          type='button'
          onClick={() => setTypeOfColor('hex')}
        >
          Create Hex Color
        </button>
        <button
          className={typeOfColor === 'rgb' && 'chosen'}
          type='button'
          onClick={() => setTypeOfColor('rgb')}
        >
          Create RGB Color
        </button>
        <button
          onClick={
            typeOfColor === 'hex'
              ? handleCreateRandomHexColor
              : handleCreateRandomRgbColor
          }
          type='button'
        >
          Generate Random Color
        </button>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            fontSize: '3rem',
            margin: 'auto',
            height: '40vh',
          }}
          className='color'
        >
          {color}
        </div>
      </div>
    </section>
  )
}

export default RandomColor
