// Imports 
import React from 'react'

// Import components 
import Button from './Button'

// Import types 
import { ModalProps } from '../types/types'

const Modal = ({ title, text }: ModalProps) => {
  return (
    <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click the button below to close</p>
            <div className="modal-action">
            <form method="dialog">
                <Button className='btn-ghost' text='Close'/>
                <Button className='btn-primary' text='Sure'/>
            </form>
            </div>
        </div>
    </dialog>
  )
}

export default Modal