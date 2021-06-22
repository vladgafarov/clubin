import styled, { keyframes } from 'styled-components'
import tw from 'twin.macro'

const fade = keyframes`
  from {
    opacity: 1;
  }
  75% {
     opacity: 1;
  }
  50% {
     opacity: 1;
  }
  25% {
     opacity: 1;
  }
  to {
    opacity: 0;
  }
`

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
      animation: ${props => props.success && fade} 3s 1 ease-out;
   }
   &:disabled {
      opacity: 0.9;
      .loading {
         opacity: 1;
         pointer-events: all;
      }
   }
`
