import { padding } from './Page'
import styled from 'styled-components'
import tw from 'twin.macro'
import Image from 'next/image'

const AboutStyles = styled.section`
   color: #283c5c;
   ${tw`
      bg-gradient-to-r from-primary to-secondary
      py-12
      flex flex-col lg:flex-row
   `}
   .text {
      ${tw`
         lg:w-2/3 
         lg:pr-20 
         flex flex-col justify-between items-start
      `}
   }
   .images {
      ${tw`lg:w-1/3 text-center`}
   }
   .images .stores {
      ${tw`flex justify-around`}
   }
   hr {
      border: 1px solid #283c5c;
      width: 33%;
   }
`

const About = () => {
   return (
      <AboutStyles className={padding} id="about">
         <div className="text">
            <div>
               <h1 className="text-3xl uppercase font-pb">About Cloobin</h1>
               <hr className="my-2" />
               <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Voluptatibus praesentium illum eum, inventore facere dolor
                  similique quasi, veritatis ad quis modi in labore! Labore
                  tempora molestiae sequi deleniti est accusamus earum iste
                  itaque, porro eligendi voluptatibus rerum fugit et pariatur
                  optio quo omnis reprehenderit laudantium expedita commodi.
                  Quia velit ipsa modi omnis illum aperiam unde deserunt, optio
                  consectetur, non eos id quas at perferendis quibusdam quos
                  magnam libero rem adipisci, quaerat soluta cumque sapiente
                  animi voluptate! Ad aperiam error illo voluptate distinctio!
                  Doloremque sint nobis impedit quibusdam. Quam itaque odit in,
                  vel blanditiis nesciunt, molestiae praesentium voluptate illum
                  dolorem libero.
               </p>
            </div>
            <Image src="/images/logo2.png" width="" height="" quality="100" />
         </div>
         <div className="images">
            <Image
               src="/images/img5.png"
               width="471"
               height="441"
               quality="100"
            />
            <div className="stores">
               <Image src="/images/appstore.png" width="189" height="" />
               <Image src="/images/googleplay.png" width="189" height="" />
            </div>
         </div>
      </AboutStyles>
   )
}

export default About
