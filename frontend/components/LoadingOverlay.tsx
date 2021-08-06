import { CgSpinner } from 'react-icons/cg'
import { AnimatePresence, motion } from 'framer-motion'

const Overlay = ({ children }) => (
   <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-40 bg-white bg-opacity-80 flex items-center justify-center text-black"
   >
      {children}
   </motion.div>
)

const Loading = () => (
   <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
   >
      <CgSpinner size={52} className="animate-spin z-50" />
   </motion.div>
)

const LoadingOverlay = ({ loading }: { loading: boolean }) => {
   return (
      <AnimatePresence>
         {loading && (
            <Overlay>
               <Loading />
            </Overlay>
         )}
      </AnimatePresence>
   )
}

export default LoadingOverlay
