import React from 'react'

export default function Ingredient({name, amount}) {
  return (
    <div className="ms-3">
      <span>{`${name}: `}</span>
      {amount}
    </div>
  )
}
