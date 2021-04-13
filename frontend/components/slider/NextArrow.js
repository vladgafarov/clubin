import { BsArrowRightShort } from 'react-icons/bs'
import { Link } from 'react-scroll'
import { useMobile } from '../../lib/mobileState'

const NextArrow = ({ onClick, className, isEvent }) => {
   const { isMobile } = useMobile()

   return (
      <div onClick={onClick} className={className}>
         {isEvent && isMobile ? (
            <Link to="events" onClick={onClick} smooth="easeInOutQuad">
               <BsArrowRightShort />
            </Link>
         ) : (
            <BsArrowRightShort />
         )}
      </div>
   )
}

export default NextArrow
