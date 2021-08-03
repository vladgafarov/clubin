import { useMutation } from '@apollo/client'
import { Formik, Form } from 'formik'
import gql from 'graphql-tag'
import Button from '../styles/Button'
import * as Yup from 'yup'
import wait from 'waait'
import FormStyles from '../styles/Form'
import { useRegisterModal } from '../../lib/useRegisterModal'
import LoadingOverlay from '../LoadingOverlay'
import { useState } from 'react'
import EmailInput from './EmailInput'
import NameInput from './NameInput'
import PasswordInput from './PasswordInput'
import ErrorStyles from './ErrorStyles'
import { RegisterModalVariants } from '../RegisterModal'
import { useNotifications } from '../../lib/useNotifications'

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

const SignUp = () => {
   const [signup, { data, error: errorMutation, loading, called }] =
      useMutation(SIGNUP_MUTATION)

   const { addNotification } = useNotifications()

   const [error, setError] = useState<string>()

   const { setSignIn, closeModal, handleSignInClick } = useRegisterModal()

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

                  await wait(1000)
                  closeModal()

                  addNotification('Signed up')

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
            <FormStyles
               variants={RegisterModalVariants}
               initial="initial"
               animate="animate"
               exit="exit"
            >
               <Form>
                  <fieldset disabled={loading}>
                     <LoadingOverlay loading={loading} />

                     <NameInput />
                     <EmailInput />
                     <PasswordInput />

                     {(error || errorMutation) && (
                        <p className={ErrorStyles}>
                           {error || errorMutation?.message}
                        </p>
                     )}

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
