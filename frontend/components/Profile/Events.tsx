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

   return (
      <div>
         {error && <DisplayError error={error} />}
         {data?.allEvents.length == 0 && <p>Nothing to show!</p>}
         {data?.allEvents.map((item, i) => (
            <p key={i}>{item.name}</p>
         ))}
      </div>
   )
}

export default Events
