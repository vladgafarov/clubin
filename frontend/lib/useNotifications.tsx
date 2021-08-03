import { createContext, Provider, useContext, useState } from 'react'
import { add, Data, remove } from './utils/arrayAddRemove'

export interface INotifications {
   notifications: Data[]
   removeNotification?: (item: Data) => void
   addNotification?: (text: string) => void
}

const LocalStateContext = createContext<INotifications | null>(null)
const LocalStateProvider = LocalStateContext.Provider

export const NotificationsStateProvider = ({ children }) => {
   const [notifications, setNotifications] = useState<Data[]>([])

   const addNotification = (text: string) => {
      setNotifications(add(notifications, text))
   }

   const removeNotification = (item: Data) => {
      setNotifications(remove(notifications, item.id))
   }

   const contextValue: INotifications = {
      notifications,
      addNotification,
      removeNotification,
   }

   return (
      <LocalStateProvider value={contextValue}>{children}</LocalStateProvider>
   )
}

export const useNotifications = () => {
   const all = useContext(LocalStateContext)
   return all
}
