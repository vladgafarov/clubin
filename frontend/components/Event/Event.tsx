import styled from 'styled-components'
import tw from 'twin.macro'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import EventSlider from './EventSlider'
import DisplayError from '../ErrorMessage'
import EventInfo from './EventInfo'
import { useState } from 'react'
import { useModal } from '../../lib/useModal'
import Modal from './Modal'

const EventStyles = styled.div`
   ${tw`
      xl:grid xl:grid-cols-8
      pb-20
   `}
`

const Events = styled.div`
   pointer-events: auto;
   outline: none;
   position: relative;
   ${tw`col-span-5 text-center`}
   z-index: 10;
   h1 {
      background-color: #253243;
      ${tw`text-blue-400 text-left w-auto sm:w-1/6 p-3 font-pb`}
   }
   .slide {
      pointer-events: auto;
      outline: none;
      ${tw`pl-0 sm:pl-8 pr-0 lg:pr-8 pb-8`}
   }
   .slide .event {
      background-color: #20202c;
      box-shadow: 0 0 40px rgba(0, 0, 0, 0.55);
      border-radius: 7px;
      cursor: pointer;
      user-select: text;
      @media (max-width: 768px) {
         box-shadow: none;
         ${tw`border-2 border-purple-900`}
      }
      ${tw`
         flex flex-col
         sm:grid sm:grid-cols-5 
         items-center 
         mt-6 
         transition
      `}
   }
   .slide .event:hover {
      box-shadow: 0 0 40px rgba(0, 0, 0, 0.7);
      transform: scale(1.01);
      @media (max-width: 768px) {
         box-shadow: none;
         transform: scale(1);
      }
   }
   .slide .event .date {
      ${tw`py-2 sm:pl-4`}
   }
   .slide .event .date .day .day-span {
      ${tw`sm:hidden lg:block`}
   }
   .slide .event button {
      border-radius: 7px;
      ${tw`
         py-2 sm:py-0 
         mt-2 sm:mt-0 
         self-stretch 
         transition 
         focus:ring-2 focus:ring-purple-500
      `}
   }
`

const EVENT_QUERY = gql`
   query {
      allEvents {
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

const Event = () => {
   const { data, loading, error } = useQuery(EVENT_QUERY)
   const { isOpen, openModal, closeModal } = useModal()
   const [current, setCurrent] = useState<Object>()

   const handleClick = id => {
      const newEvent = data.allEvents.find(item => item.id === id)
      setCurrent(newEvent)
   }

   return (
      <EventStyles
         className="px-7 md:px-12 lg:px-18 xl:px-12 2xl:px-32"
         id="events"
      >
         {loading ? (
            'Loading...'
         ) : (
            <EventInfo
               event={current ? current : data?.allEvents[0]}
               openModal={openModal}
            />
         )}
         <Events className="events">
            <h1>Events</h1>
            <p className="text-left mt-4">Click to view details</p>
            {error && <DisplayError error={error} />}
            {loading ? (
               'Loading...'
            ) : (
               <EventSlider
                  events={data?.allEvents}
                  currentEvent={current ? current : data?.allEvents[0]}
                  handleClick={handleClick}
                  openModal={openModal}
               />
            )}
         </Events>
         {!loading && (
            <Modal
               event={current ? current : data?.allEvents[0]}
               closeModal={closeModal}
               isOpen={isOpen}
            />
         )}
      </EventStyles>
   )
}

export default Event
