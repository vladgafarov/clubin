import { Field, Form, ErrorMessage, FormikProps } from 'formik'
import styled from 'styled-components'
import tw from 'twin.macro'
import LoadingOverlay from '../LoadingOverlay'
import Button from '../styles/Button'
import { FormValues } from './Contact'

const ErrorStyles = 'text-red-300 font-pm'

const FieldsetStyles = styled.fieldset`
   ${tw`relative`}
`

const ContactForm = ({ isSubmitting }: FormikProps<FormValues>) => {
   return (
      <Form>
         <FieldsetStyles disabled={isSubmitting}>
            <LoadingOverlay loading={isSubmitting} />
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
         </FieldsetStyles>
      </Form>
   )
}

export default ContactForm
