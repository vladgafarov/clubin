import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import styled from 'styled-components'
import tw from 'twin.macro'
import { CURRENT_USER_QUERY } from './User'

const SIGNOUT_MUATION = gql`
   mutation {
      endSession
   }
`

const Button = styled.button`
   ${tw`text-gray-300`}
`

const SignOut = () => {
   const [signout] = useMutation(SIGNOUT_MUATION, {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
   })
   return (
      <Button type="button" onClick={signout}>
         Sign Out
      </Button>
   )
}

export default SignOut
