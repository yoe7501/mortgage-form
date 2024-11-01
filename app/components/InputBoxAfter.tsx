import React, { ReactNode } from 'react'
interface Props{
    children: ReactNode
}
const InputBoxAfter = ({children}: Props) => {
  return (
    <>
    <div className="flex flex-row border border-slate-300 h-8">
      <input className="w-full" type="text" />
      <span className="bg-slate-500 pt-1 px-3">{children}</span>
    </div>
    </>
  )
}

export default InputBoxAfter