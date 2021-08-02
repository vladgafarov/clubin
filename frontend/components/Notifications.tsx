import styled from 'styled-components'
import tw from 'twin.macro'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { MdClose } from 'react-icons/md'
import { add, remove } from '../lib/utils/arrayAddRemove'
import { useEffect } from 'react'

const UlStyles = styled(motion.ul)`
   ${tw`
      fixed w-5/6 md:w-2/5 lg:w-1/4 right-5 bottom-5 list-none z-50
   `}
   li {
      ${tw`
         relative
         w-full 
         bg-white rounded 
         p-3 mt-3
         border-l-4 border-green-600 
         text-black
     `}
      h1 {
         ${tw`text-xl font-pb`}
      }
   }
`

const CloseButton = styled.div`
   ${tw`
      absolute top-1 right-1 
      p-1 
      flex items-center justify-center 
      cursor-pointer
   `}
`

const Notifications = () => {
   const [notifications, setNotifications] = useState([])

   useEffect(() => {
      const timer = setTimeout(() => {
         setNotifications(remove(notifications, notifications[0]))
      }, 4000)

      return () => {
         clearTimeout(timer)
      }
   }, [notifications])

   return (
      <UlStyles>
         <AnimatePresence>
            {notifications.map(id => (
               <motion.li
                  key={id}
                  layout
                  initial={{ opacity: 0, y: 50, scale: 0.3 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{
                     opacity: 0,
                     scale: 0.5,
                     transition: { duration: 0.2 },
                  }}
               >
                  <h1>Success!</h1>
                  <p>Lorem, ipsum dolor.</p>
                  <CloseButton
                     onClick={() => setNotifications(remove(notifications, id))}
                  >
                     <MdClose />
                  </CloseButton>
               </motion.li>
            ))}
         </AnimatePresence>
         <button onClick={() => setNotifications(add(notifications))}>+</button>
      </UlStyles>
   )
}

export default Notifications
