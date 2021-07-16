import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { useUserGlobal } from '../../lib/useUser'
import DisplayError from '../ErrorMessage'

const USER_EVENT_QUERY = gql`
   query USER_EVENT_QUERY($id: ID!) {
      allEvents(where: { user_some: { id: $id } }) {
         name
         time
         description
         id
         place
         musician {
            name
            id
         }
         photo {
            altText
            image {
               publicUrl
            }
         }
      }
   }
`

const Events = () => {
   const { user } = useUserGlobal()
   const { data, loading, error } = useQuery(USER_EVENT_QUERY, {
      variables: {
         id: user?.id,
      },
   })

   if (loading) {
      return <p>Loading...</p>
   }

   if (error) {
      return <DisplayError error={error} />
   }

   return (
      <div>
         {data?.allEvents.map((item, i) => (
            <p key={i}>{item.name}</p>
         ))}
      </div>
   )
}

export default Events
