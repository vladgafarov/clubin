import { padding } from '../Page'
import styled from 'styled-components'
import tw from 'twin.macro'
import Image from 'next/image'
import { Formik } from 'formik'
import * as Yup from 'yup'
import ContactForm from './ContactForm'
import sendEmail from '../../lib/contact/sendEmail'
import DisplayError from '../ErrorMessage'
import { useState } from 'react'

const ContactStyles = styled.section`
   color: #283c5c;
   ${tw`
      bg-gradient-to-r from-primary to-secondary
      py-12
   `}
   hr {
      border: 1px solid #283c5c;
      width: 33%;
      background-color: #283c5c;
   }
   .content {
      ${tw`flex flex-col md:flex-row items-center`}
   }
   .content .image {
      ${tw`w-full sm:w-1/2 lg:w-3/5 text-center`}
   }
   fieldset {
      ${tw`
         w-full sm:w-1/2 lg:w-2/5
         mt-6 lg:mt-10 mb-6 lg:mb-0
      `}
   }
   form {
      ${tw`
         w-full
         flex flex-col
      `}
   }
   label {
      ${tw`font-pm text-xl`}
      &:not(:first-of-type) {
         ${tw`mt-5`}
      }
   }
   input,
   textarea {
      border: 2px solid transparent;
      ${tw`
         py-3 px-7 
         outline-none 
         rounded-lg 
         transition
      `}
   }
   input:focus,
   textarea:focus {
      border: 2px solid #8860fc;
      ${tw`shadow-md`}
   }
   button {
      &:disabled {
         opacity: 0.6;
      }
      ${tw`
         bg-blue-400
         border-blue-600
         mt-5
         text-white
         hover:shadow-md
      `}
   }
`

export interface FormValues {
   name: string
   email: string
   message: string
}

const Contact = () => {
   const [error, setError] = useState()

   return (
      <ContactStyles className={padding} id="contact">
         <h1 className="text-3xl uppercase font-pb">Contact</h1>
         <hr className="my-2" />
         {error && <DisplayError error={error} />}
         <div className="content">
            <Formik
               initialValues={{
                  name: '',
                  email: '',
                  message: '',
               }}
               validationSchema={Yup.object({
                  name: Yup.string()
                     .max(15, 'Must be 15 characters or less')
                     .required('Required'),
                  email: Yup.string()
                     .email('Invalid email address')
                     .required('Required'),
                  message: Yup.string()
                     .min(5, 'Must be 5 characters or more')
                     .required('Required'),
               })}
               onSubmit={async (values, actions) => {
                  const res = await sendEmail(values)
                  console.log(res)

                  if (res?.data !== null) setError(res.data)
                  else {
                     actions.resetForm()
                     actions.setStatus('success')
                  }
               }}
               component={ContactForm}
            />
            <div className="image ">
               <Image
                  src="/images/img16.png"
                  width="400"
                  height="360"
                  quality="100"
               />
            </div>
         </div>
      </ContactStyles>
   )
}

export default Contact
