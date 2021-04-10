import { gql, useMutation } from '@apollo/client'
import { useModal } from '../lib/modalState'
import useForm from '../lib/useForm'
import DisplayError from './ErrorMessage'
import Button from './styles/Button'
import Form from './styles/Form'
import { CURRENT_USER_QUERY, useUser } from './User'

const SIGNIN_MUTATION = gql`
   mutation SIGNIN_MUTATION($email: String!, $password: String!) {
      authenticateUserWithPassword(email: $email, password: $password) {
         ... on UserAuthenticationWithPasswordSuccess {
            item {
               id
               email
               name
            }
         }
         ... on UserAuthenticationWithPasswordFailure {
            code
            message
         }
      }
   }
`

const SignIn = ({ openModal }) => {
   const { inputs, handleChange, resetForm } = useForm({
      email: '',
      password: '',
   })

   const { data: userData } = useUser()
   const user = userData?.authenticatedItem

   const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
      variables: inputs,
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
   })

   const error =
      data?.authenticateUserWithPassword.__typename ===
      'UserAuthenticationWithPasswordFailure'
         ? data?.authenticateUserWithPassword
         : undefined

   const handleSubmit = async e => {
      e.preventDefault()
      await signin()
      // if (error == undefined) {
      //    resetForm()
      //    closeModal()
      // }
   }

   return (
      <Form method="POST" onSubmit={handleSubmit}>
         <h1>Sign In:</h1>
         <DisplayError error={error} />
         <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor="email">
               Email: <br />
               <input
                  value={inputs.email}
                  onChange={handleChange}
                  type="email"
                  name="email"
                  placeholder="Your email"
                  required
               />
            </label>
            <label htmlFor="password">
               Password: <br />
               <input
                  value={inputs.password}
                  onChange={handleChange}
                  type="password"
                  name="password"
                  placeholder="Your password"
                  required
               />
            </label>
            <Button isGradient>Sign In</Button>
         </fieldset>
         <div className="bottom">
            <span>OR</span>
            <br />
            <span className="link" onClick={() => openModal('signIn')}>
               Sign Up
            </span>
         </div>
      </Form>
   )
}

export default SignIn
