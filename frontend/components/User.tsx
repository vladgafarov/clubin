import { gql, useQuery } from '@apollo/client'

export const CURRENT_USER_QUERY = gql`
   query {
      authenticatedItem {
         ... on User {
            id
            email
            name
         }
      }
   }
`

export type User = {
   user: {
      email: string
      name: string
      id: string
      __typename: string
   }
   loading: boolean
}

export const useUser = () => {
   const { data, loading, error } = useQuery(CURRENT_USER_QUERY)
   return {
      user: data?.authenticatedItem,
      loading,
   } as User
}
