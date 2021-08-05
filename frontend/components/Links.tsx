import { AnimateSharedLayout, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-scroll'
import SmoothTransition from './Animations/SmoothTransition'

export const LinksContent = [
   {
      to: 'events',
      text: 'Events',
   },
   {
      to: 'artist',
      text: 'Artists',
   },
   {
      to: 'about',
      text: 'About us',
   },
   {
      to: 'contact',
      text: 'Contact',
   },
]

interface ILinks {
   spy: boolean
}

const Links = ({ spy }: ILinks) => {
   const [offset, setOffset] = useState<number>(0)
   const [active, setActive] = useState<string>(null)

   useEffect(() => {
      setOffset(window.innerHeight / 6)
      if (window.innerWidth < 1280) {
         setOffset(window.innerHeight / 10)
      }
   }, [])

   const linkProps = {
      className: 'animation-link',
      spy,
      smooth: 'easeInOutQuad',
      offset: -offset,
   }

   return (
      <AnimateSharedLayout>
         {LinksContent.map((link, i) => (
            <Link
               key={i}
               to={link.to}
               onSetActive={() => setActive(link.to)}
               {...linkProps}
            >
               {link.text}
               {active == link.to && <SmoothTransition name="underline" />}
            </Link>
         ))}
      </AnimateSharedLayout>
   )
}

export default Links
