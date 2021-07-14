import { ErrorMessage, Field } from 'formik'
import { useRegisterModal } from '../../lib/useRegisterModal'
import ErrorStyles from './ErrorStyles'
import PassVisibilityIcon from './PassVisibilityIcon'

const PasswordInput = () => {
   const { isPassVisible } = useRegisterModal()

   return (
      <>
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
      </>
   )
}

export default PasswordInput
