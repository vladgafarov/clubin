import styled, { keyframes } from 'styled-components'
import tw from 'twin.macro'
import { CgSpinner } from 'react-icons/cg'
import { TiTick } from 'react-icons/ti'
import { BookEventContext } from './BookEventContext'
import { useContext } from 'react'
import { useRegisterModal } from '../../lib/registerModal'

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

const ButtonStyles = styled.button`
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

const CancelButtonStyles = styled(ButtonStyles)`
   ${tw`bg-gray-400 focus:ring-gray-300 text-base py-1 px-3`}
`

const ModalButton: React.FC = () => {
   const {
      handleBookClick,
      handleUnBookClick,
      bookMutationResult: { loading, called },
      unBookMutationResult: { loading: cancelLoading, called: cancelCalled },
      currentEvent,
      user,
      closeModal,
   } = useContext(BookEventContext)

   const { handleSignInClick } = useRegisterModal()

   const closeModalOpenSignIn = () => {
      closeModal()
      handleSignInClick()
   }

   const isBookedCurrentUser = currentEvent.user.some(
      data => data.id === user?.id
   )

   if (!user) {
      return (
         <ButtonStyles onClick={closeModalOpenSignIn}>
            Sign In to Book
         </ButtonStyles>
      )
   }

   if (isBookedCurrentUser) {
      return (
         <>
            <span className="text-center">
               You've already booked this event
            </span>
            <CancelButtonStyles
               type="button"
               onClick={() => handleUnBookClick(currentEvent.id)}
               disabled={cancelLoading}
               success={!cancelLoading && cancelCalled ? true : false}
            >
               Cancel book
               <div className="loading absolute inset-0 flex items-center justify-center text-3xl bg-red-500 ">
                  <CgSpinner className="animate-spin" />
               </div>
               <div className="success absolute inset-0 flex items-center justify-center text-3xl bg-red-500 ">
                  <TiTick fill="#ffffff" className="tick" />
               </div>
            </CancelButtonStyles>
         </>
      )
   }

   return (
      <ButtonStyles
         type="button"
         onClick={() => handleBookClick(currentEvent.id)}
         disabled={loading}
         success={!loading && called ? true : false}
      >
         Book Event
         <div className="loading absolute inset-0 flex items-center justify-center text-3xl bg-purple-500 ">
            <CgSpinner className="animate-spin" />
         </div>
         <div className="success absolute inset-0 flex items-center justify-center text-3xl bg-purple-500 ">
            <TiTick fill="#ffffff" className="tick" />
         </div>
      </ButtonStyles>
   )
}

export default ModalButton
