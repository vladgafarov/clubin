import Slider from 'react-slick'
import styled from 'styled-components'
import tw from 'twin.macro'
import PrevArrow from '../slider/PrevArrow'
import NextArrow from '../slider/NextArrow'
import eventSlider from '../../lib/event/eventSlider'
import EventSliderItem from './EventSliderItem'
import Modal from '../Modal'
import { useModal } from '../../lib/useModal'
import { format } from 'date-fns'
import ModalButton from './ModalButton'
import DisplayError from '../ErrorMessage'
import { useContext } from 'react'
import { BookEventContext } from './BookEventContext'

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

const EventSlider = ({ events, handleClick }) => {
   const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipe: false,
      nextArrow: <NextArrow isEvent />,
      prevArrow: <PrevArrow />,
      responsive: [
         {
            breakpoint: 1025,
            settings: {
               swipe: true,
            },
         },
      ],
   }

   const {
      bookMutationResult: { error },
      unBookMutationResult: { error: cancelError },
      currentEvent,
      openModal,
   } = useContext(BookEventContext)

   const newEvents = eventSlider(5, events)

   const {
      isOpen: isBookModalOpen,
      openModal: openBookModal,
      closeModal: closeBookModal,
   } = useModal()

   if (!currentEvent) {
      return <p>Nothing</p>
   }

   return (
      <>
         <Slider {...settings} className="sm:-ml-8 max-w-full">
            {newEvents.map((arr, i) => {
               return (
                  <div className="slide" key={i}>
                     {arr.map(item => {
                        return (
                           <EventSliderItem
                              key={item.id}
                              item={item}
                              handleClick={handleClick}
                              openModal={openModal}
                              openBookModal={openBookModal}
                           />
                        )
                     })}
                  </div>
               )
            })}
         </Slider>
         <Modal isOpen={isBookModalOpen} closeModal={closeBookModal}>
            <h2 className="text-2xl mb-3 font-pb">Event Information</h2>
            <EventInfoStyles>
               <div>
                  <span>Name:</span>
                  <span>{currentEvent.name}</span>
                  <div className="border"></div>
               </div>
               <div>
                  <span>Place:</span>
                  <span>{currentEvent.place}</span>
                  <div className="border"></div>
               </div>
               <div>
                  <span>Time:</span>
                  <span>
                     {format(new Date(currentEvent.time), 'dd.LL.yyy')}
                  </span>
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
      </>
   )
}

export default EventSlider
