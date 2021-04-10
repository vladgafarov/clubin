import { createContext, useState, useContext } from 'react'

const LocalStateContext = createContext()
const LocalStateProvider = LocalStateContext.Provider

export const MenuStateProvider = ({ children }) => {
   const [isOpen, setMenu] = useState(false)

   const openMenu = () => {
      setMenu(true)
   }

   const closeMenu = () => {
      setMenu(false)
   }

   return (
      <LocalStateProvider
         value={{
            isOpen,
            openMenu,
            closeMenu,
         }}
      >
         {children}
      </LocalStateProvider>
   )
}

export const useMenu = () => {
   const all = useContext(LocalStateContext)
   return all
}
