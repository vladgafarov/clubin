import Modal from './Modal'
import SignIn from './Login/SignIn'
import SignUp from './Login/SignUp'
import { useRegisterModal } from '../lib/useRegisterModal'
import RequestReset from './Login/RequestReset'
import { AnimatePresence } from 'framer-motion'

export const RegisterModalVariants = {
   initial: { opacity: 0 },
   animate: { opacity: 1, transition: { delay: 0.3 } },
   exit: { opacity: 0 },
}

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
         <AnimatePresence exitBeforeEnter>
            <Component />
         </AnimatePresence>
      </Modal>
   )
}

export default RegisterModal
