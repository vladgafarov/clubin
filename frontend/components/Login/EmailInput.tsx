import { ErrorMessage, Field } from 'formik'
import ErrorStyles from './ErrorStyles'

const EmailInput = () => {
   return (
      <>
         <label htmlFor="email">
            Email:
            <Field name="email" type="email" placeholder="Your email" />
         </label>
         <ErrorMessage name="email">
            {text => <span className={ErrorStyles}>{text}</span>}
         </ErrorMessage>
      </>
   )
}

export default EmailInput
