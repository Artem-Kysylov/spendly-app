// Imports 
import { useEffect, useRef } from 'react'

// Import types
import { DeleteModalProps } from '../../types/types'

// Import components 
import Button from '../ui-elements/Button'

const DeleteModal = ({ title, text, onClose, onConfirm }: DeleteModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal()
    }
    return () => {
      if (dialogRef.current) {
        dialogRef.current.close()
      }
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onConfirm()
  }

  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{text}</p>
        <div className="modal-action">
          <form onSubmit={handleSubmit}>
            <Button className='btn-ghost' text='Cancel' onClick={onClose}/>
            <Button 
              className='btn-error text-white' 
              text='Delete' 
              type="submit"
            />
          </form>
        </div>
      </div>
    </dialog>
  )
}

export default DeleteModal