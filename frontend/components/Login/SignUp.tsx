import { useMutation } from '@apollo/client'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import gql from 'graphql-tag'
import Button from '../styles/Button'
import * as Yup from 'yup'
import wait from 'waait'
import FormStyles from '../styles/Form'
import { useRegisterModal } from '../../lib/useRegisterModal'
import LoadingOverlay from '../LoadingOverlay'
import { useState } from 'react'
import PassVisibilityIcon from './PassVisibilityIcon'

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

const SignUp = () => {
   const [signup, { data, loading, called }] = useMutation(SIGNUP_MUTATION)

   const [error, setError] = useState<string>()

   const {
      setSignIn,
      closeModal,
      handleSignInClick,
      isPassVisible,
   } = useRegisterModal()

   return (
      <Formik
         initialValues={{
            name: '',
            email: '',
            password: '',
         }}
         validateOnBlur={false}
         validateOnChange={false}
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
            setError(undefined)
            await signup({
               variables: values,
            })
               .then(async res => {
                  actions.resetForm()

                  await wait(2000)
                  closeModal()

                  await wait(200)
                  handleSignInClick()
               })
               .catch(e => {
                  if (e.message.match(/email/)) {
                     setError('Email is already taken')
                  }
               })
         }}
      >
         {props => (
            <FormStyles>
               <Form>
                  <fieldset disabled={loading}>
                     <LoadingOverlay
                        loading={loading}
                        error={!!error}
                        called={called}
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
                        <span className="input-password">
                           <Field name="password">
                              {({ field, form, meta }) => (
                                 <input
                                    type={isPassVisible ? 'text' : 'password'}
                                    placeholder="Your password"
                                    {...field}
                                 ></input>
                              )}
                           </Field>
                           <PassVisibilityIcon />
                        </span>
                     </label>
                     <ErrorMessage name="password">
                        {text => <span className={ErrorStyles}>{text}</span>}
                     </ErrorMessage>

                     {error && <p className={ErrorStyles}>{error}</p>}

                     <Button type="submit" isGradient>
                        Submit
                     </Button>
                     <div className="bottom">
                        <span>OR</span>
                        <br />
                        <span className="link" onClick={setSignIn}>
                           Sign In
                        </span>
                     </div>
                  </fieldset>
               </Form>
            </FormStyles>
         )}
      </Formik>
   )
}

export default SignUp
