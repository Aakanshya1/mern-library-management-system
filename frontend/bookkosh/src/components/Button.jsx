import React from 'react'

function Button({text,isprimary,onClick,onSubmit}) {
  return (
    <button onClick={onClick} onSubmit={onSubmit} className={isprimary?'bg-blue rounded-md text-white px-5 py-2 text-sm ':' bg-white text-blue border rounded-md px-5 py-2 text-sm'}>{text}</button>
  )
}

export default Button