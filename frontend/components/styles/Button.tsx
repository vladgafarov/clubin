import styled from 'styled-components'
import tw from 'twin.macro'

const Button = styled.button`
   ${tw`
      p-3 
      px-12
      rounded-lg
      font-pm text-blue-400
      border-2 border-blue-400
      transition
      hover:bg-blue-400
      hover:text-white
      focus:ring-2
      focus:ring-blue-600
   `}
   ${props =>
      props.isGradient &&
      tw`text-white border-none ring-2 ring-purple-500 shadow-md hover:ring-4 bg-gradient-to-r from-primary to-secondary
      focus:ring-purple-600`}
`

export default Button
