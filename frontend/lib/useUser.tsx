import { createContext, useContext } from 'react'
import { useUser } from '../components/User'

const LocalStateContext = createContext(null)
const LocalStateProvider = LocalStateContext.Provider

export const UseUserProvider = ({ children }) => {
   const user = useUser()

   return <LocalStateProvider value={{ user }}>{children}</LocalStateProvider>
}

export const useUserGlobal = () => {
   const all = useContext(LocalStateContext)
   return all
}
