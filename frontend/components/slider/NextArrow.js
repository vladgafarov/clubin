import { BsArrowRightShort } from 'react-icons/bs'

const NextArrow = ({ onClick, className }) => {
   return (
      <div onClick={onClick} className={className}>
         <BsArrowRightShort />
      </div>
   )
}

export default NextArrow
