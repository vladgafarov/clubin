import { padding } from './Page'
import styled from 'styled-components'
import tw from 'twin.macro'
import Image from 'next/image'
import { GrFacebookOption, GrInstagram, GrTwitter } from 'react-icons/gr'
import Links from './Links'

const FooterStyles = styled.footer`
   ${tw`py-7`}
   .content {
      ${tw`grid grid-rows-3 md:grid-rows-1 md:grid-flow-col md:auto-cols-auto`}
      .logo {
      }
      span {
         ${tw`text-blue-400 font-pb text-xl`}
      }
      .social {
         .circles {
            ${tw`flex items-center space-x-4 mt-4`}
            .circle {
               ${tw`
                  p-2   
                  rounded-full border border-blue-400 
                  text-blue-400 text-xl
                  transition
                  hover:text-white
                  hover:bg-blue-400
                  cursor-pointer
               `}
            }
         }
      }
      .links {
         ${tw`flex flex-col text-xl max-w-max`}
      }
   }
`

const Footer = () => {
   return (
      <FooterStyles className={padding}>
         <div className="content">
            <div className="logo">
               <Image src="/images/logo.png" width="260px" height="100px" />
            </div>
            <div className="social">
               <span>Social</span>
               <div className="circles">
                  <a href="#" className="circle">
                     <GrFacebookOption />
                  </a>
                  <a href="#" className="circle">
                     <GrTwitter />
                  </a>
                  <a href="#" className="circle">
                     <GrInstagram />
                  </a>
               </div>
            </div>
            <div className="links">
               <span>Quick links</span>
               <Links spy={false} />
            </div>
         </div>
         <p className="text-center">&copy; All Rights Reserved</p>
      </FooterStyles>
   )
}

export default Footer
