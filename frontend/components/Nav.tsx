import Button from './styles/Button'
import styled from 'styled-components'
import tw from 'twin.macro'
import Link from 'next/link'
import Links from './Links'
import { FaUserAlt } from 'react-icons/fa'
import SignOut from './SignOut'
import { useRegisterModal } from '../lib/useRegisterModal'
import { useUserGlobal } from '../lib/useUser'
import Tooltip from './Tooltip'

const NavStyles = styled.nav`
   ${tw`
      hidden xl:flex 
      flex-row justify-end items-center
      relative
      space-x-8 2xl:space-x-16 
      text-lg font-pb
      z-30
   `}
   a {
      ${tw`uppercase`}
   }
   .buttons {
      ${tw`
         flex flex-row 
         space-x-5 2xl:space-x-8
      `}
   }
`

const Nav = () => {
   const { user } = useUserGlobal()

   const { handleSignInClick, handleSignUpClick } = useRegisterModal()

   return (
      <NavStyles>
         <Links spy={false} />
         {user ? (
            <Tooltip content={<SignOut />}>
               <div>
                  <Link href="/profile">
                     <a className="animation-link flex items-center">
                        <FaUserAlt className="mr-1" />
                        Profile
                     </a>
                  </Link>
               </div>
            </Tooltip>
         ) : (
            <span className="buttons">
               <Button isGradient onClick={handleSignInClick}>
                  Sign In
               </Button>
               <Button onClick={handleSignUpClick}>Sign Up</Button>
            </span>
         )}
      </NavStyles>
   )
}

export default Nav
