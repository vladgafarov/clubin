import Slider from 'react-slick'
import PrevArrow from '../slider/PrevArrow'
import NextArrow from '../slider/NextArrow'
import eventSlider from '../../lib/event/eventSlider'
import EventSliderItem from './EventSliderItem'
import gql from 'graphql-tag'
import { useUser } from '../User'
import { useMutation } from '@apollo/client'

const BOOK_EVENT_MUTATION = gql`
   mutation BOOK_EVENT_MUTATION($id: ID!, $userId: ID!) {
      updateEvent(id: $id, data: { user: { connect: { id: $userId } } }) {
         user {
            name
         }
      }
   }
`

const EventSlider = ({ events, handleClick, openModal }) => {
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

   const newEvents = eventSlider(5, events)

   const user = useUser()
   const [bookEvent, mutationResponse] = useMutation(BOOK_EVENT_MUTATION)

   const handleBookClick = async itemId => {
      await bookEvent({
         variables: {
            id: itemId,
            userId: user.id,
         },
      })
   }

   return (
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
                           handleBookClick={handleBookClick}
                           openModal={openModal}
                        />
                     )
                  })}
               </div>
            )
         })}
      </Slider>
   )
}

export default EventSlider
