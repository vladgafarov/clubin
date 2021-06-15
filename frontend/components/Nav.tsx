import Button from './styles/Button'
import styled from 'styled-components'
import tw from 'twin.macro'
import Link from 'next/link'
import CloseButton from './styles/CloseButton'
import { useMenu } from '../lib/menuState'
import React, { useEffect, useState } from 'react'
import Links from './Links'
import { useModal } from '../lib/useModal'
import Modal from './Modal'
import SignIn from './Login/SignIn'
import SignUp from './Login/SignUp'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useUser } from './User'
import { FaUserAlt } from 'react-icons/fa'
import { RiLogoutBoxFill } from 'react-icons/ri'
import { useMobile } from '../lib/mobileState'
import SignOut from './SignOut'
import Tooltip from './Tooltip'

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
   @media (max-width: 1280px) {
      background-color: #21212e;
   }
`

const AnimationStyles = styled.span`
   .modal {
      display: none;
   }
   .modal-enter {
      opacity: 0;
   }
   .modal-enter-active {
      opacity: 1;
   }
   .modal-exit {
      opacity: 0;
   }
   .modal-exit-active {
      display: none;
   }
`

const UserStyles = styled.div`
   ${tw`
      flex flex-col md:flex-row
   `}
   a {
      ${tw`ml-2 cursor-pointer`}
   }
   div {
      ${tw`
         flex items-center
      `}
   }
`

const Nav = () => {
   const user = useUser()
   const { isMobile } = useMobile()

   const { closeMenu, isOpen } = useMenu()
   let Component = SignIn
   const { isOpen: isModalOpen, openModal, closeModal } = useModal()
   const [type, setType] = useState('signIn')

   if (type == 'singIn') {
      Component = SignIn
   } else if (type == 'signUp') {
      Component = SignUp
   }

   const handleSignInClick = () => {
      setType('signIn')
      openModal()
   }

   const handleSignUpClick = () => {
      setType('signUp')
      openModal()
   }

   /* Menu */
   const handleOutsideClick = e => {
      if (e.target.localName !== 'nav' && isOpen) {
         closeMenu()
      }
   }

   useEffect(() => {
      const els = document.querySelectorAll('.animation-link')
      if (window.screen.width <= 1280) {
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

   /* /Menu */

   return (
      <>
         <NavStyles isOpen={isOpen}>
            <Links spy={false} />
            {user ? (
               <UserStyles>
                  <Tooltip
                     wrapper={false}
                     elem={
                        <div>
                           <FaUserAlt />
                           <Link href="profile">
                              <a className="animation-link">Profile</a>
                           </Link>
                        </div>
                     }
                  >
                     <SignOut />
                  </Tooltip>
                  {isMobile && <SignOut />}
               </UserStyles>
            ) : (
               <span className="buttons">
                  <Button isGradient onClick={handleSignInClick}>
                     Sign In
                  </Button>
                  <Button onClick={handleSignUpClick}>Sign Up</Button>
               </span>
            )}
            <CloseButton className="close" onClick={closeMenu}>
               &times;
            </CloseButton>
         </NavStyles>
         <Modal isOpen={isModalOpen} closeModal={closeModal} customStyles>
            <AnimationStyles>
               <TransitionGroup>
                  <CSSTransition
                     unmountOnExit
                     classNames="modal"
                     className="modal"
                     key={type}
                     timeout={{ enter: 400, exit: 400 }}
                  >
                     <Component setType={setType} />
                  </CSSTransition>
               </TransitionGroup>
            </AnimationStyles>
         </Modal>
      </>
   )
}

export default Nav
