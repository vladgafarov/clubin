import { motion } from 'framer-motion'

const SmoothTransition = ({
   name,
   transition,
}: {
   name: string
   transition?: {}
}) => {
   return (
      <motion.div
         layoutId={name}
         className={name}
         initial={false}
         animate={{ opacity: 1 }}
         transition={{
            type: 'spring',
            stiffness: 500,
            damping: 50,
         }}
      />
   )
}

export default SmoothTransition
