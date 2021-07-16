import About from '../components/About'
import Artist from '../components/Artist/Artist'
import Event from '../components/Event/Event'
import Header from '../components/Header'
import Hero from '../components/Hero'
import RegisterNow from '../components/RegisterNow'
import Subscribe from '../components/Subscribe'
import styled from 'styled-components'
import Contact from '../components/Contact/Contact'
import Footer from '../components/Footer'
import ArrowUp from '../components/ArrowUp'
import React, { useEffect, useState } from 'react'
import StickyHeader from '../components/StickyHeader'
import RegisterModal from '../components/RegisterModal'
import { RegisterModalStateProvider } from '../lib/useRegisterModal'
import { useUserGlobal } from '../lib/useUser'

const MainStyles = styled.section`
   background-image: url('/images/main2.png');
   background-repeat: no-repeat;
   background-size: 65%;
   background-position: -60% 100%;
`

const HomePage = () => {
   const [isScrolled, setScroll] = useState(false)
   const { user } = useUserGlobal()

   const handleScroll = () => {
      if (window.pageYOffset > window.innerHeight / 2) {
         setScroll(true)
      } else setScroll(false)
   }

   useEffect(() => {
      window.addEventListener('scroll', handleScroll)

      return () => {
         window.removeEventListener('scroll', handleScroll)
      }
   }, [])

   return (
      <RegisterModalStateProvider>
         <MainStyles className="min-h-screen flex flex-col relative overflow-hidden">
            <Header />
            <Hero />
         </MainStyles>
         <Event />
         <Artist />
         <Subscribe />
         <About />
         {!user && <RegisterNow />}
         <Contact />
         <Footer />
         {/* Dynamic elements */}
         <StickyHeader isScrolled={isScrolled} />
         <ArrowUp isScrolled={isScrolled} />
         <RegisterModal />
      </RegisterModalStateProvider>
   )
}

export default HomePage
