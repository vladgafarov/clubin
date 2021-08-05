import Image from 'next/image'
import styled from 'styled-components'
import tw from 'twin.macro'
import { padding } from './Page'
import Nav from './Nav'
import { CgMenuRight } from 'react-icons/cg'
import { useMenu } from '../lib/menuState'
import MobileMenu from './MobileMenu'

const HeaderStyles = styled.header`
   ${tw`
      flex justify-center xl:justify-between items-center
      -mt-5
   `}
   .open {
      ${tw`
         block xl:hidden
         text-3xl
         fixed
         right-2 md:right-8 lg:right-6 
         top-6 lg:top-14
         z-20
      `}
   }
`

const Header = () => {
   const { openMenu } = useMenu()

   return (
      <HeaderStyles className={padding} id="header">
         <Image src="/images/logo.png" width="250" height="" />
         <CgMenuRight className="open" onClick={openMenu} />
         <Nav />
         <MobileMenu />
      </HeaderStyles>
   )
}

export default Header
