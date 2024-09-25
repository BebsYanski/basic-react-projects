import React, { useState } from 'react'
import data from './data.js'
import './styles.css'

const Accordion = () => {
  const [selected, setSelected] = useState(null)
  const [enabledMultiSelection, setEnabledMultiSelection] = useState(false)
  const [multiple, setMultiple] = useState([])

  const handleSingleSelection = (getCurrentId) => {
    console.log('Single Selection', getCurrentId)
    setSelected(getCurrentId === selected ? null : getCurrentId)
    console.log('selected')
  }
  const handleMultipleSelection = (getCurrentId) => {
    let multipleCopy = [...multiple]
    const findIndexOfCurrentId = multipleCopy.indexOf(getCurrentId)
    console.log(getCurrentId, findIndexOfCurrentId)
    if (findIndexOfCurrentId === -1) {
      multipleCopy.push(getCurrentId)
    } else {
      multipleCopy.splice(findIndexOfCurrentId, 1)
    }
    setMultiple(multipleCopy)
    console.log(multipleCopy)
  }
  return (
    <div className='wrapper'>
      <button
        className={enabledMultiSelection ? 'multiple-selection' : null}
        onClick={() => {
          setMultiple([])
          setEnabledMultiSelection(!enabledMultiSelection)
          setSelected(null)
        }}
      >
        {enabledMultiSelection
          ? 'multiple selection enabled'
          : 'enable multiple selection'}
      </button>
      <div className='accordian'>
        {data && data.length > 0 ? (
          data.map((dataItem) => {
            const { id, question, answer } = dataItem
            return (
              <div key={id} className='item'>
                <div
                  onClick={
                    enabledMultiSelection
                      ? () => handleMultipleSelection(id)
                      : () => handleSingleSelection(id)
                  }
                  className='title'
                >
                  <h3>{question}</h3>
                  <span>
                    {selected === id || multiple.indexOf(id) !== -1 ? '-' : '+'}
                  </span>
                </div>
                {selected === id || multiple.indexOf(id) !== -1 ? (
                  <div>
                    <p className='content'>{answer}</p>
                  </div>
                ) : null}
              </div>
            )
          })
        ) : (
          <div>
            <h2>No data found</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default Accordion
