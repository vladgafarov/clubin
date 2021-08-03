import { createContext } from 'react'
import { INotifications } from '../../lib/useNotifications'

export const ProfileContext = createContext<INotifications | null>(null)
