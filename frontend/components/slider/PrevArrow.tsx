import { BsArrowLeftShort } from 'react-icons/bs'

const PrevArrow = props => {
   const { onClick, className } = props
   return (
      <div onClick={onClick} style={{ right: '70px' }} className={className}>
         <BsArrowLeftShort />
      </div>
   )
}

export default PrevArrow
