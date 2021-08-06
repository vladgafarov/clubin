import Modal from '../Modal'
import styled from 'styled-components'
import tw from 'twin.macro'
import { AiOutlineCalendar } from 'react-icons/ai'
import { RiMapPinLine } from 'react-icons/ri'
import { format } from 'date-fns'
import ModalButton from './ModalButton'
import { useContext } from 'react'
import { BookEventContext } from './BookEventContext'
import DisplayError from '../ErrorMessage'
import LoadingOverlay from '../LoadingOverlay'

const EventInfoModal = () => {
   const {
      currentEvent: event,
      isOpen,
      closeModal,
      bookMutationResult: { error, loading },
      unBookMutationResult: { error: cancelError, cancelLoading },
   } = useContext(BookEventContext)

   if (!event) {
      return <p>Nothing</p>
   }

   return (
      <Modal isOpen={isOpen} closeModal={closeModal}>
         <LoadingOverlay loading={loading || cancelLoading} />
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
                  className="bg-purple-800 rounded-full py-1 px-4 text-white mb-2 mr-3"
                  key={item.id}
               >
                  {item.name}
               </p>
            ))}
         </div>
         {(error || cancelError) && (
            <DisplayError error={error || cancelError} />
         )}
         <ModalButton />
      </Modal>
   )
}

export default EventInfoModal
