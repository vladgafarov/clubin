import styled from 'styled-components'
import tw from 'twin.macro'
import { AnimatePresence, motion } from 'framer-motion'
import { useMenu } from '../lib/menuState'
import { LinksContent } from './Links'
import CloseButton from './styles/CloseButton'
import { Link as ScrollLink } from 'react-scroll'
import Link from 'next/link'
import Button from './styles/Button'
import { FaUserAlt } from 'react-icons/fa'
import { useRegisterModal } from '../lib/useRegisterModal'
import { useUserGlobal } from '../lib/useUser'
import SignOut from './SignOut'

const NavStyles = styled(motion.nav)`
   background-color: #21212e;
   ${tw`
      fixed w-4/5 h-full right-0 top-0
      pl-5 
      flex flex-col justify-center
      z-50
      border-l-4 border-purple-900
   `}
   ul {
      ${tw`list-none pl-0`}
      li {
         ${tw`text-2xl font-pb my-4`}
      }
   }
   .buttons {
      ${tw`
         pt-6 pr-5
         flex flex-col
         space-y-4
      `}
   }
`

const Overlay = styled(motion.div)`
   ${tw`
      fixed inset-0 bg-black bg-opacity-80 z-40
   `}
`

const variants = {
   open: {
      x: 0,
      transition: {
         type: 'spring',
         stiffness: 300,
         damping: 40,
      },
   },
   closed: {
      x: '100%',
      transition: { duration: 0.5, delay: 0.5 },
   },
}

const ulVariants = {
   open: {
      transition: {
         staggerChildren: 0.3,
         delay: 1,
      },
   },
   closed: {
      transition: {
         staggerChildren: 0.15,
         staggerDirection: -1,
      },
   },
}

const liVariants = {
   open: {
      opacity: 1,
      y: 0,
      transition: {
         type: 'spring',
         stiffness: 250,
         damping: 40,
      },
   },
   closed: {
      opacity: 0,
      y: 30,
      transition: {
         type: 'spring',
         stiffness: 500,
         damping: 50,
      },
   },
}

const fadeVariants = {
   initial: { opacity: 0 },
   animate: { opacity: 1, transition: { delay: 0.6 } },
}

const linkProps = {
   className: 'animation-link',
   smooth: 'easeInOutQuad',
}

const MobileMenu = () => {
   const { isOpen, closeMenu } = useMenu()
   const { user } = useUserGlobal()
   const { handleSignInClick, handleSignUpClick } = useRegisterModal()

   return (
      <AnimatePresence>
         {isOpen && (
            <>
               <NavStyles
                  variants={variants}
                  initial="closed"
                  animate="open"
                  exit="closed"
               >
                  <motion.ul variants={ulVariants}>
                     {LinksContent.map((item, i) => (
                        <motion.li key={i} variants={liVariants}>
                           <ScrollLink
                              to={item.to}
                              {...linkProps}
                              onClick={closeMenu}
                           >
                              {item.text}
                           </ScrollLink>
                        </motion.li>
                     ))}
                  </motion.ul>
                  {user ? (
                     <motion.div
                        variants={fadeVariants}
                        initial="initial"
                        animate="animate"
                        exit="initial"
                     >
                        <Link href="/profile">
                           <a className="animation-link flex items-center mb-2 pr-5">
                              <FaUserAlt className="mr-1" />
                              Profile
                           </a>
                        </Link>
                        <SignOut />
                     </motion.div>
                  ) : (
                     <motion.span
                        variants={fadeVariants}
                        initial="initial"
                        animate="animate"
                        exit="initial"
                        className="buttons"
                        onClick={closeMenu}
                     >
                        <Button isGradient onClick={handleSignInClick}>
                           Sign In
                        </Button>
                        <Button onClick={handleSignUpClick}>Sign Up</Button>
                     </motion.span>
                  )}
                  <CloseButton onClick={closeMenu}>&times;</CloseButton>
               </NavStyles>
               <Overlay
                  onClick={closeMenu}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
               />
            </>
         )}
      </AnimatePresence>
   )
}

export default MobileMenu
