import { Field, Form, ErrorMessage, FormikProps, FormikValues } from 'formik'
import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import tw from 'twin.macro'
import Button from '../styles/Button'
import { FormValues } from './Contact'
import Overlay from './Overlay'

const ErrorStyles = 'text-red-300 font-pm'

const FieldsetStyles = styled.fieldset`
   ${tw`relative`}
`

const ContactForm = ({
   status,
   isSubmitting,
   setStatus,
}: FormikProps<FormValues>) => {
   return (
      <FieldsetStyles disabled={isSubmitting}>
         <Overlay
            isSubmitting={isSubmitting}
            status={status}
            setStatus={setStatus}
         />
         <Form>
            <label htmlFor="name">Name:</label>
            <Field name="name" type="text" placeholder="Your name" />
            <ErrorMessage name="name">
               {text => <span className={ErrorStyles}>{text}</span>}
            </ErrorMessage>

            <label htmlFor="email">Email:</label>
            <Field name="email" type="email" placeholder="Your email" />
            <ErrorMessage name="email">
               {text => <span className={ErrorStyles}>{text}</span>}
            </ErrorMessage>

            <label htmlFor="message">Message:</label>
            <Field name="message" as="textarea" placeholder="Your message" />
            <ErrorMessage name="message">
               {text => <span className={ErrorStyles}>{text}</span>}
            </ErrorMessage>

            <Button type="submit">Submit</Button>
         </Form>
      </FieldsetStyles>
   )
}

export default ContactForm