import Tippy from '@tippyjs/react/headless'
import { Fragment } from 'react'
import { animated } from 'react-spring'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useAnimation } from '../lib/useAnimation'

const TooltipStyles = styled(animated.div)`
   ${tw`bg-gray-700 text-white rounded px-4 relative`}
   &::after {
      content: '';
      position: absolute;
      transform: translate(-50%, -100%);
      left: 50%;
      top: 3%;
      border: 12px solid transparent;
      border-bottom: 10px solid #374151;
   }
`

const Tooltip = ({
   children,
   elem,
   trigger = 'mouseenter focus',
   interactive = true,
   wrapper = true,
}) => {
   const { props, onMount, onHide } = useAnimation()

   return (
      <Tippy
         render={attrs => (
            <TooltipStyles style={props} tabIndex="-1" {...attrs}>
               {children}
            </TooltipStyles>
         )}
         interactive={interactive}
         animation={true}
         onMount={onMount}
         onHide={onHide}
         placement="bottom"
         trigger={trigger}
      >
         {wrapper ? <div>{elem}</div> : elem}
      </Tippy>
   )
}

export default Tooltip
