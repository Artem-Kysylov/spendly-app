import React from 'react'

const HowItWorks = () => {
  return (
    <section className='mt-[120px]' id='how-it-works'>
      <div className='landing__container'>
        <h2 className='text-[40px] font-semibold text-secondary-black text-center mb-[30px]'>How it works?</h2>

        <div className='flex flex-col lg:flex-row items-start justify-between gap-[30px]'>
          <div className='bg-white text-center p-[30px] border light-grey rounded-lg w-full h-[200px] flex flex-col items-center'>
            <h3 className='text-[30px] mb-4'>🏦</h3>
            <h4 className='text-[20px] font-semibold text-secondary-black mb-4'>One-click signup</h4>
            <p>Sign in with Google</p>
          </div>

          <div className='bg-white text-center p-[30px] border light-grey rounded-lg w-full h-[200px] flex flex-col items-center'>
            <h3 className='text-[30px] mb-4'>⚡</h3>
            <h4 className='text-[20px] font-semibold text-secondary-black mb-4'>Add expenses in seconds</h4>
            <p>Record transactions in just a few clicks</p>
          </div>

          <div className='bg-white text-center p-[30px] border light-grey rounded-lg w-full h-[200px] flex flex-col items-center'>
            <h3 className='text-[30px] mb-4'>📂</h3>
            <h4 className='text-[20px] font-semibold text-secondary-black mb-4'>Budgets & categories</h4>
            <p>Organize your finances into folders for convenience</p>
          </div>
          
        </div>
      </div>
    </section>
  )
}

export default HowItWorks