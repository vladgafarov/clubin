import styled, { keyframes } from 'styled-components'
import tw from 'twin.macro'
import { CgSpinner } from 'react-icons/cg'
import { TiTick } from 'react-icons/ti'
import { FormikProps } from 'formik'
import { FormValues } from './Contact'
import { useEffect } from 'react'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const OverlayStyles = styled.div`
   ${tw`
      opacity-0
      pointer-events-none
      absolute
      inset-0
      flex justify-center items-center
      z-10
      transition
   `}
   &::after {
      content: '';
      ${tw`
         absolute 
         block
         w-28 h-28 bg-black bg-opacity-20
         rounded-full
         top-1/2 left-1/2
         transform -translate-x-1/2 -translate-y-1/2
         z-10
      `}
   }
   ${props =>
      props.disabled || props.status ? tw`opacity-100 pointer-events-auto` : ''}
   .loader, .tick {
      ${tw`
         hidden
         w-16 h-16
         transition
         z-20
      `}
   }
   .loader {
      animation: ${rotate} 1.25s linear infinite;
      ${props => (!props.status && props.disabled ? tw`block` : '')}
   }
   .tick {
      ${tw`
         w-24 h-24
      `}
      ${props => (props.status ? tw`block` : '')}
   }
`

const Overlay = ({ isSubmitting, status, setStatus }) => {
   if (status) {
      setTimeout(() => {
         setStatus(undefined)
      }, 2000)
   }

   return (
      <OverlayStyles disabled={isSubmitting} status={status}>
         <CgSpinner className="loader" />
         <TiTick fill="#27ae60" className="tick" />
      </OverlayStyles>
   )
}

export default Overlay
