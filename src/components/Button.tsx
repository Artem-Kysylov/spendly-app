import { ButtonProps } from '../types/types'

const Button = ({ text, className, onClick, type = 'button', disabled }: ButtonProps) => {
  return (
    <button 
      className={`btn ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} 
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button