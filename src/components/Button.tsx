import { ButtonProps } from '../types/types'

const Button = ({ text, className, onClick }: ButtonProps) => {
  return (
    <button className={`btn ${className}`} onClick={onClick}>{text}</button>
  )
}

export default Button