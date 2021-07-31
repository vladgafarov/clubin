import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { MdModeEdit } from 'react-icons/md'
import { TiTick } from 'react-icons/ti'
import styled from 'styled-components'
import tw from 'twin.macro'
import wait from 'waait'

const InputStyles = styled.div`
   ${tw`relative`}
   input {
      ${tw`
         text-black
         px-5 py-3
         border-2 border-gray-400 rounded transition 
         w-full
         font-pm
         ring-2
         ring-transparent
         outline-none
      `}
      &:disabled {
         ${tw`bg-gray-700 text-white`}
      }
      &:not(:disabled) {
         ${tw`
            hover:ring-gray-400
            focus:border-gray-500
         `}
      }
   }
   .icon {
      ${tw`
         absolute
         right-4 top-1/2
         transform -translate-y-1/2
         cursor-pointer
         p-2
         w-9 h-9
         rounded
         transition
         text-gray-400
         hover:text-gray-600
         hover:bg-gray-300
      `}
   }
`

const ButtonsStyles =
   'w-9 h-9 bg-gray-700 p-2 rounded cursor-pointer transition hover:bg-gray-800'

const Input = ({ value }) => {
   const inputEl = useRef(null)

   const [inputValue, setInputValue] = useState<string>(value)
   const [isEditing, setIsEditing] = useState<boolean>(false)

   const handleEditClick = async () => {
      setIsEditing(true)
      await wait(1)
      inputEl.current.focus()
   }

   const handleOutsideInputClick = e => {
      if (e.target.localName !== 'input' && isEditing) {
         setIsEditing(false)
      }
   }

   useEffect(() => {
      window.addEventListener('click', handleOutsideInputClick)

      return () => {
         window.removeEventListener('click', handleOutsideInputClick)
      }
   }, [isEditing])

   return (
      <div className="w-1/3 relative mt-3">
         <InputStyles className="relative">
            <input
               value={inputValue}
               onChange={e => setInputValue(e.currentTarget.value)}
               disabled={!isEditing}
               ref={inputEl}
               type="text"
            />
            <MdModeEdit className="icon" onClick={handleEditClick} />
         </InputStyles>
         <AnimatePresence>
            {isEditing && (
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -right-24 inset-y-0 flex items-center space-x-2"
               >
                  <TiTick className={ButtonsStyles} />
                  <IoClose
                     className={ButtonsStyles}
                     onClick={() => setIsEditing(false)}
                  />
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   )
}

export default Input
