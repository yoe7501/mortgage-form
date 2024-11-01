import React from 'react'
import Illustration from './Illustration'

const ShownResult = () => {
  return (
    <div className="result lg:h-[380px] ">
    <Illustration />
    <h1 className="font-semibold text-xl">Results shown here</h1>
    <p className="text-center text-slate-400">
      Complete the form and click "calculate repayments" to see what you
      monthly replayments would be.
    </p>
  </div>
  )
}

export default ShownResult