import styled from 'styled-components'
import tw from 'twin.macro'

const FormStyles = styled.div`
   transition: 0.4s cubic-bezier(0.65, 0, 0.35, 1);
   position: relative;
   border-image-source: radial-gradient(
      circle farthest-corner at 12.3% 19.3%,
      #ab56d8 0%,
      #ef444a 100.2%
   );
   border-image-slice: 1;
   ${tw`
      border-2
      p-6 2xl:p-8
      text-lg text-black
      bg-white
   `}
   h1 {
      ${tw`font-pm text-3xl mb-4`}
   }
   fieldset {
      ${tw`flex flex-col justify-center relative`}
      &[disabled] {
         opacity: 0.5;
      }
      label {
         ${tw`font-pm text-xl`}
         &:not(:first-of-type) {
            ${tw`mt-5`}
         }
         .input-password {
            position: relative;
            overflow: visible;
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
                  hover:text-gray-600
                  hover:bg-gray-300
               `}
            }
         }
      }
      input {
         ${tw`
            px-5 py-3
            border-2 border-gray-300 rounded transition 
            w-full
            font-pm
            ring-2
            ring-transparent
            focus:border-purple-500
            hover:ring-purple-400
         `}
      }
      input,
      button {
         outline: none;
      }
      button {
         ${tw`mt-8`}
      }
   }
   .bottom {
      ${tw`
         text-center mt-4
      `}
      .link {
         ${tw`text-blue-400 cursor-pointer hover:underline`}
      }
      span:not(.link) {
         position: relative;
         &::after,
         &::before {
            position: absolute;
            content: '';
            width: 200%;
            top: 50%;
            height: 2px;
            background-color: #d1d5db;
         }
         &::after {
            left: 0;
            transform: translateX(-120%);
         }
         &::before {
            right: 0;
            transform: translateX(120%);
         }
      }
   }
   .children {
      ${tw`
         text-center pt-4 text-blue-500
      `}
      button:not([type='submit']) {
         ${tw`hover:underline`}
      }
   }
`

export default FormStyles
