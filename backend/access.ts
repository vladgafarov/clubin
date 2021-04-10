import { permissionsList } from './schemas/fields'
import { ListAccessArgs } from './types'

export const isSignedIn = ({ session }: ListAccessArgs) => {
   return !!session
}

const generatedPersmissions = Object.fromEntries(
   permissionsList.map(permission => [
      permission,
      ({ session }: ListAccessArgs) => {
         return !!session?.data.role?.[permission]
      },
   ])
)

export const permissions = {
   ...generatedPersmissions,
}

export const rules = {
   canManageProducts({ session }: ListAccessArgs) {
      if (!isSignedIn({ session })) {
         return false
      }
      if (permissions.canManageProducts({ session })) {
         return true
      }

      return { user: { id: session.itemId } }
   },
   canOrder({ session }: ListAccessArgs) {
      if (!isSignedIn({ session })) {
         return false
      }

      if (permissions.canManageCart({ session })) {
         return true
      }

      return { user: { id: session.itemId } }
   },
   canReadProducts({ session }: ListAccessArgs) {
      if (!isSignedIn({ session })) {
         return false
      }
      if (permissions.canManageProducts({ session })) {
         return true
      }

      return { status: 'AVAILABLE' }
   },
   canManageOrderItems({ session }: ListAccessArgs) {
      if (!isSignedIn({ session })) {
         return false
      }
      if (permissions.canManageCart({ session })) {
         return true
      }

      return { order: { user: { id: session.itemId } } }
   },
   canManageUsers({ session }: ListAccessArgs) {
      if (!isSignedIn({ session })) {
         return false
      }

      if (permissions.canManageUsers({ session })) {
         return true
      }

      return { id: session.itemId }
   },
}
