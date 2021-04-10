import { createContext, useState, useContext } from 'react'

const LocalStateContext = createContext(undefined)
const LocalStateProvider = LocalStateContext.Provider

export const ModalStateProvider = ({ children }) => {
   const [isModalOpen, setModalOpen] = useState<boolean>(false)

   const openModal = () => {
      setModalOpen(true)

      //disable scrolling
      const body = document.body
      body.style.top = `-${window.scrollY}px`
      body.style.position = 'fixed'
      body.style.paddingRight = `15px`
   }

   const closeModal = () => {
      setModalOpen(false)

      //allow scrolling
      const body = document.body
      const scrollY = body.style.top
      body.style.position = ''
      body.style.top = ''
      body.style.paddingRight = `0`
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
   }

   return (
      <LocalStateProvider
         value={{
            isModalOpen,
            openModal,
            closeModal,
         }}
      >
         {children}
      </LocalStateProvider>
   )
}

export const useModal = () => {
   const all = useContext(LocalStateContext)
   return all
}
