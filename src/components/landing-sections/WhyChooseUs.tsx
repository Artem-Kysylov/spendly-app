import React from 'react'
import { FaCircleCheck } from 'react-icons/fa6'

const WhyChooseUs = () => {
  return (
    <section className='mt-[120px]' id='why-choose-us'>
      <div className='landing__container'>
        <h2 className='text-[40px] font-semibold text-secondary-black text-center mb-[30px]'>Why choose us?</h2>
        <div className='flex flex-col xl:flex-row items-center justify-center gap-[30px]'>
            <ul className='flex flex-col items-start gap-[30px] w-full xl:w-[50vw]'>
              <li className='flex items-center pb-[30px] border-b light-grey w-full'>
                <FaCircleCheck className="mr-2 text-primary" />
                <p className='text-[18px] font-normal text-secondary-black'>No unnecessary analytics – only the essential data</p>
              </li>
              <li className='flex items-center pb-[30px] border-b light-grey w-full'>
                <FaCircleCheck className="mr-2 text-primary" />
                <p className='text-[18px] font-normal text-secondary-black'>Simple yet powerful tool</p>
              </li>
              <li className='flex items-center pb-[30px] border-b light-grey w-full'>
                <FaCircleCheck className="mr-2 text-primary" />
                <p className='text-[18px] font-normal text-secondary-black'>Free access to core features</p>
              </li>
              <li className='flex items-center pb-[30px] border-b light-grey w-full'>
                <FaCircleCheck className="mr-2 text-primary" />
                <p className='text-[18px] font-normal text-secondary-black'>Track your finances effortlessly – stay in control with ease</p>
              </li>
            </ul>
          <div>
            <img 
              src="/Form page 1.png" 
              alt="Form page" 
              className="w-[50vw] max-w-[581px] h-auto"
            />
          </div>
        </div>
      </div>  
    </section>
  )
}

export default WhyChooseUs