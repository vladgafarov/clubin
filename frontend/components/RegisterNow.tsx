import Button from './styles/Button'
import { padding } from './Page'
import styled from 'styled-components'
import tw from 'twin.macro'

const RegisterStyles = styled.section`
   background-image: url('/images/img6.png');
   background-repeat: no-repeat;
   background-size: cover;
   background-position: center;
   ${tw`py-9 flex justify-center relative`}
   &::before {
      content: '';
      position: absolute;
      ${tw`inset-0`}
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1;
   }
`

const RegisterNow = () => {
   return (
      <RegisterStyles className={padding}>
         <Button isGradient className="z-10 relative">
            Register Now
         </Button>
      </RegisterStyles>
   )
}

export default RegisterNow
