// Import types
import { TextInputProps } from '../../types/types'

const TextInput = ({ type, placeholder, value, onChange, onInput }: TextInputProps) => {
  return (
    <input 
        className='w-full px-4 py-3 rounded-lg border border-primary focus:border-primary focus:outline-none text-base'
        type={type}
        placeholder={placeholder}
        value={value} 
        required    
        onChange={onChange}
        onInput={onInput}    
    />
  )
}

export default TextInput