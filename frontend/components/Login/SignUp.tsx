import { useMutation } from '@apollo/client'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import gql from 'graphql-tag'
import useForm from '../../lib/useForm'
import DisplayError from '../ErrorMessage'
import Button from '../styles/Button'
import * as Yup from 'yup'
import FormStyles from '../styles/Form'
import Overlay from '../Contact/Overlay'

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

const ErrorStyles = 'text-red-300 font-pm'

const SignUp = ({ setType }) => {
   const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION)

   const handleSubmit = async e => {
      e.preventDefault()
      await signup()
   }

   console.log(data)

   return (
      <>
         <Formik
            initialValues={{
               name: 'Jhon',
               email: 'some@some.com',
               password: 'qery456p2016',
            }}
            validationSchema={Yup.object({
               name: Yup.string()
                  .min(2, 'Must be 2 characters or more')
                  .required('Required'),
               email: Yup.string()
                  .email('Invalid email address')
                  .required('Required'),
               password: Yup.string()
                  .min(8, 'Must be 8 characters or more')
                  .required('Required'),
            })}
            onSubmit={async (values, actions) => {
               await signup({
                  variables: values,
               })
               console.log(data)
            }}
         >
            {({ isSubmitting, setStatus, status }) => (
               <FormStyles>
                  <Form>
                     <fieldset disabled={isSubmitting}>
                        <Overlay
                           isSubmitting={isSubmitting}
                           status={status}
                           setStatus={setStatus}
                        />
                        <label htmlFor="name">
                           Name:
                           <Field
                              name="name"
                              type="text"
                              placeholder="Your name"
                           />
                        </label>
                        <ErrorMessage name="name">
                           {text => <span className={ErrorStyles}>{text}</span>}
                        </ErrorMessage>

                        <label htmlFor="email">
                           Email:
                           <Field
                              name="email"
                              type="email"
                              placeholder="Your email"
                           />
                        </label>
                        <ErrorMessage name="email">
                           {text => <span className={ErrorStyles}>{text}</span>}
                        </ErrorMessage>

                        <label htmlFor="password">
                           Password:
                           <Field name="password" placeholder="Your password" />
                        </label>
                        <ErrorMessage name="password">
                           {text => <span className={ErrorStyles}>{text}</span>}
                        </ErrorMessage>

                        {error && (
                           <p className="text-red-500">{error?.message}</p>
                        )}

                        <Button type="submit" isGradient>
                           Submit
                        </Button>
                        <div className="bottom">
                           <span>OR</span>
                           <br />
                           <span
                              className="link"
                              onClick={() => setType('signIn')}
                           >
                              Sign In
                           </span>
                        </div>
                     </fieldset>
                  </Form>
                  {data && 'You can now Sign In'}
               </FormStyles>
            )}
         </Formik>
         {/* <Form method="POST" onSubmit={handleSubmit}>
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
         </Form> */}
      </>
   )
}

export default SignUp
