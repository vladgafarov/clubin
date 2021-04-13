import formatDate from '../../lib/event/formatDate'
import { useMobile } from '../../lib/mobileState'

const EventSliderItem = ({ item, handleClick, openModal }) => {
   const { isMobile } = useMobile()
   const date = formatDate(new Date(item.time))

   return (
      <div className="event" onClick={() => handleClick(item.id)}>
         <div className="date flex sm:flex-col sm:items-start lg:flex-row lg:items-center">
            <p className="text-purple-600 text-4xl sm:text-3xl lg:text-5xl font-pb">
               {date.dayOfMonth}
            </p>
            <p className="day text-blue-400 text-left pl-2 sm:pl-0 lg:pl-2 font-pm flex flex-col">
               <span className="text-md lg:text-lg">{date.month}</span>
               <span className="day-span text-md">{date.dayOfWeek}</span>
            </p>
         </div>
         <div className="title col-span-2">
            <h2
               className="font-pb text-xl text-center underline xl:no-underline"
               onClick={isMobile ? openModal : () => {}}
            >
               {item.name}
            </h2>
         </div>
         <div className="time text-blue-400">
            <span>{date.time}</span>
         </div>
         <button type="button" className="bg-purple-500 font-pb">
            Book Event
         </button>
      </div>
   )
}

export default EventSliderItem
