import styled, { keyframes } from 'styled-components'
import tw from 'twin.macro'
import { BookEventContext } from './BookEventContext'
import { useContext } from 'react'
import { useRegisterModal } from '../../lib/useRegisterModal'

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
   &:disabled {
      opacity: 0.9;
   }
`

const CancelButtonStyles = styled(ButtonStyles)`
   ${tw`bg-gray-400 focus:ring-gray-300 text-base py-1 px-3`}
`

const ModalButton = () => {
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
               disabled={loading || cancelLoading}
            >
               Cancel book
            </CancelButtonStyles>
         </>
      )
   }

   return (
      <ButtonStyles
         type="button"
         onClick={() => handleBookClick(currentEvent.id)}
         disabled={loading || cancelLoading}
      >
         Book Event
      </ButtonStyles>
   )
}

export default ModalButton
