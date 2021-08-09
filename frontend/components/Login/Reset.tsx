import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Image from 'next/image'
import Link from 'next/link'
import FormStyles from '../styles/Form'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import Button from '../styles/Button'
import { useEffect, useState } from 'react'
import LoadingOverlay from '../LoadingOverlay'
import { useRouter } from 'next/router'
import { padding } from '../Page'
import EmailInput from './EmailInput'
import PasswordInput from './PasswordInput'
import ErrorStyles from './ErrorStyles'
import Redirect from '../Redirect'

const RESET_MUTATION = gql`
   mutation RESET_MUTATION(
      $email: String!
      $password: String!
      $token: String!
   ) {
      redeemUserPasswordResetToken(
         email: $email
         token: $token
         password: $password
      ) {
         code
         message
      }
   }
`

const Reset = ({ query: { token } }) => {
   const [reset, { data, loading, error: errorMutation, called }] =
      useMutation(RESET_MUTATION)

   const router = useRouter()

   const [error, setError] = useState()

   useEffect(() => {
      if (!token) {
         router.push('/')
      }
   }, [token])

   if (!token) {
      return <Redirect />
   }

   return (
      <>
         <header className="flex justify-center">
            <Link href="/">
               <a>
                  <Image
                     src="/images/logo.png"
                     alt="Logo"
                     width="250"
                     height=""
                  />
               </a>
            </Link>
         </header>
         <div className="w-11/12 lg:w-3/5 mx-auto">
            <h1 className="font-pb text-lg">Reset your password</h1>
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
               onSubmit={async ({ email, password }) => {
                  setError(undefined)

                  await reset({
                     variables: {
                        email,
                        password,
                        token,
                     },
                  }).then(async res => {
                     const { data } = res

                     if (data) {
                        setError(data.redeemUserPasswordResetToken.message)
                     }
                  })
               }}
            >
               {props => (
                  <FormStyles>
                     <Form>
                        <fieldset disabled={loading}>
                           <LoadingOverlay loading={loading} />

                           <EmailInput />
                           <PasswordInput />

                           {(errorMutation || error) && (
                              <span className={ErrorStyles}>
                                 {errorMutation?.message || error}
                              </span>
                           )}

                           <Button type="submit" isGradient>
                              Submit
                           </Button>

                           {data?.redeemUserPasswordResetToken === null && (
                              <p className="pt-5">
                                 Success! You can now{' '}
                                 <span className="text-indigo-500">
                                    <Link href="/">Sign in</Link>
                                 </span>
                              </p>
                           )}
                        </fieldset>
                     </Form>
                  </FormStyles>
               )}
            </Formik>
         </div>
      </>
   )
}

export default Reset
