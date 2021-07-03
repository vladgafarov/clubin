import Button from './styles/Button'
import { padding } from './Page'
import styled from 'styled-components'
import tw from 'twin.macro'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import SignIn from './Login/SignIn'
import { useModal } from '../lib/useModal'
import { useState } from 'react'
import SignUp from './Login/SignUp'
import Modal from './Modal'
import { useRegisterModal } from '../lib/useRegisterModal'

const RegisterStyles = styled.section`
   background-image: url('/images/img6.png');
   background-repeat: no-repeat;
   background-size: cover;
   background-position: center;
   ${tw`py-9 flex justify-center relative`}
   &::before {
      content: '';
      position: absolute;
      ${tw`inset-0`}
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1;
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

const RegisterNow = () => {
   const { handleSignUpClick } = useRegisterModal()

   return (
      <>
         <RegisterStyles className={padding}>
            <Button
               isGradient
               className="z-10 relative"
               onClick={handleSignUpClick}
            >
               Register Now
            </Button>
         </RegisterStyles>
      </>
   )
}

export default RegisterNow
