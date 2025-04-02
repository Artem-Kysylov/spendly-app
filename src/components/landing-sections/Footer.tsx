

const Footer = () => {
  return (
    <footer className='p-[10px] border-t light-grey'>
      <div className='landing__container'>
        <div className='flex items-center justify-between mb-5'>
          <div className="flex items-center">
                <img 
                    src="/Spendly-logo.svg" 
                    alt="Spendly Logo" 
                    className="h-6 w-auto"
                />
            </div>

            <nav>
              <ul className="flex items-center gap-4">
                <li>
                  <a href="/" className="font-medium text-secondary-black">
                    How it works
                  </a>
                </li>
                <li>
                  <a href="/" className="font-medium text-secondary-black">
                    Why choose us
                  </a>
                  </li>
                </ul>
            </nav>
        </div>
        <span className='text-center block text-[14px] text-secondary-black'>Copyright. All rights reserved</span>
      </div>
    </footer>
  )
}

export default Footer