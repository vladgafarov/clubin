import { useSpring } from 'react-spring'

export const useAnimation = () => {
   const config = { tension: 200, friction: 15 }
   const initialStyles = { opacity: 0, transform: 'scale(0.8)' }
   const [props, setSpring] = useSpring(() => initialStyles)

   function onMount() {
      setSpring({
         opacity: 1,
         transform: 'scale(1)',
         onRest: () => {},
         config,
      })
   }

   function onHide({ unmount }) {
      setSpring({
         ...initialStyles,
         onRest: unmount,
         config: { ...config, clamp: true },
      })
   }

   return {
      props,
      onMount,
      onHide,
   }
}
