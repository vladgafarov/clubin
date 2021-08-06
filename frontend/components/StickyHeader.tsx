import styled from 'styled-components'
import tw from 'twin.macro'
import Links from './Links'

const StickyHeaderStyles = styled.div`
   background-color: #21212e;
   ${tw`
      hidden xl:flex
      fixed w-full top-0 left-0 z-30
      justify-center space-x-12
      text-xl 2xl:text-2xl font-pm
      py-5
      transition
      transform -translate-y-full
      shadow-xl
   `}
   ${props => props.isScrolled && tw`translate-y-0`}
`

const StickyHeader = ({ isScrolled }) => {
   return (
      <StickyHeaderStyles isScrolled={isScrolled}>
         <Links spy={true} />
      </StickyHeaderStyles>
   )
}

export default StickyHeader
