import Button from './styles/Button'
import styled from 'styled-components'
import tw from 'twin.macro'
import CloseButton from './styles/CloseButton'
import { useMenu } from '../lib/menuState'
import { useEffect, useState } from 'react'
import Links from './Links'
import { useModal } from '../lib/modalState'
import Modal from './Modal'
import SignIn from './SignIn'
import SignUp from './SignUp'

const NavStyles = styled.nav`
   ${tw`
      flex items-start justify-center flex-col 
      xl:flex-row xl:justify-end xl:items-center
      fixed xl:relative
      inset-y-0 -right-full xl:right-0 
      pl-8 xl:pl-0
      w-4/5 md:w-3/5 lg:w-2/5 xl:w-auto
      space-y-4 xl:space-y-0 
      xl:space-x-8 2xl:space-x-16 
      text-xl xl:text-lg font-pb
      z-30
      shadow-md xl:shadow-none
      transition-all duration-300
   `}
   ${props => props.isOpen && tw`right-0`}
   a {
      ${tw`uppercase`}
   }
   .buttons {
      ${tw`
         pt-6 xl:pt-0
         flex flex-col xl:flex-row 
         space-y-4 xl:space-y-0
         xl:space-x-5 2xl:space-x-8
      `}
   }
   .close {
      ${tw`block xl:hidden`}
   }
   @media (max-width: 1024px) {
      background-color: #21212e;
   }
`

type ModalType = 'signIn' | 'signUp'

const Nav = () => {
   const { closeMenu, isOpen } = useMenu()
   const [signInModal, setSignInModal] = useState<boolean>()
   const [signUpModal, setSignUpModal] = useState<boolean>()
   const [modalType, setModalType] = useState<ModalType>()

   const openModal = (type: ModalType) => {
      switch (type) {
         case 'signIn':
            setSignInModal(true)
            setModalType(type)
         case 'signUp':
            setSignUpModal(true)
            setModalType(type)
      }
   }

   const closeModal = () => {
      setSignInModal(false)
      setSignUpModal(false)
   }

   const handleOutsideClick = e => {
      if (e.target.localName !== 'nav' && isOpen) {
         closeMenu()
      }
   }

   useEffect(() => {
      const els = document.querySelectorAll('.animation-link')
      if (window.screen.width < 1280) {
         els.forEach(el => el.addEventListener('click', () => closeMenu()))
         window.addEventListener('click', handleOutsideClick)

         return () => {
            window.removeEventListener('click', handleOutsideClick)
            els.forEach(el =>
               el.removeEventListener('click', () => closeMenu())
            )
         }
      }
   }, [isOpen])

   return (
      <>
         <NavStyles isOpen={isOpen}>
            <Links spy={false} />
            <span className="buttons">
               <Button isGradient onClick={() => openModal('signIn')}>
                  Sign In
               </Button>
               <Button onClick={() => openModal('signUp')}>Sign Up</Button>
            </span>
            <CloseButton className="close" onClick={closeMenu}>
               &times;
            </CloseButton>
         </NavStyles>
         <Modal isModalOpen={signInModal} closeModal={closeModal}>
            <SignIn />
         </Modal>
         <Modal isModalOpen={signUpModal} closeModal={closeModal}>
            <SignUp />
         </Modal>
      </>
   )
}

export default Nav
