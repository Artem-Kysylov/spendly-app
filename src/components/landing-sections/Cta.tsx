// Imports 
import { useSignWithGoogle } from '../../hooks/useSignWithGoogle' 

// Import components 
import Button from "../ui-elements/Button"

const Cta = () => {
  const handleGoogleClick = useSignWithGoogle()

  return (
    <section className='mt-[120px] mb-[120px]'>
      <div className='landing__container'>
        <div className='flex flex-col items-center gap-[15px]'>
          <h2 className='text-[55px] font-semibold text-secondary-black text-center'>Take control of your finances today for FREE</h2>
          <Button
            text='Sign in with Google'
            className="btn-primary text-white w-[203px]"
            onClick={handleGoogleClick}
          />
          <span className='text-center block text-[14px] text-secondary-black opacity-70'>No ads or hidden fees</span>
        </div>
      </div>
    </section>
  )
}

export default Cta