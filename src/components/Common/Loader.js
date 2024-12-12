import React from 'react'

const Loader = () => {
  return (
    <div className='loader-container flex justify-center items-center h-full'>
      <div className='spinner border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin'></div>
    </div>
  )
}

export default Loader
