import { createGlobalStyle } from 'styled-components'
import styled from 'styled-components'
import 'tailwindcss/tailwind.css'
import 'tippy.js/dist/tippy.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import tw from 'twin.macro'

export const padding = 'px-7 md:px-12 lg:px-20 xl:px-28 2xl:px-32'

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'proxima';
    src: url('/static/proxima/ProximaNova-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'proxima-medium';
    src: url('/static/proxima/ProximaNova-Semibold.woff') format('woff');
    font-style: normal;
  }
  @font-face {
    font-family: 'proxima-bold';
    src: url('/static/proxima/ProximaNova-Bold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
  }
  html {
    box-sizing: border-box;
    background-color: #21212E;
    color: #fff;
    /* scroll-behavior: smooth; */
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    font-family: 'proxima', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 0;
    margin: 0;
    width: 100%
  }
  img {
    object-fit: contain;
    max-width: 100%;
  }
  a:hover {
    text-decoration: underline;
  }
  .animation-link {
    text-decoration: none;
    position: relative;
    cursor: pointer;
  }
  .animation-link::after {
      position: absolute;
      bottom: 0;
      left: 50%;
      content: '';
      display: block;
      height: 3px;
      width: 0;
      transform: translateX(-50%);
      background-color: #fff;
      transition: 0.2s ease-in-out;
   }
   .animation-link:hover::after {
      width: 100%;
   }
   .animation-link:hover{
     text-decoration: none;
   }
  button {
    outline: none;
  }
  button:focus {
    outline: none;
  }
  ul {
    list-style-type: disc;
    ${tw`pl-10`}
  }
  .slick-slider {
    user-select: text;
  }
  .slick-prev, .slick-next {
    position: absolute;
    width: auto;
    height: auto;
    left: auto;
    right: 0;
    top: auto;
    bottom: -60px;
    z-index: 20;
    border: 1px solid #60A5FA;
    ${tw`
      text-4xl text-blue-400 
      border border-blue-400 rounded-lg
      transition 
      px-2
      hover:bg-blue-400
      hover:text-white
      cursor-pointer
    `}
  }
  .slick-prev, .slick-next {
    &::before {
      display: none;
    }
  }
  .slick-disabled {
    opacity: .5;
    cursor: default !important;
    &:hover {
      background-color: transparent !important;
      color: #60A5FA !important;
    }
  }

  .slick-dots {
    bottom: -32px;
  }
  .slick-dots li button:before {
    font-size: 16px;
    color: #46C2FF;
  }
  .slick-dots li.slick-active button:before {
    color: #46C2FF
  }
`

const InnerStyles = styled.div``

const Page = ({ children }) => {
   return (
      <div>
         <GlobalStyles />
         <InnerStyles>{children}</InnerStyles>
      </div>
   )
}

export default Page
