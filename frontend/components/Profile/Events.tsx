import styled from 'styled-components'
import tw from 'twin.macro'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { useUserGlobal } from '../../lib/useUser'
import DisplayError from '../ErrorMessage'
import EventItem from './EventItem'
import { motion } from 'framer-motion'

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

const EventStyles = styled(motion.div)`
   ${tw`grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-6`}
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
      <EventStyles>
         {error && <DisplayError error={error} />}
         {data?.allEvents.length == 0 && <p>Nothing to show!</p>}
         {data?.allEvents.map((item, i) => (
            <EventItem item={item} />
         ))}
      </EventStyles>
   )
}

export default Events
