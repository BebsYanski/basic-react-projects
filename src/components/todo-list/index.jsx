import React from 'react'
import './style.css'

const Todo = () => {
  return (
    <div className='app'>
      <button>Open Popup</button>
      <div>
        <div className='main'>
          <article className='popup'>
            <header className='popup-header'>
              <h1>Popup</h1>
              <h1>X</h1>
            </header>
            <main>
              <p>This is a simple popup in react</p>
            </main>
          </article>
        </div>
      </div>
    </div>
  )
}

export default Todo
