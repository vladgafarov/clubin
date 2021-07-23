import { gql, useMutation } from '@apollo/client'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Button from '../styles/Button'
import FormStyles from '../styles/Form'
import { CURRENT_USER_QUERY } from '../User'
import LoadingOverlay from '../LoadingOverlay'
import wait from 'waait'
import { useRegisterModal } from '../../lib/useRegisterModal'
import EmailInput from './EmailInput'
import PasswordInput from './PasswordInput'
import ErrorStyles from './ErrorStyles'
import { RegisterModalVariants } from '../RegisterModal'

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

const SignIn = () => {
   const [signIn, { data, loading, called }] = useMutation(SIGNIN_MUTATION)

   const { setSignUp, closeModal, setReset } = useRegisterModal()

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
            <FormStyles
               variants={RegisterModalVariants}
               initial="initial"
               animate="animate"
               exit="exit"
            >
               <Form>
                  <fieldset disabled={loading}>
                     <LoadingOverlay
                        loading={loading}
                        error={!!error?.message}
                        called={called}
                     />

                     <EmailInput />
                     <PasswordInput />

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
