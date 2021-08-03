import { Dispatch, SetStateAction, useState } from 'react'
import { add, Data, remove } from './utils/arrayAddRemove'

export interface INotifications {
   notifications: Data[]
   removeNotification?: (item: Data) => void
   addNotification?: (text: string) => void
   setNotifications?: Dispatch<SetStateAction<Data[]>>
}

const useNotifications = (): INotifications => {
   const [notifications, setNotifications] = useState<Data[]>([])

   const addNotification = (text: string) => {
      setNotifications(add(notifications, text))
   }

   const removeNotification = (item: Data) => {
      setNotifications(remove(notifications, item.id))
   }

   return {
      notifications,
      addNotification,
      removeNotification,
   }
}

export default useNotifications
