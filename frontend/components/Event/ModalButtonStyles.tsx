import styled from 'styled-components'
import tw from 'twin.macro'

export const ModalButton = styled.button`
   ${tw`
      relative overflow-hidden
      bg-purple-500 
      text-xl font-pb text-white 
      py-2 px-5 
      my-0 mx-auto 
      rounded-full 
      block 
      transition transform 
      hover:scale-105 
      focus:ring-indigo-500 focus:ring-2
   `}
   .loading, .success {
      opacity: 0;
      pointer-events: none;
      cursor: wait;
   }
   .success {
      opacity: ${props => (props.success ? 1 : 0)};
   }
   &:disabled {
      opacity: 0.9;
      .loading {
         opacity: 1;
         pointer-events: all;
      }
   }
`
