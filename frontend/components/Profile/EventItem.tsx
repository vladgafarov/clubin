import { format } from 'date-fns'
import Image from 'next/image'
import { AiOutlineCalendar } from 'react-icons/ai'
import { RiMapPinLine } from 'react-icons/ri'
import styled from 'styled-components'
import tw from 'twin.macro'

const ItemStyles = styled.div`
   /* flex: 1 1 0; */
   ${tw`
      border-2 border-gray-600
      rounded-lg
      flex items-stretch
      w-full
      overflow-hidden
      shadow-xl
   `}
   > div:last-child {
      ${tw`p-4 lg:p-4`}
      h1 {
         ${tw`text-2xl font-pb`}
      }
   }
`

const EventItem = ({ item }) => {
   return (
      <ItemStyles>
         <div className="flex-none relative w-1/3">
            {item.photo?.image?.publicUrl ? (
               <Image
                  className="absolute inset-0 object-cover"
                  src={item.photo?.image.publicUrl}
                  layout="fill"
                  alt={item.photo?.altText}
               />
            ) : (
               <Image
                  className="absolute inset-0 object-cover"
                  src="/images/img12.png"
                  layout="fill"
                  alt="Best event ever"
               />
            )}
         </div>
         <div>
            <h1>{item.name}</h1>
            <div className="flex items-center space-x-2">
               <AiOutlineCalendar color="#A919D8" size="25" />
               <span className="text-blue-500">
                  {format(new Date(item.time), 'dd.LL.yyy')}
               </span>
            </div>
            <div className="flex items-center space-x-2">
               <RiMapPinLine color="#A919D8" size="25" />
               <span className="text-blue-500">{item.place}</span>
            </div>
         </div>
      </ItemStyles>
   )
}

export default EventItem
