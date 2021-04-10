import { useState } from 'react'

export const useModal = () => {
   const [isOpen, setOpen] = useState<boolean>(false)

   const openModal = () => {
      setOpen(true)

      //disable scrolling
      const body = document.body
      body.style.top = `-${window.scrollY}px`
      body.style.position = 'fixed'
      body.style.paddingRight = `15px`
   }

   const closeModal = () => {
      setOpen(false)

      //allow scrolling
      const body = document.body
      const scrollY = body.style.top
      body.style.position = ''
      body.style.top = ''
      body.style.paddingRight = `0`
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
   }

   const toggleModal = () => {
      setOpen(!isOpen)
   }

   return {
      isOpen,
      openModal,
      closeModal,
      toggleModal,
   }
}
