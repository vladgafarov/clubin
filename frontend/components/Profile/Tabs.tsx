import styled from 'styled-components'
import tw from 'twin.macro'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { IoMdSettings } from 'react-icons/io'
import { MdEvent } from 'react-icons/md'
import ProfileInfo from './ProfileInfo'
import Events from './Events'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import { useState } from 'react'
import SmoothTransition from '../Animations/SmoothTransition'

const TabsStyles = styled(Tabs)`
   ${tw`my-9`}
   .chakra-tabs__tablist {
      ${tw`font-pm`}
      button {
         ${tw`
            relative
            px-6 py-3 
            transition
            border-b-4 border-gray-700
            hover:bg-gray-600
            hover:text-gray-200
            hover:border-gray-200
            z-20
         `}
         .background {
            z-index: -1;
            ${tw`absolute inset-0 border-gray-300 bg-gray-700`}
         }
      }
   }
   .chakra-tabs__tab-panels {
      min-height: 80vh;
      ${tw`mt-4`}
   }
`

const transition = {
   duration: 0.45,
   stiffness: 500,
   damping: 50,
   staggerChildren: 0.3,
}

const TabsMain = () => {
   const [activeTab, setActiveTab] = useState(0)

   return (
      <TabsStyles onChange={number => setActiveTab(number)}>
         <AnimateSharedLayout>
            <TabList>
               <Tab>
                  <MdEvent className="mr-1" size="22" />
                  My events
                  {activeTab == 0 && <SmoothTransition name="background" />}
               </Tab>
               <Tab>
                  <IoMdSettings className="mr-1" size="22" />
                  Profile Settings
                  {activeTab == 1 && <SmoothTransition name="background" />}
               </Tab>
            </TabList>
         </AnimateSharedLayout>

         <TabPanels>
            <TabPanel>
               <motion.div
                  animate={{
                     opacity: activeTab == 0 ? 1 : 0,
                     y: activeTab == 0 ? 0 : 20,
                  }}
                  transition={transition}
               >
                  <Events />
               </motion.div>
            </TabPanel>
            <TabPanel>
               <motion.div
                  animate={{
                     opacity: activeTab != 0 ? 1 : 0,
                     y: activeTab != 0 ? 0 : 20,
                  }}
                  transition={transition}
               >
                  <ProfileInfo />
               </motion.div>
            </TabPanel>
         </TabPanels>
      </TabsStyles>
   )
}

export default TabsMain
