import styled from 'styled-components'
import tw from 'twin.macro'

export const ArrowStyles = styled.div`
   position: absolute;
   right: 0;
   bottom: -60px;
   z-index: 1000;
   ${tw`
      text-4xl text-blue-400 
      border border-blue-400 rounded-lg
      transition 
      px-2
      hover:bg-blue-400
      hover:text-white
      cursor-pointer
   `}
   &::before {
      display: none;
   }
`
