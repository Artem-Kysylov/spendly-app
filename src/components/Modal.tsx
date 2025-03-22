// Imports
import  { useEffect, useRef } from 'react'

// Import components
import Button from './Button'

// Import types
import { ModalProps } from '../types/types'
  
const Modal = ({ title, text, onClose, signOut }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
    
    return () => {
      if (dialogRef.current) {
        dialogRef.current.close();
      }
    };
  }, []);

  const handleSignOut = () => {
    signOut();
    onClose();
  };

  return (
    <dialog ref={dialogRef} id="my_modal_1" className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="py-4">{text}</p>
            <div className="modal-action">
            <form method="dialog">
                <Button className='btn-ghost' text='Close' onClick={onClose}/>
                <Button className='btn-primary text-white' text='Signout' onClick={handleSignOut}/>
            </form>
            </div>
        </div>
    </dialog>
  )
}

export default Modal