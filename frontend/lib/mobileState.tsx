import { createContext, useContext } from 'react'
import { isMobile, isDesktop } from 'react-device-detect'

const LocalStateContext = createContext(undefined)
const LocalStateProvider = LocalStateContext.Provider

export const MobileStateProvider = ({ children }) => {
   return (
      <LocalStateProvider
         value={{
            isMobile,
            isDesktop,
         }}
      >
         {children}
      </LocalStateProvider>
   )
}

export const useMobile = () => {
   const all = useContext(LocalStateContext)
   return all
}
