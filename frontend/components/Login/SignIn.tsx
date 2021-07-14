import { gql, useMutation } from '@apollo/client'
import { ErrorMessage, Field, Formik, Form } from 'formik'
import * as Yup from 'yup'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import Button from '../styles/Button'
import FormStyles from '../styles/Form'
import { CURRENT_USER_QUERY } from '../User'
import LoadingOverlay from '../LoadingOverlay'
import wait from 'waait'
import { useRegisterModal } from '../../lib/useRegisterModal'
import PassVisibilityIcon from './PassVisibilityIcon'

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
   const [signIn, { data, loading, called }] = useMutation(SIGNIN_MUTATION)

   const { setSignUp, closeModal, setReset, isPassVisible } = useRegisterModal()

   let error =
      data?.authenticateUserWithPassword.__typename ===
      'UserAuthenticationWithPasswordFailure'
         ? data?.authenticateUserWithPassword
         : undefined

   console.log({ error })
   // console.log(data)

   return (
      //TODO: useMemo()
      <Formik
         initialValues={{
            email: '',
            password: '',
         }}
         validateOnBlur={false}
         validateOnChange={false}
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
            }).then(async res => {
               const { data } = res

               if (data.authenticateUserWithPassword.code !== 'FAILURE') {
                  actions.resetForm()
                  await wait(2000)
                  closeModal()
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
                        error={!!error?.message}
                        called={called}
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
                        <div className="input-password">
                           <Field name="password">
                              {({ field, form, meta }) => (
                                 <input
                                    type={isPassVisible ? 'text' : 'password'}
                                    placeholder="Your password"
                                    {...field}
                                 />
                              )}
                           </Field>
                           <PassVisibilityIcon />
                        </div>
                     </label>
                     <ErrorMessage name="password">
                        {text => <span className={ErrorStyles}>{text}</span>}
                     </ErrorMessage>

                     {error && <p className={ErrorStyles}>{error?.message}</p>}

                     <Button type="submit" isGradient>
                        Submit
                     </Button>
                     <div className="bottom">
                        <span>OR</span>
                        <br />
                        <span className="link" onClick={setSignUp}>
                           Sign Up
                        </span>
                        <br />
                        <span className="link" onClick={setReset}>
                           Reset password
                        </span>
                     </div>
                  </fieldset>
               </Form>
            </FormStyles>
         )}
      </Formik>
   )
}

export default SignIn
