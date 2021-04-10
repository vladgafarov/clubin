import { BsArrowLeftShort } from 'react-icons/bs'

const PrevArrow = ({ onClick, className }) => {
   return (
      <div onClick={onClick} style={{ right: '70px' }} className={className}>
         <BsArrowLeftShort />
      </div>
   )
}

export default PrevArrow
