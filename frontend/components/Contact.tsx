import { padding } from './Page'
import styled from 'styled-components'
import tw from 'twin.macro'
import Button from './styles/Button'
import Image from 'next/image'

const ContactStyles = styled.section`
   color: #283c5c;
   ${tw`
      bg-gradient-to-r from-primary to-secondary
      py-12
   `}
   hr {
      border: 1px solid #283c5c;
      width: 33%;
   }
   .content {
      ${tw`flex flex-col md:flex-row items-center`}
   }
   .content .image {
      ${tw`w-full sm:w-1/2 lg:w-3/5 text-center`}
   }
   form {
      ${tw`
         w-full sm:w-1/2 lg:w-2/5
         flex flex-col
         mt-6 lg:mt-10 mb-6 lg:mb-0
      `}
   }
   label {
      ${tw`flex flex-col font-pm`}
   }
   label span {
      ${tw`font-pm text-xl`}
   }
   input,
   textarea {
      border: 2px solid transparent;
      ${tw`
         py-3 px-7 
         mb-5
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
      ${tw`
         bg-blue-400
         border-blue-600
         text-white
         hover:shadow-md
      `}
   }
`

const Contact = () => {
   return (
      <ContactStyles className={padding} id="contact">
         <h1 className="text-3xl uppercase font-pb">Contact</h1>
         <hr className="my-2" />
         <div className="content">
            <form>
               <label htmlFor="name">
                  <span> Name:</span>
                  <input
                     type="text"
                     name="name"
                     placeholder="Your name"
                     required
                  />
               </label>
               <label htmlFor="email">
                  <span> Email:</span>
                  <input
                     type="email"
                     name="email"
                     placeholder="Your email"
                     required
                  />
               </label>
               <label htmlFor="text">
                  <span> Message:</span>
                  <textarea
                     name="text"
                     placeholder="Your text"
                     required
                  ></textarea>
               </label>
               <Button type="submit">Send</Button>
            </form>
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
