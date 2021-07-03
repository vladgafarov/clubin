import { createContext, useContext, useState } from 'react'
import { useModal } from './useModal'

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

   return (
      <LocalStateProvider
         value={{
            isOpen,
            closeModal,
            handleSignInClick,
            handleSignUpClick,
            type,
            setType,
            setSignIn,
            setSignUp,
         }}
      >
         {children}
      </LocalStateProvider>
   )
}

export const useRegisterModal = () => {
   const all = useContext(LocalStateContext)
   return all
}
