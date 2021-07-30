import { motion } from 'framer-motion'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useUserGlobal } from '../../lib/useUser'

const ProfileInfoStyles = styled.div`
   ${tw`mb-4`}
   span:first-of-type {
      ${tw`text-base`}
   }
   span:last-of-type {
      ${tw`
         text-2xl
         border-b-2 border-gray-500
         font-pm
      `}
   }
`

const variants = {
   visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, stiffness: 500, damping: 50 },
   },
   hidden: { opacity: 0, y: 10 },
}

const ProfileInfo = ({ controls }) => {
   const { user } = useUserGlobal()

   return (
      <motion.div variants={variants} initial="hidden" animate={controls}>
         <ProfileInfoStyles>
            <span>Name:</span>
            <br />
            <span>{user?.name}</span>
         </ProfileInfoStyles>
         <ProfileInfoStyles>
            <span>Email:</span>
            <br />
            <span>{user?.email}</span>
         </ProfileInfoStyles>
      </motion.div>
   )
}

export default ProfileInfo
