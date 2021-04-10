import Form from './styles/Form'
import useForm from '../lib/useForm'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { CURRENT_USER_QUERY } from './User'
import DisplayError from './ErrorMessage'
import Button from './styles/Button'

const RESET_MUTATION = gql`
   mutation RESET_MUTATION(
      $email: String!
      $password: String!
      $token: String!
   ) {
      redeemUserPasswordResetToken(
         email: $email
         token: $token
         password: $password
      ) {
         code
         message
      }
   }
`

const Reset = ({ token }) => {
   const { inputs, handleChange, resetForm } = useForm({
      email: '',
      password: '',
      token,
   })

   const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
      variables: inputs,
   })

   const successfulError = data?.redeemUserPasswordResetToken?.code
      ? data?.redeemUserPasswordResetToken
      : undefined

   const handleSubmit = async e => {
      e.preventDefault()
      await reset().catch(console.error)
      resetForm()
   }

   return (
      <Form method="POST" onSubmit={handleSubmit}>
         <h2>Reset your password</h2>
         <DisplayError error={error || successfulError} />
         <fieldset>
            {data?.redeemUserPasswordResetToken === null && (
               <p>Success! You can now sign in</p>
            )}
            <label htmlFor="email">
               Email
               <input
                  type="email"
                  name="email"
                  placeholder="Email..."
                  autoComplete="email"
                  value={inputs.email}
                  onChange={handleChange}
               />
            </label>
            <label htmlFor="password">
               Passwod
               <input
                  type="password"
                  name="password"
                  placeholder="Password..."
                  value={inputs.password}
                  onChange={handleChange}
               />
            </label>
            <Button type="submit">Request reset</Button>
         </fieldset>
      </Form>
   )
}

export default Reset
