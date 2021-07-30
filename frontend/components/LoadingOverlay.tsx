import styled, { keyframes } from 'styled-components'
import tw from 'twin.macro'
import { CgSpinner } from 'react-icons/cg'
import { TiTick } from 'react-icons/ti'
import { AnimatePresence, motion } from 'framer-motion'

const fadeOut = keyframes`
   from {
      opacity: 1;
   }
   to {
      opacity: 0;
   }
`

const OverlayStyles = styled(motion.div)`
   ${tw`
      absolute
      inset-0
      flex justify-center items-center
      bg-white bg-opacity-60
      z-10
   `}
   /* .loader {
      ${tw`
         w-16 h-16
         z-20
      `}
   } */
   .loader, .tick {
      ${tw`
         absolute 
         w-16 h-16
         top-1/2 left-1/2
         transform -translate-x-1/2 -translate-y-1/2
      `}
   }
   /* ${props =>
      props.loading ? tw`bg-white bg-opacity-70 pointer-events-auto` : ''} */
   /* .loader {
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
   } */
`

const LayersStyles = `w-16 h-16`
// absolute
// top-1/2 left-1/2
// transform -translate-x-1/2 -translate-y-1/2

interface ILoadingOverlay {
   loading: boolean
   error: boolean
   called: boolean
}

const LoadingOverlay = ({ loading, error, called }: ILoadingOverlay) => {
   return (
      // <OverlayStyles loading={loading} error={error} called={called}>
      //    <CgSpinner className="loader animate-spin" />
      //    <TiTick fill="#27ae60" className="tick" />
      // </OverlayStyles>
      <AnimatePresence exitBeforeEnter>
         {loading && (
            <OverlayStyles
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               key="loader"
            >
               <CgSpinner className={`${LayersStyles} animate-spin`} />
            </OverlayStyles>
         )}
         {!loading && !error && called && (
            <OverlayStyles
               initial={{ opacity: 0 }}
               animate={{ opacity: [1, 0] }}
               exit={{ opacity: 0 }}
               transition={{ duration: 2.5, times: [0.9, 1] }}
               key="success"
            >
               <TiTick fill="#27ae60" className={LayersStyles} />
            </OverlayStyles>
         )}
      </AnimatePresence>
   )
}

export default LoadingOverlay
