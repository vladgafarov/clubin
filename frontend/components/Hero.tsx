import Image from 'next/image'
import { padding } from './Page'
import Button from './styles/Button'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Link } from 'react-scroll'
// import main from '../public/images/main.png'

const HeroStyles = styled.div`
   ${tw`
      flex
      items-center
      flex-grow
      -mt-12
      justify-between
      pr-6 md:pr-0 2xl:pr-32
   `}
   .hero-image {
      ${tw`hidden md:block`}
      img {
         width: 800px;
         height: 800px;
         @media (max-width: 1280px) {
            width: 550px;
            height: 550px;
         }
      }
   }
`

const Hero = () => {
   return (
      <HeroStyles className={padding}>
         <div>
            <p className="font-pm text-lg">IT’S NOT JUST LOVE FOR MUSIC</p>

            <h1 className="text-6xl md:text-7xl text-blue-400 font-pb py-6">
               Feel The Rhythm
            </h1>
            <Link to="events" smooth={true} offset={-100}>
               <Button className="mt-4" isGradient>
                  See All Events
               </Button>
            </Link>
         </div>
         <div className="hero-image">
            <Image
               src="/images/main.png"
               height=""
               width=""
               alt="super cool alt"
               // placeholder="blur"
            />
         </div>
      </HeroStyles>
   )
}

export default Hero
