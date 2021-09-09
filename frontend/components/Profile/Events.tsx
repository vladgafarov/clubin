import styled from 'styled-components'
import tw from 'twin.macro'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { useUserGlobal } from '../../lib/useUser'
import DisplayError from '../ErrorMessage'
import EventItem from './EventItem'
import EventsLoader from './EventsLoader'

export const USER_EVENT_QUERY = gql`
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

const EventStyles = styled.div`
   ${tw`grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-6`}
`

const Events = ({ controls }) => {
   const { user } = useUserGlobal()
   const { data, loading, error } = useQuery(USER_EVENT_QUERY, {
      variables: {
         id: user?.id,
      },
   })

   return (
      <>
         {loading ? (
            <EventsLoader />
         ) : (
            <EventStyles>
               {error && <DisplayError error={error} />}
               {data?.allEvents.length == 0 && <p>Nothing to show!</p>}
               {data?.allEvents.map((item, i) => (
                  <EventItem
                     custom={i}
                     controls={controls}
                     key={item.id}
                     item={item}
                  />
               ))}
            </EventStyles>
         )}
      </>
   )
}

export default Events
