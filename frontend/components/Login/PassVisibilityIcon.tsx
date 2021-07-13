import { FiEye, FiEyeOff } from 'react-icons/fi'
import { useRegisterModal } from '../../lib/useRegisterModal'

const PassVisibilityIcon = () => {
   const { isPassVisible, setPassVisible } = useRegisterModal()

   if (isPassVisible) {
      return (
         <FiEye
            className="icon"
            onClick={() => setPassVisible(!isPassVisible)}
         />
      )
   }
   return (
      <FiEyeOff
         className="icon"
         onClick={() => setPassVisible(!isPassVisible)}
      />
   )
}

export default PassVisibilityIcon
