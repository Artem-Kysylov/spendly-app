// Import sections 
import Header from '../components/landing-sections/Header'
import Hero from '../components/landing-sections/Hero'
import HowItWorks from '../components/landing-sections/HowItWorks'
import WhyChooseUs from '../components/landing-sections/WhyChooseUs'
import Cta from '../components/landing-sections/Cta'  
import Footer from '../components/landing-sections/Footer'


const LandingPage = () => {
  return (
    <>
      <Header/>
      <Hero/>
      <HowItWorks/>
      <WhyChooseUs/>
      <Cta/>
      <Footer/>
    </>
  )
}

export default LandingPage