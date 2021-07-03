import { createContext, useContext, useState } from 'react'
import { useModal } from './useModal'

interface IRegisterModal {
   isOpen: boolean
   type: modalType
   closeModal: () => void
   handleSignInClick: () => void
   handleSignUpClick: () => void
   setSignIn: () => void
   setSignUp: () => void
}

const LocalStateContext = createContext(undefined)
const LocalStateProvider = LocalStateContext.Provider

export type modalType = 'SignIn' | 'SignUp' | 'Reset'

export const RegisterModalStateProvider = ({ children }) => {
   const { isOpen, openModal, closeModal } = useModal()

   const [type, setType] = useState<modalType>('SignIn')

   const handleSignInClick = () => {
      setType('SignIn')
      openModal()
   }

   const setSignIn = () => {
      setType('SignIn')
   }

   const handleSignUpClick = () => {
      setType('SignUp')
      openModal()
   }

   const setSignUp = () => {
      setType('SignUp')
   }

   const contextValue: IRegisterModal = {
      isOpen,
      closeModal,
      handleSignInClick,
      handleSignUpClick,
      type,
      setSignIn,
      setSignUp,
   }

   return (
      <LocalStateProvider value={contextValue}>{children}</LocalStateProvider>
   )
}

export const useRegisterModal = () => {
   const all: IRegisterModal = useContext(LocalStateContext)
   return all
}
