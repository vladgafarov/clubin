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

const ProfileInfo = () => {
   const { user } = useUserGlobal()

   return (
      <>
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
      </>
   )
}

export default ProfileInfo
