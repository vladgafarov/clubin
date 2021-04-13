import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import useForm from '../lib/useForm'
import DisplayError from './ErrorMessage'
import Button from './styles/Button'
import Form from './styles/Form'

const SIGNUP_MUTATION = gql`
   mutation SIGNUP_MUTATION(
      $name: String!
      $email: String!
      $password: String!
   ) {
      createUser(data: { name: $name, email: $email, password: $password }) {
         id
         name
         email
      }
   }
`

const SignUp = ({ setType }) => {
   const { inputs, handleChange, resetForm } = useForm({
      name: '',
      email: '',
      password: '',
   })

   const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
      variables: inputs,
   })

   const handleSubmit = async e => {
      e.preventDefault()
      await signup()
      resetForm()
   }

   // console.log(data)

   return (
      <Form method="POST" onSubmit={handleSubmit}>
         <h1>Sign Up:</h1>
         <DisplayError error={error} />
         {data && <p>Success! Now you can login</p>}
         <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor="name">
               Name: <br />
               <input
                  value={inputs.name}
                  onChange={handleChange}
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
               />
            </label>
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
            <Button type="submit" isGradient>
               Sign Up
            </Button>
         </fieldset>
         <div className="bottom">
            <span>OR</span>
            <br />
            <span className="link" onClick={() => setType('signIn')}>
               Sign In
            </span>
         </div>
      </Form>
   )
}

export default SignUp
