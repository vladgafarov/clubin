import { AnimatePresence, motion } from 'framer-motion'

interface IFade {
   children: React.ReactNode
   condition: boolean
   className?: string
}

const Fade = ({ children, condition, className }: IFade) => {
   return (
      <AnimatePresence>
         {condition && (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.3 }}
               className={className}
            >
               {children}
            </motion.div>
         )}
      </AnimatePresence>
   )
}

export default Fade
