import Head from 'next/head'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import wait from 'waait'
import { useModal } from '../lib/modalState'
import RequestReset from './RequestReset'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Button from './styles/Button'

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
   ${tw`relative w-1/3`}
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
         <ModalContent>
            {children}
            <CloseButton onClick={closeModal}>&times;</CloseButton>
         </ModalContent>
      </ModalStyles>
   )
}

export default Modal
