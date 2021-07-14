import styled, { keyframes } from 'styled-components'
import tw from 'twin.macro'
import { CgSpinner } from 'react-icons/cg'
import { TiTick } from 'react-icons/ti'

const fadeOut = keyframes`
   from {
      opacity: 1;
   }
   to {
      opacity: 0;
   }
`

const OverlayStyles = styled.div`
   ${tw`
      pointer-events-none
      absolute
      inset-0
      flex justify-center items-center
      z-10
      transition
   `}
   .loader {
      ${tw`
         hidden
         w-16 h-16
         transition
         z-20
      `}
   }
   .loader {
      ${props => (props.loading ? tw`block` : '')}
   }
   .tick {
      ${tw`
         absolute 
         w-16 h-16
         top-1/2 left-1/2
         transform -translate-x-1/2 -translate-y-1/2
         transition
         opacity-0
      `}
   }
   .tick {
      ${tw`w-24 h-24`}
      animation: ${props =>
         !props.error &&
         !props.loading &&
         props.called &&
         fadeOut} 2s cubic-bezier(1,.01,.92,.05);
   }
`

interface ILoadingOverlay {
   loading: boolean
   error: boolean
   called: boolean
}

const LoadingOverlay = ({ loading, error, called }: ILoadingOverlay) => {
   return (
      <OverlayStyles $loading={loading} error={error} called={called}>
         <CgSpinner className="loader animate-spin" />
         <TiTick fill="#27ae60" className="tick" />
      </OverlayStyles>
   )
}

export default LoadingOverlay
