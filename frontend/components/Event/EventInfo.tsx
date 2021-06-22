import Image from 'next/image'
import styled from 'styled-components'
import tw from 'twin.macro'
import { AiOutlineCalendar } from 'react-icons/ai'
import { RiMapPinLine } from 'react-icons/ri'
import { format } from 'date-fns'
import { useContext } from 'react'
import { BookEventContext } from './BookEventContext'

const EventInfoStyles = styled.div`
   position: relative;
   transition: 0.4s ease-in-out;

   ${tw`col-span-3 mr-12 rounded-xl`}
   img {
      object-fit: cover;
   }
   .event-info__text {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: rgba(22, 38, 64, 0.6);
      ${tw`py-4 px-7`}
   }
   .event-info__text .top {
      ${tw`flex justify-between items-center`}
   }
   .event-info__text .bottom {
      ${tw`text-right`}
   }
`

const EventInfo = ({ openModal }) => {
   const { currentEvent: event } = useContext(BookEventContext)

   return (
      <>
         <EventInfoStyles className="hidden xl:block">
            {event.photo?.image?.publicUrl ? (
               <Image
                  src={event.photo?.image.publicUrl}
                  height=""
                  width=""
                  sizes="100"
                  alt={event.photo.altText}
               />
            ) : (
               <Image
                  src="/images/img1.png"
                  height=""
                  width=""
                  sizes="100"
                  alt="Best event ever"
               />
            )}
            <div className="event-info__text">
               <div className="top">
                  <h2 className="text-4xl font-pb">{event.name}</h2>
                  <p className="flex items-center space-x-2">
                     <AiOutlineCalendar color="#A919D8" size="25" />
                     <span className="text-blue-400">
                        {format(new Date(event.time), 'dd.LL.yyy')}
                     </span>
                  </p>
               </div>
               <p className="pt-3 truncate">
                  {event.description && event.description}
               </p>
               <div className="bottom flex items-center space-x-2 justify-between">
                  <button
                     className="underline text-gray-300 hover:text-white"
                     onClick={openModal}
                  >
                     More...
                  </button>
                  <div className="flex space-x-2">
                     <RiMapPinLine color="#A919D8" size="25" />
                     <span className="text-blue-400">{event.place}</span>
                  </div>
               </div>
            </div>
         </EventInfoStyles>
      </>
   )
}

export default EventInfo
