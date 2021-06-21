import Modal from '../Modal'
import styled from 'styled-components'
import tw from 'twin.macro'
import { AiOutlineCalendar } from 'react-icons/ai'
import { RiMapPinLine } from 'react-icons/ri'
import { format } from 'date-fns'
import { ModalButton } from './ModalButtonStyles'

const EventModal = ({ event, isOpen, closeModal }) => {
   return (
      <Modal isOpen={isOpen} closeModal={closeModal}>
         <h1 className="text-3xl mb-2 font-pb">{event.name}</h1>
         <div className="flex items-center space-x-2">
            <AiOutlineCalendar color="#A919D8" size="25" />
            <span className="text-blue-500">
               {format(new Date(event.time), 'dd.LL.yyy')}
            </span>
         </div>
         <div className="flex space-x-2">
            <RiMapPinLine color="#A919D8" size="25" />
            <span className="text-blue-500">{event.place}</span>
         </div>
         <p className="py-2">{event.description}</p>
         <div className="flex flex-wrap">
            {event.musician.map(item => (
               <p
                  className="bg-gray-400 rounded-full py-1 px-4 text-white mb-2 mr-3"
                  key={item.id}
               >
                  {item.name}
               </p>
            ))}
         </div>

         <ModalButton type="button">Book Event</ModalButton>
      </Modal>
   )
}

export default EventModal
