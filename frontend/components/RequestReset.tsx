import Form from './styles/Form'
import useForm from '../lib/useForm'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import DisplayError from './ErrorMessage'
import Button from './styles/Button'

const REQUEST_RESET_MUTATION = gql`
   mutation REQUEST_RESET_MUTATION($email: String!) {
      sendUserPasswordResetLink(email: $email) {
         code
         message
      }
   }
`

const RequestReset = ({ children }) => {
   const { inputs, handleChange, resetForm } = useForm({
      email: '',
   })

   const [signup, { data, loading, error }] = useMutation(
      REQUEST_RESET_MUTATION,
      {
         variables: inputs,
         // refetchQueries: [{ query: CURRENT_USER_QUERY }],
      }
   )

   const handleSubmit = async e => {
      e.preventDefault()
      await signup().catch(console.error)
      resetForm()
   }

   return (
      <Form method="POST" onSubmit={handleSubmit}>
         <h2>Request a password reset</h2>
         <DisplayError error={error} />
         <fieldset>
            {data?.sendUserPasswordResetLink === null && (
               <p>Success! Check your email for a link!</p>
            )}
            <label htmlFor="email">
               Email
               <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  autoComplete="email"
                  value={inputs.email}
                  onChange={handleChange}
                  required
               />
            </label>
            <Button type="submit">Request reset</Button>
         </fieldset>
         {children}
      </Form>
   )
}

export default RequestReset
