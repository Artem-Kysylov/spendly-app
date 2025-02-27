import React from 'react'
import { ButtonProps } from '../types/types'

const Button = ({ text, className }: ButtonProps ) => {
  return (
    <button className={`btn ${className}`}>{text}</button>
  )
}

export default Button