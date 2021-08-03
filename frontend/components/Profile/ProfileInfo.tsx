import { motion } from 'framer-motion'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useUserGlobal } from '../../lib/useUser'
import Button from '../styles/Button'
import Tooltip from '../Tooltip'
import EmailInput from './EmailInput'
import NameInput from './NameInput'

const ProfileInfoStyles = styled.div`
   ${tw`mb-4`}
   span {
      ${tw`text-base`}
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
            <NameInput value={user?.name} id={user?.id} />
         </ProfileInfoStyles>
         <ProfileInfoStyles>
            <span>Email:</span>
            <br />
            <EmailInput value={user?.email} id={user?.id} />
         </ProfileInfoStyles>
         <Tooltip content="Cannot change yet" placement="top">
            <Button>Change password</Button>
         </Tooltip>
      </motion.div>
   )
}

export default ProfileInfo
