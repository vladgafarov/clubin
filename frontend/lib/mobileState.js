import { createContext, useState, useContext, useEffect } from 'react'
import { isMobile } from 'react-device-detect'

const LocalStateContext = createContext()
const LocalStateProvider = LocalStateContext.Provider

export const MobileStateProvider = ({ children }) => {
   return (
      <LocalStateProvider
         value={{
            isMobile,
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
