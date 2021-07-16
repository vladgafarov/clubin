import { createContext, useContext } from 'react'
import { User, useUser } from '../components/User'

const LocalStateContext = createContext<User | null>(null)
const LocalStateProvider = LocalStateContext.Provider

export const UseUserProvider = ({ children }) => {
   const { user, loading } = useUser()

   const contextValue = {
      user,
      loading,
   }

   return (
      <LocalStateProvider value={contextValue}>{children}</LocalStateProvider>
   )
}

export const useUserGlobal = () => {
   const all = useContext(LocalStateContext)
   return all
}
