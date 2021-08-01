import { useMutation } from '@apollo/client'
import { ErrorMessage, Field, Formik } from 'formik'
import gql from 'graphql-tag'
import { useEffect, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { MdModeEdit } from 'react-icons/md'
import { TiTick } from 'react-icons/ti'
import styled from 'styled-components'
import tw from 'twin.macro'
import wait from 'waait'
import * as Yup from 'yup'
import Fade from '../Animations/Fade'
import LoadingOverlay from '../LoadingOverlay'
import ErrorStyles from '../Login/ErrorStyles'
import Tooltip from '../Tooltip'

const InputStyles = styled.div`
   ${tw`relative`}
   input {
      ${tw`
         text-black
         px-5 py-3
         border-2 border-gray-400 rounded transition 
         w-full
         font-pm text-xl
         ring-2
         ring-transparent
         outline-none
      `}
      &:disabled {
         ${tw`bg-gray-700 text-white`}
      }
      &:not(:disabled) {
         ${tw`
            hover:ring-gray-400
            focus:border-gray-500
         `}
      }
   }
   .icon {
      ${tw`
         absolute
         right-4 top-1/2
         transform -translate-y-1/2
         cursor-pointer
         p-2
         w-9 h-9
         rounded
         transition
         text-gray-400
         flex items-center justify-center
         hover:text-gray-600
         hover:bg-gray-300
      `}
   }
`

const ButtonStyles =
   'w-9 h-9 bg-gray-700 p-2 flex items-center justify-center rounded cursor-pointer transition hover:bg-gray-800'

const UPDATE_NAME_MUTATION = gql`
   mutation UPDATE_NAME_MUTATION($id: ID!, $name: String!) {
      updateUser(id: $id, data: { name: $name }) {
         id
         name
         email
      }
   }
`

const Input = ({ value, id }) => {
   const inputEl = useRef(null)
   const [isEditing, setIsEditing] = useState<boolean>(false)

   const [updateName, { loading, error, called }] =
      useMutation(UPDATE_NAME_MUTATION)

   const validateName = fieldValue => {
      let error

      if (fieldValue == value) {
         error = "The names can't match"
      }

      return error
   }

   const handleEditClick = async () => {
      setIsEditing(true)
      await wait(1)
      inputEl.current.focus()
   }

   const handleOutsideInputClick = e => {
      if (
         e.target.localName !== 'input' &&
         e.target.classList[0] !== 'submit' &&
         isEditing
      ) {
         setIsEditing(false)
      }
   }

   useEffect(() => {
      window.addEventListener('click', handleOutsideInputClick)

      return () => {
         window.removeEventListener('click', handleOutsideInputClick)
      }
   }, [isEditing])

   return (
      <Formik
         initialValues={{
            name: value,
         }}
         validateOnBlur={false}
         validateOnChange={false}
         validationSchema={Yup.object({
            name: Yup.string()
               .max(30, '30 characters max')
               .required('Must be at least 1 character length'),
         })}
         onSubmit={async ({ name }, actions) => {
            setIsEditing(false)
            await updateName({
               variables: {
                  id,
                  name,
               },
            }).catch(() => setIsEditing(true))
         }}
      >
         {props => (
            <div className="w-1/3 relative mt-1">
               <LoadingOverlay
                  loading={loading}
                  error={!!error}
                  called={called}
               />
               {error && <p className={ErrorStyles}>{error?.message}</p>}

               <InputStyles className="relative">
                  <Field name="name" validate={validateName}>
                     {({ field }) => (
                        <input
                           type="text"
                           disabled={!isEditing}
                           ref={inputEl}
                           {...field}
                        />
                     )}
                  </Field>
                  <Tooltip content="Edit" delay={[500, 0]} placement="top">
                     <div className="icon" onClick={handleEditClick}>
                        <MdModeEdit size={28} />
                     </div>
                  </Tooltip>
                  <Fade
                     condition={isEditing}
                     className="absolute -right-24 inset-y-0 flex items-center space-x-2"
                  >
                     <div
                        className={'submit ' + ButtonStyles}
                        onClick={props.submitForm}
                     >
                        <TiTick className="submit" />
                     </div>
                     <div
                        className={ButtonStyles}
                        onClick={() => {
                           setIsEditing(false)
                           props.resetForm()
                        }}
                     >
                        <IoClose />
                     </div>
                  </Fade>
               </InputStyles>
               <Fade condition={isEditing}>
                  <ErrorMessage name="name">
                     {text => <p className={ErrorStyles}>{text}</p>}
                  </ErrorMessage>
               </Fade>
            </div>
         )}
      </Formik>
   )
}

export default Input
