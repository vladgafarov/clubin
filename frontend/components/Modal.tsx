import { useEffect } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

const ModalStyles = styled.div`
   z-index: 1000;
   position: fixed;
   top: 0;
   left: 0;
   background-color: rgba(0, 0, 0, 0.5);
   transition: 0.25s ease-in-out;
   margin: 0 !important;
   ${tw`w-full h-full flex justify-center items-center`}
   ${props => !props.isOpen && `opacity: 0; pointer-events: none;`}
`

const ModalContent = styled.div`
   ${props => !props.customStyles && tw`bg-white p-5 text-black`}
   ${tw`relative w-11/12 sm:w-4/5 lg:w-2/3 xl:w-1/3`}
`

const CloseButton = styled.span`
   ${tw`
      absolute
      top-2 right-4
      text-3xl cursor-pointer text-black
   `}
`

interface IModal {
   children: React.ReactNode
   isOpen: boolean
   closeModal: Function
   customStyles?: boolean
}

const Modal: React.FC<IModal> = ({
   children,
   isOpen,
   closeModal,
   customStyles = false,
}) => {
   const handleClick = e => {
      if (e.target == e.currentTarget) {
         closeModal()
      }
   }

   useEffect(() => {
      document.addEventListener('keyup', e => {
         if (e.key == 'Escape') {
            closeModal()
         }
      })
   }, [isOpen])

   return (
      <ModalStyles onClick={handleClick} isOpen={isOpen}>
         <ModalContent customStyles={customStyles}>
            {children}
            <CloseButton onClick={closeModal}>&times;</CloseButton>
         </ModalContent>
      </ModalStyles>
   )
}

export default Modal
