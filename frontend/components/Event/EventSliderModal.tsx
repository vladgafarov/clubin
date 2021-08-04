import { format } from 'date-fns'
import { useContext } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useModal } from '../../lib/useModal'
import DisplayError from '../ErrorMessage'
import LoadingOverlay from '../LoadingOverlay'
import Modal from '../Modal'
import { BookEventContext } from './BookEventContext'
import ModalButton from './ModalButton'

const EventInfoStyles = styled.div`
   ${tw`mb-3`}
   div {
      position: relative;
      ${tw`
         flex justify-between items-center   
      `}
      span {
         ${tw`
            bg-white z-20
            text-lg
         `}
         &:first-of-type {
            padding-right: 1px;
         }
         &:last-of-type {
            ${tw`
               font-pb
               text-xl
            `}
         }
      }
      .border {
         border: none;
         border-bottom: 2px dotted #d1d5db;
         ${tw`
            absolute
            z-10
            bottom-2 left-0 w-full
         `}
      }
   }
`

const EventSliderModal = ({ item, isOpen, closeModal }) => {
   const {
      bookMutationResult: { error, loading },
      unBookMutationResult: { error: cancelError, cancelLoading },
   } = useContext(BookEventContext)

   return (
      <Modal isOpen={isOpen} closeModal={closeModal}>
         <LoadingOverlay loading={loading || cancelLoading} />
         <h2 className="text-2xl mb-3 font-pb">Event Information</h2>
         <EventInfoStyles>
            <div>
               <span>Name:</span>
               <span>{item.name}</span>
               <div className="border"></div>
            </div>
            <div>
               <span>Place:</span>
               <span>{item.place}</span>
               <div className="border"></div>
            </div>
            <div>
               <span>Time:</span>
               <span>{format(new Date(item.time), 'dd.LL.yyy')}</span>
               <div className="border"></div>
            </div>
            <div>
               <span>Price:</span>
               <span>$250</span>
               <div className="border"></div>
            </div>
         </EventInfoStyles>
         {(error || cancelError) && (
            <DisplayError error={error || cancelError} />
         )}
         <ModalButton />
      </Modal>
   )
}

export default EventSliderModal
