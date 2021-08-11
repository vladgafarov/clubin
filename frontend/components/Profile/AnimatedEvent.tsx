import { motion } from 'framer-motion'
import styled from 'styled-components'
import tw from 'twin.macro'
import Image from 'next/image'

const AnimatedEventStyles = styled(motion.div)`
   ${tw`
      absolute inset-0 flex justify-center items-center
   `}
   .overlay {
      ${tw`absolute inset-0 bg-black bg-opacity-70 z-40 `}
   }
   .content {
      ${tw`
         z-50 w-3/5
         bg-white rounded-xl 
         relative 
         text-black 
         overflow-hidden`}
      .close {
         ${tw`
            absolute top-2 right-2 
            text-2xl text-black cursor-pointer text-center 
            w-8 h-8 
            bg-white 
            rounded-full 
            transition 
            hover:text-white hover:bg-gray-700`}
      }
   }
`

const AnimatedEvent = ({
   setSelectedIdEvent,
   selectedIdEvent,
   currentEvent,
}) => {
   return (
      <AnimatedEventStyles>
         <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIdEvent(undefined)}
         ></motion.div>

         <motion.div className="content" layoutId={selectedIdEvent}>
            <motion.div
               layoutId={`image-${currentEvent.id}`}
               className="relative h-80"
            >
               {currentEvent.photo?.image?.publicUrl ? (
                  <Image
                     className="absolute inset-0 object-cover"
                     src={currentEvent.photo?.image.publicUrl}
                     layout="fill"
                     alt={currentEvent.photo?.altText}
                  />
               ) : (
                  <Image
                     className="absolute inset-0 object-cover"
                     src="/images/img12.png"
                     layout="fill"
                     alt="Best event ever"
                  />
               )}
            </motion.div>
            <motion.div
               className="p-4"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
            >
               <h1 className="text-2xl font-pb">{currentEvent.name}</h1>
               <p>{currentEvent.description}</p>
               <div className="flex flex-wrap mt-2">
                  {currentEvent?.musician.map(item => (
                     <p
                        className="bg-purple-800 rounded-full py-1 px-4 text-white mb-2 mr-3"
                        key={item.id}
                     >
                        {item.name}
                     </p>
                  ))}
               </div>
            </motion.div>
            <motion.span
               exit={{ opacity: 0 }}
               className="close"
               onClick={() => setSelectedIdEvent(undefined)}
            >
               &times;
            </motion.span>
         </motion.div>
      </AnimatedEventStyles>
   )
}

export default AnimatedEvent
