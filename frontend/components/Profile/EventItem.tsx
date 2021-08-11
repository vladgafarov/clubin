import { useMutation } from '@apollo/client'
import { format } from 'date-fns'
import Image from 'next/image'
import { AiOutlineCalendar } from 'react-icons/ai'
import { FiMoreVertical } from 'react-icons/fi'
import { RiMapPinLine } from 'react-icons/ri'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useModal } from '../../lib/useModal'
import { useUserGlobal } from '../../lib/useUser'
import { UNBOOK_EVENT_MUTATION } from '../Event/Event'
import LoadingOverlay from '../LoadingOverlay'
import Modal from '../Modal'
import Tooltip from '../Tooltip'
import { USER_EVENT_QUERY } from './Events'
import wait from 'waait'
import { motion } from 'framer-motion'
import { useNotifications } from '../../lib/useNotifications'

const ItemStyles = styled.div`
   ${tw`
      border-2 border-gray-600
      rounded-lg
      flex items-stretch
      w-full
      overflow-hidden
      shadow-xl
      transform
      transition
   `}
   > div:last-child {
      ${tw`p-4 lg:p-4`}
      h1 {
         ${tw`text-2xl font-pb`}
      }
   }
`

const variants = {
   visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
         delay: i * 0.25,
         damping: 50,
         stinffness: 500,
      },
   }),
   hidden: { opacity: 0, y: 10 },
}

const EventItem = ({
   item,
   custom,
   controls,
   setSelectedIdEvent,
   selectedIdEvent,
}) => {
   const {
      user: { id: userId },
   } = useUserGlobal()

   const { addNotification } = useNotifications()

   const { isOpen, openModal, closeModal } = useModal()

   const [unBookEvent, { loading, error, called }] = useMutation(
      UNBOOK_EVENT_MUTATION,
      {
         variables: {
            id: item.id,
            userId,
         },
      }
   )

   const handleUnbookClick = async () => {
      await unBookEvent({
         refetchQueries: [
            {
               query: USER_EVENT_QUERY,
               variables: { id: userId },
            },
         ],
      }).then(() => addNotification('Canceled event'))
      await wait(1000)
      closeModal()
   }

   return (
      <motion.div
         custom={custom}
         variants={variants}
         initial="hidden"
         animate={controls}
         exit="hidden"
         layoutId={item.id}
      >
         <ItemStyles>
            <motion.div
               layoutId={`image-${item.id}`}
               className="flex-none relative w-1/3"
            >
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
            </motion.div>
            <div className="flex-auto">
               <div className="flex items-start justify-between">
                  <h1>{item.name}</h1>
                  <Tooltip
                     triggerOnClick={true}
                     content={
                        <button
                           onClick={openModal}
                           className="w-full py-0.5 px-2 transition hover:bg-red-700"
                        >
                           Cancel
                        </button>
                     }
                     arrow={false}
                     placement="bottom-end"
                  >
                     <FiMoreVertical
                        size="28"
                        className="cursor-pointer p-1 mt-0.5 rounded-sm transition hover:bg-gray-700"
                     />
                  </Tooltip>
               </div>
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
               <button onClick={() => setSelectedIdEvent(item.id)}>More</button>
            </div>
         </ItemStyles>
         <Modal isOpen={isOpen} closeModal={closeModal}>
            {error && <p className="text-red-500">{error?.message}</p>}
            <LoadingOverlay loading={loading} />
            <h1 className="font-pb text-2xl">
               Do you really want to cancel the event?
            </h1>
            <div className="flex flex-wrap mt-2">
               <button
                  onClick={handleUnbookClick}
                  className="flex-1 font-pm border-2 rounded-lg py-2 px-4 transition border-green-500 hover:bg-green-500 hover:text-white focus:bg-green-700"
               >
                  Yes
               </button>
               <button
                  onClick={closeModal}
                  className="text-white flex-1 ml-3 font-pm border-2 rounded-lg py-2 px-4 transition border-red-500 bg-red-500 hover:bg-red-600 focus:bg-red-700"
               >
                  No
               </button>
            </div>
         </Modal>
      </motion.div>
   )
}

export default EventItem
