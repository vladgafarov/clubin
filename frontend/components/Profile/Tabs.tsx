import styled from 'styled-components'
import tw from 'twin.macro'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { IoMdSettings } from 'react-icons/io'
import { MdEvent } from 'react-icons/md'
import ProfileInfo from './ProfileInfo'
import Events from './Events'
import { AnimateSharedLayout, useAnimation } from 'framer-motion'
import { useState } from 'react'
import SmoothTransition from '../Animations/SmoothTransition'
import { useEffect } from 'react'

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

const TabsMain = () => {
   const [activeTab, setActiveTab] = useState(0)

   const eventControls = useAnimation()
   const infoControls = useAnimation()

   useEffect(() => {
      eventControls.start('visible')
   }, [])

   return (
      <TabsStyles
         onChange={number => {
            setActiveTab(number)
            if (number == 0) {
               eventControls.start('visible')
               infoControls.start('hidden')
            } else {
               infoControls.start('visible')
               eventControls.start('hidden')
            }
         }}
      >
         <AnimateSharedLayout>
            <TabList defaultValue={0}>
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
               <Events controls={eventControls} />
            </TabPanel>
            <TabPanel>
               <ProfileInfo controls={infoControls} />
            </TabPanel>
         </TabPanels>
      </TabsStyles>
   )
}

export default TabsMain
