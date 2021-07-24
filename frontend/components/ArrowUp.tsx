import styled from 'styled-components'
import tw from 'twin.macro'
import { IoIosArrowUp } from 'react-icons/io'
import { animateScroll as scroll } from 'react-scroll'

const ArrowUpStyles = styled.div`
   ${tw`
      fixed
      bottom-5 right-5
      w-12 h-12 rounded-full
      bg-blue-400
      text-white
      border-2 border-blue-400
      transition
      hover:bg-white
      hover:text-blue-400
      flex justify-center items-center
      z-10
      cursor-pointer
      opacity-0
      pointer-events-none
   `}
   ${props => props.isScrolled && tw`opacity-100 pointer-events-auto`}
`

interface IArrowUp {
   isScrolled: boolean
}

const ArrowUp = ({ isScrolled }: IArrowUp) => {
   return (
      <a onClick={scroll.scrollToTop}>
         <ArrowUpStyles isScrolled={isScrolled}>
            <IoIosArrowUp />
         </ArrowUpStyles>
      </a>
   )
}

export default ArrowUp
