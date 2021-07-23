import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormStyles from '../styles/Form'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import DisplayError from '../ErrorMessage'
import Button from '../styles/Button'
import LoadingOverlay from '../LoadingOverlay'
import { useRegisterModal } from '../../lib/useRegisterModal'
import EmailInput from './EmailInput'
import { RegisterModalVariants } from '../RegisterModal'

const REQUEST_RESET_MUTATION = gql`
   mutation REQUEST_RESET_MUTATION($email: String!) {
      sendUserPasswordResetLink(email: $email) {
         code
         message
      }
   }
`

const RequestReset = () => {
   const [requestReset, { loading, error, called }] = useMutation(
      REQUEST_RESET_MUTATION
   )

   const { setSignIn } = useRegisterModal()

   return (
      <Formik
         initialValues={{
            email: '',
         }}
         validateOnBlur={false}
         validateOnChange={false}
         validationSchema={Yup.object({
            email: Yup.string()
               .email('Invalid email address')
               .required('Required'),
         })}
         onSubmit={async (values, actions) => {
            await requestReset({
               variables: values,
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

                     {error && <DisplayError error={error} />}
                     {called && !loading && (
                        <p className="font-pm text-green-400">
                           if the account exists, then you will receive an email
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

export default RequestReset
