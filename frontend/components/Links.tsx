import { useEffect, useState } from 'react'
import { Link } from 'react-scroll'

interface Links {
   spy: boolean
}

const Links: React.FC<Links> = ({ spy }) => {
   const [offset, setOffset] = useState<number>(0)

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
      <>
         <Link to="events" {...linkProps}>
            Events
         </Link>
         <Link to="artist" duration={1200} {...linkProps}>
            Artist
         </Link>
         <Link to="about" duration={1500} {...linkProps}>
            About us
         </Link>
         <Link to="contact" duration={1500} {...linkProps}>
            Contact
         </Link>
      </>
   )
}

export default Links
