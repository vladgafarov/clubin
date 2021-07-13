import Modal from './Modal'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styled from 'styled-components'
import SignIn from './Login/SignIn'
import SignUp from './Login/SignUp'
import { useRegisterModal } from '../lib/useRegisterModal'
import RequestReset from './RequestReset'

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

const ModalComponents = {
   SignIn,
   SignUp,
   Reset: RequestReset,
}

const RegisterModal = () => {
   const { isOpen, closeModal, type } = useRegisterModal()
   const Component = ModalComponents[type]

   return (
      <Modal isOpen={isOpen} closeModal={closeModal} customStyles>
         <AnimationStyles>
            <TransitionGroup>
               <CSSTransition
                  unmountOnExit
                  classNames="modal"
                  className="modal"
                  key={type}
                  timeout={{ enter: 400, exit: 400 }}
               >
                  <Component />
               </CSSTransition>
            </TransitionGroup>
         </AnimationStyles>
      </Modal>
   )
}

export default RegisterModal
