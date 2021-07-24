import styled from 'styled-components'
import { CgProfile } from 'react-icons/cg'
import { padding } from '../Page'
import tw from 'twin.macro'
import Link from 'next/link'
import SignOut from '../SignOut'
import TabsMain from './Tabs'
import { useUserGlobal } from '../../lib/useUser'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Tooltip from '../Tooltip'

const HeaderStyles = styled.header`
   box-shadow: 0 0 40px rgba(0, 0, 0, 0.55);
   ${tw`
      flex justify-between items-center
      py-2
      px-7 md:px-12 lg:px-20 xl:px-24 2xl:px-32
      mb-4
   `}
   .logo {
      ${tw`font-pb text-3xl hover:no-underline`}
      &:hover {
         span {
            &:first-of-type {
               color: #bf10fd;
            }
            &:last-of-type {
               color: #46c2ff;
            }
         }
      }
      span {
         transition: 0.25s ease-in-out;
         &:first-of-type {
            color: #46c2ff;
         }
         &:last-of-type {
            color: #bf10fd;
         }
      }
   }
   .user {
      ${tw`flex items-center cursor-pointer`}
   }
`

interface IProfile {}

const Profile = (props: IProfile) => {
   const { user, loading } = useUserGlobal()
   const router = useRouter()

   useEffect(() => {
      if (!user && !loading) {
         router.push('/')
      }
   }, [user])

   if (!user && !loading) {
      return (
         <div className={padding + ' mt-10'}>
            <p>You don't have access to this resource</p>
            <p>Redirecting...</p>
         </div>
      )
   }

   return (
      <>
         <HeaderStyles>
            <Link href="/">
               <a className="logo">
                  <span>Club</span>
                  <span>In</span>
               </a>
            </Link>
            <Tooltip content={<SignOut />}>
               <div className="user">
                  <CgProfile size={24} className="mr-1" />
                  <span className="font-pm">{user?.name}</span>
               </div>
            </Tooltip>
         </HeaderStyles>
         <div className={padding}>
            <TabsMain />
         </div>
      </>
   )
}

export default Profile
