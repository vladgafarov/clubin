import Router from 'next/router'
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
   setReset: () => void
}

export type modalType = 'SignIn' | 'SignUp' | 'Reset'

const LocalStateContext = createContext<IRegisterModal | null>(null)
const LocalStateProvider = LocalStateContext.Provider

export const RegisterModalStateProvider = ({ children }) => {
   const { isOpen, openModal, closeModal } = useModal()

   const [type, setType] = useState<modalType>('SignIn')

   const handleSignInClick = () => {
      setType('SignIn')
      openModal()

      // Router.push({}, 'signin?token=skfjljl')
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

   const setReset = () => {
      setType('Reset')
   }

   const contextValue: IRegisterModal = {
      isOpen,
      closeModal,
      handleSignInClick,
      handleSignUpClick,
      type,
      setSignIn,
      setSignUp,
      setReset,
   }

   return (
      <LocalStateProvider value={contextValue}>{children}</LocalStateProvider>
   )
}

export const useRegisterModal = () => {
   const all = useContext(LocalStateContext)
   return all
}
