// Imports 
import  { useEffect, useRef } from 'react'

// Import components 
import Button from '../ui-elements/Button'

const ModalForm = ({ title, onConfirm, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal()
    }
    
    return () => {
      if (dialogRef.current) {
        dialogRef.current.close()
      }
    };
  }, [])

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm()
    }
  }

  return (
    <dialog ref={dialogRef} id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="modal-action">
          <form method="dialog">
            <Button className='btn-ghost' text='Close' onClick={onClose}/>
            {signOut && (
              <Button className='btn-primary text-white' text='Signout' onClick={handleSignOut}/>
            )}
            {onConfirm && (
              <Button className='btn-error text-white' text='Delete' onClick={handleConfirm}/>
            )}
          </form>
        </div>
    </div>
</dialog>
  )
}

export default ModalForm