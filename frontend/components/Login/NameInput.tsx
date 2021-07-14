import { ErrorMessage, Field } from 'formik'
import ErrorStyles from './ErrorStyles'

const NameInput = () => {
   return (
      <>
         <label htmlFor="name">
            Name:
            <Field name="name" type="text" placeholder="Your name" />
         </label>
         <ErrorMessage name="name">
            {text => <span className={ErrorStyles}>{text}</span>}
         </ErrorMessage>
      </>
   )
}

export default NameInput
