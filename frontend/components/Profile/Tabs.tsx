import styled from 'styled-components'
import tw from 'twin.macro'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { IoMdSettings } from 'react-icons/io'
import { MdEvent } from 'react-icons/md'
import ProfileInfo from './ProfileInfo'
import Events from './Events'

const TabsStyles = styled(Tabs)`
   ${tw`mt-9`}
   .chakra-tabs__tablist {
      ${tw`font-pm`}
      button {
         ${tw`
            px-6 py-3 
            transition
            border-b-4 border-gray-700
            hover:bg-gray-600
            hover:text-gray-200
            hover:border-gray-200
         `}
         &[aria-selected="true"] {
            ${tw`border-gray-300 bg-gray-700`}
         }
      }
   }
   .chakra-tabs__tab-panels {
      ${tw`mt-4`}
   }
`

const TabsMain = () => {
   return (
      <TabsStyles>
         <TabList>
            <Tab>
               <MdEvent className="mr-1" size="22" />
               My events
            </Tab>
            <Tab>
               <IoMdSettings className="mr-1" size="22" /> Profile Settings
            </Tab>
         </TabList>

         <TabPanels>
            <TabPanel>
               <Events />
            </TabPanel>
            <TabPanel>
               <ProfileInfo />
            </TabPanel>
         </TabPanels>
      </TabsStyles>
   )
}

export default TabsMain
