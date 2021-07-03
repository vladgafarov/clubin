import { gql, useMutation } from '@apollo/client'
import { ErrorMessage, Field, Formik, Form } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'
import tw from 'twin.macro'
import Button from '../styles/Button'
import FormStyles from '../styles/Form'
import { CURRENT_USER_QUERY, useUser } from '../User'
import Overlay from '../Contact/Overlay'
import wait from 'waait'
import { useRegisterModal } from '../../lib/useRegisterModal'

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

const ErrorStyles = 'text-red-300 font-pm'

const SignIn = () => {
   const [signIn, { data, loading, error: errorMutation }] = useMutation(
      SIGNIN_MUTATION
   )

   const { setSignUp } = useRegisterModal()

   const error =
      data?.authenticateUserWithPassword.__typename ===
      'UserAuthenticationWithPasswordFailure'
         ? data?.authenticateUserWithPassword
         : undefined

   // console.log({ error, errorMutation })
   // console.log(loading)

   return (
      <>
         <Formik
            initialValues={{
               email: 'some@some.com',
               password: 'qry456tuhrrw',
            }}
            validationSchema={Yup.object({
               email: Yup.string()
                  .email('Invalid email address')
                  .required('Required'),
               password: Yup.string()
                  .min(8, 'Must be 8 characters or more')
                  .required('Required'),
            })}
            onSubmit={async (values, actions) => {
               await signIn({
                  variables: values,
                  refetchQueries: [{ query: CURRENT_USER_QUERY }],
               })
               // TODO: UI
               // if (loading) {
               //    actions.setSubmitting(true)
               //    console.log('loading')
               // } else {
               //    actions.setSubmitting(false)

               //    if (!error && !errorMutation) {
               //       actions.resetForm()
               //       actions.setStatus('success')
               //    }
               // }

               if (data) {
                  console.log({ error, errorMutation })

                  if (!error && !errorMutation) {
                     actions.resetForm()
                     actions.setStatus('success')
                  }
               }
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

                        {(errorMutation || error) && (
                           <p className="text-red-500">
                              {errorMutation?.message || error?.message}
                           </p>
                        )}

                        <Button type="submit" isGradient>
                           Submit
                        </Button>
                        <div className="bottom">
                           <span>OR</span>
                           <br />
                           <span className="link" onClick={setSignUp}>
                              Sign Up
                           </span>
                        </div>
                     </fieldset>
                  </Form>
               </FormStyles>
            )}
         </Formik>
         {/* <Form method="POST" onSubmit={handleSubmit}>
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
               <span className="link" onClick={() => setType('signUp')}>
                  Sign Up
               </span>
            </div>
         </Form> */}
      </>
   )
}

export default SignIn
