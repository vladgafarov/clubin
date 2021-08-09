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
import Head from 'next/head'
// import { getPlaiceholder } from 'plaiceholder'

const MainStyles = styled.section`
   background-image: url('/images/main2.png');
   background-repeat: no-repeat;
   background-size: 65%;
   background-position: -60% 100%;
`

// export const getStaticProps = async () => {
//    const { base64, img } = await getPlaiceholder('/images/main.png', {
//       size: 10,
//    })

//    return {
//       props: {
//          imageProps: {
//             ...img,
//             blurDataURL: base64,
//          },
//       },
//    }
// }

const HomePage = () => {
   const [isScrolled, setIsScrolled] = useState(false)
   const { user } = useUserGlobal()

   const handleScroll = () => {
      if (window.pageYOffset > window.innerHeight / 2) {
         setIsScrolled(true)
      } else setIsScrolled(false)
   }

   useEffect(() => {
      window.addEventListener('scroll', handleScroll)

      return () => {
         window.removeEventListener('scroll', handleScroll)
      }
   }, [])

   return (
      <>
         <Head>
            <title> ClubIn - Book events</title>
         </Head>
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
            <RegisterModal />
            {/* Dynamic elements */}
            <StickyHeader isScrolled={isScrolled} />
            <ArrowUp isScrolled={isScrolled} />
         </RegisterModalStateProvider>
      </>
   )
}

export default HomePage
