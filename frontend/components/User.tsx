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

export const useUser = () => {
   // const { data, loading, error } = useQuery(CURRENT_USER_QUERY)
   // return { data?.authenticatedItem, loading, error }
   const { data } = useQuery(CURRENT_USER_QUERY)
   return data?.authenticatedItem
}
