import Image from 'next/image'
import styled from 'styled-components'
import tw from 'twin.macro'
import { AiOutlineCalendar } from 'react-icons/ai'
import { RiMapPinLine } from 'react-icons/ri'
import { format } from 'date-fns'
import { useContext } from 'react'
import { BookEventContext } from './BookEventContext'
import { AnimatePresence, motion } from 'framer-motion'

const EventInfoStyles = styled(motion.div)`
   transition: 0.4s ease-in-out;
   ${tw`col-span-3 mr-12 rounded-xl overflow-hidden shadow-xl`}
   &:hover {
      transform: scale(1.02);
      img {
         transform: scale(1.2);
         transition-duration: 5s;
      }
   }
   .event-info__text {
      background-color: rgba(22, 38, 64, 0.6);
      ${tw`py-4 px-7 h-3/5 flex flex-col justify-between`}
   }
   .event-info__text .top {
      ${tw`flex justify-between items-center`}
   }
   .event-info__text .bottom {
      ${tw`text-right`}
   }
`

const EventInfo = () => {
   const { currentEvent: event, openModal } = useContext(BookEventContext)

   if (!event) {
      return <p>Nothing</p>
   }

   return (
      <AnimatePresence exitBeforeEnter>
         <EventInfoStyles
            className="hidden xl:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={event.id}
         >
            <div className="relative h-2/5">
               {event?.photo?.image?.publicUrl ? (
                  <Image
                     src={event?.photo?.image.publicUrl}
                     layout="fill"
                     className="absolute inset-0 object-cover"
                     alt={event?.photo?.altText}
                  />
               ) : (
                  <Image
                     src="/images/img1.png"
                     layout="fill"
                     className="absolute inset-0 object-cover"
                     alt="Best event ever"
                  />
               )}
            </div>

            <div className="event-info__text">
               <div className="top">
                  <h2 className="text-4xl font-pb">{event?.name}</h2>
                  <p className="flex items-center space-x-2">
                     <AiOutlineCalendar color="#A919D8" size="25" />
                     <span className="text-blue-400">
                        {format(new Date(event?.time), 'dd.LL.yyy')}
                     </span>
                  </p>
               </div>
               <p className="pt-3 line-clamp-3">
                  {event?.description && event?.description}
               </p>
               <div className="flex flex-wrap">
                  {event?.musician.map(item => (
                     <p
                        className="bg-purple-800 rounded-full py-1 px-4 text-white mb-2 mr-3"
                        key={item.id}
                     >
                        {item.name}
                     </p>
                  ))}
               </div>
               <div className="bottom flex items-center space-x-2 justify-between">
                  <button
                     className="underline text-gray-300 hover:text-white"
                     onClick={openModal}
                  >
                     More...
                  </button>
                  <div className="flex space-x-2">
                     <RiMapPinLine color="#A919D8" size="25" />
                     <span className="text-blue-400">{event?.place}</span>
                  </div>
               </div>
            </div>
         </EventInfoStyles>
      </AnimatePresence>
   )
}

export default EventInfo
