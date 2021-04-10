import Image from 'next/image'
import { RiMapPinLine } from 'react-icons/ri'

const ArtistItem = ({ item }) => {
   return (
      <div className="slide">
         {/* <div className="slide-top">
            <div className="flex items-center">
               <RiMapPinLine color="#A919D8" size="25" />
               <span className="text-blue-400 font-pm">{item.place}</span>
            </div>
            <span className="text-blue-400">Musician</span>
         </div> */}
         {item.photo?.image.publicUrlTransformed ? (
            <Image
               src={item.photo?.image.publicUrlTransformed}
               width="550"
               height="152"
               alt={item.photo.altText}
            />
         ) : (
            <Image
               src="/images/img4.png"
               width="600"
               height="152"
               alt="Super musician"
            />
         )}
         <div className="slide-bottom">
            <h2>{item.name}</h2>
            <hr />
            <p>{item.description}</p>
         </div>
      </div>
   )
}

export default ArtistItem
