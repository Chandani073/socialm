import React from 'react'

const loading = ({height='100vh'}) => {
  return (
    <div style={{height}} className=' flex item center justify-center h-screen'>
        <div className='
        w-10 h-10 ruonded-full border-3 border-purpel-300 border-t-transprent animate-spin'></div>
    </div>
  )
}
export default loading