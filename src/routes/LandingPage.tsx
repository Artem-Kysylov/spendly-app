// Import sections 
import Header from '../components/landing-sections/Header'
import Hero from '../components/landing-sections/Hero'
import HowItWorks from '../components/landing-sections/HowItWorks'
import WhyChooseUs from '../components/landing-sections/WhyChooseUs'
import Cta from '../components/landing-sections/Cta'  
import Footer from '../components/landing-sections/Footer'


const LandingPage = () => {
  return (
    <div 
      className="bg-[url('/landing-page-bg.png')] bg-cover bg-center bg-no-repeat"
    >
      <Header/>
      <Hero/>
      <HowItWorks/>
      <WhyChooseUs/>
      <Cta/>
      <Footer/>
    </div>
  )
}

export default LandingPage