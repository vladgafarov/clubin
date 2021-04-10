import { padding } from './Page'
import styled from 'styled-components'
import tw from 'twin.macro'
import Button from './styles/Button'

const SubscribeStyles = styled.section`
   ${tw`py-12`}
   background-image: url('/images/img17.png');
   background-repeat: no-repeat;
   background-size: cover;
   background-position: center bottom;
   .content {
      background-color: #21212e;
      ${tw`
         p-7 lg:py-10 lg:px-16
         flex flex-col lg:flex-row items-center
      `}
   }
   .text,
   form {
      ${tw`flex-1`}
   }
   form {
      position: relative;
      ${tw`
         w-full mt-6 lg:mt-0
      `}
   }
   form button {
      ${tw`
         transform inset-y-0 lg:absolute lg:-translate-x-full
         w-full lg:w-auto
         mt-4 lg:mt-0 
      `}
   }
   form input {
      ${tw`
         py-4 px-7
         rounded-lg
         outline-none
         text-black
         w-full
         focus:ring-2 focus:ring-purple-500
      `}
   }
`

const Subscribe = () => {
   return (
      <SubscribeStyles className={padding}>
         <div className="content">
            <div className="text">
               <h1 className="font-pb text-4xl">Subscribe</h1>
               <p className="text-xl">
                  To receive info on our latest news and episodes
               </p>
            </div>
            <form>
               <input type="email" placeholder="Your email" required />
               <Button isGradient type="submit">
                  Subscibe
               </Button>
            </form>
         </div>
      </SubscribeStyles>
   )
}

export default Subscribe
