import Tippy, { TippyProps } from '@tippyjs/react/headless'
import styled from 'styled-components'
import { useSpring, motion } from 'framer-motion'
import { useState } from 'react'

const Box = styled(motion.div)`
   background: #333;
   color: white;
   padding: 5px 10px;
   border-radius: 4px;
   &[data-popper-placement^='top'] > div {
      bottom: -5px;
   }

   &[data-popper-placement^='bottom'] > div {
      top: -5px;
   }

   &[data-popper-placement^='left'] > div {
      right: -5px;
   }

   &[data-popper-placement^='right'] > div {
      left: -5px;
   }
`

const Arrow = styled(motion.div)`
   visibility: hidden;
   position: absolute;
   width: 10px;
   height: 10px;
   background: inherit;

   &::before {
      position: absolute;
      width: 10px;
      height: 10px;
      background: inherit;
      visibility: visible;
      content: '';
      transform: rotate(45deg);
   }
`

interface ITooltip {
   triggerOnClick?: boolean
}

const Tooltip = ({
   content,
   children,
   placement = 'bottom',
   delay = 0,
   arrow = true,
   triggerOnClick = false,
}: TippyProps & ITooltip) => {
   const springConfig = { damping: 40, stiffness: 400 }
   const initialScale = 0.8
   const opacity = useSpring(0, springConfig)
   const scale = useSpring(initialScale, springConfig)

   function onMount() {
      scale.set(1)
      opacity.set(1)
   }

   function onHide({ unmount }) {
      const cleanup = scale.onChange(value => {
         if (value <= initialScale) {
            cleanup()
            unmount()
         }
      })

      scale.set(initialScale)
      opacity.set(0)
   }

   const [visible, setVisible] = useState(false)
   const show = () => setVisible(true)
   const hide = () => setVisible(false)

   if (triggerOnClick) {
      return (
         <Tippy
            render={attrs => (
               <Box
                  style={{ scale, opacity, padding: '5px 0' }}
                  data-popper-placement={placement}
                  {...attrs}
               >
                  {content}
                  {arrow && <Arrow data-popper-arrow="" />}
               </Box>
            )}
            animation={true}
            onMount={onMount}
            onHide={onHide}
            interactive={true}
            offset={[0, 0]}
            placement={placement}
            visible={visible}
            onClickOutside={hide}
            delay={delay}
         >
            <div onClick={visible ? hide : show}>{children}</div>
         </Tippy>
      )
   }

   return (
      <Tippy
         render={attrs => (
            <Box
               style={{ scale, opacity }}
               data-popper-placement={placement}
               {...attrs}
            >
               {content}
               {arrow && <Arrow data-popper-arrow="" />}
            </Box>
         )}
         animation={true}
         onMount={onMount}
         onHide={onHide}
         interactive={true}
         offset={[0, 7]}
         placement={placement}
         delay={delay}
      >
         {children}
      </Tippy>
   )
}

export default Tooltip
