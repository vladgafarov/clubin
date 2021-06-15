import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { RiLogoutBoxFill } from 'react-icons/ri'
import styled from 'styled-components'
import tw from 'twin.macro'
import { CURRENT_USER_QUERY } from './User'

const SIGNOUT_MUATION = gql`
   mutation {
      endSession
   }
`

const Button = styled.button`
   ${tw`text-gray-300 flex items-center font-pm text-base`}
`

const SignOut = () => {
   const [signout] = useMutation(SIGNOUT_MUATION, {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
   })
   return (
      <Button type="button" onClick={signout}>
         <RiLogoutBoxFill />
         Sign Out
      </Button>
   )
}

export default SignOut
