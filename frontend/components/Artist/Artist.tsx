import styled from 'styled-components'
import Slider from 'react-slick'
import NextArrow from '../slider/NextArrow'
import PrevArrow from '../slider/PrevArrow'
import tw from 'twin.macro'
import { padding } from '../Page'
import ArtistItem from './ArtistItem'
import gql from 'graphql-tag'
import DisplayError from '../ErrorMessage'
import { useQuery } from '@apollo/client'
import ArtistLoader from './ArtistLoader'

const ARTIST_QUERY = gql`
   query {
      allMusicians(first: 6) {
         id
         name
         description
         photo {
            altText
            image {
               publicUrlTransformed
            }
         }
      }
   }
`

const ArtistStyles = styled.section`
   ${tw`mt-10 pb-20`}
   background-image: url('/images/main2.png');
   background-repeat: no-repeat;
   background-size: 65%;
   background-position: right 20%;
   h1 {
      ${tw`
         uppercase
         text-blue-400 font-pb text-center text-5xl
         pb-2 sm:pb-10
      `}
   }
   img {
      object-fit: cover;
   }
   .slick-track {
      ${tw`py-10`}
   }
   .slick-slide {
      transform: translateX(1.25rem);
      ${tw`pr-10`}
      @media (max-width: 630px) {
         transform: translateX(0);
         ${tw`pr-0`}
      }
   }
   .slide {
      outline: none;
      background-color: #20202c;
      box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
      overflow: hidden;
      ${tw`pb-4 rounded-lg`}
      @media (max-width: 630px) {
         box-shadow: none;
         ${tw`border-2 border-purple-900`}
      }
   }
   .slide:not(:first-child) {
      ${tw`ml-20`}
   }
   .slide .slide-top,
   .slide .slide-bottom {
      ${tw`px-4 sm:px-8`}
   }
   .slide .slide-top {
      ${tw`
         flex justify-between items-center
         mb-4
      `}
   }
   .slide .slide-bottom {
      ${tw`mt-4`}
      h2 {
         ${tw`font-pb text-2xl`}
      }
      hr {
         display: block;
         border: 1px solid #9514c6;
         width: 60%;
         margin: 10px 0;
      }
   }
   .slick-prev {
      left: 35%;
      right: auto !important;
      @media (max-width: 1025px) {
         left: 30%;
      }
      @media (max-width: 630px) {
         left: -5%;
      }
   }
   .slick-next {
      right: 35%;
      @media (max-width: 1025px) {
         right: 30%;
      }
      @media (max-width: 630px) {
         right: -5%;
      }
   }
`

const Artist = () => {
   const settings = {
      dots: true,
      infinite: false,
      speed: 400,
      slidesToShow: 3,
      slidesToScroll: 1,
      swipe: false,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
         {
            breakpoint: 1025,
            settings: {
               swipe: true,
               slidesToShow: 2,
            },
         },
         {
            breakpoint: 630,
            settings: {
               swipe: true,
               slidesToShow: 1,
            },
         },
      ],
   }

   const { data, loading, error } = useQuery(ARTIST_QUERY)

   if (error) return <DisplayError error={error} />

   return (
      <ArtistStyles className={padding} id="artist">
         <h1>Artists</h1>
         {loading ? (
            <ArtistLoader />
         ) : (
            <Slider {...settings} className="slider">
               {data.allMusicians.map(item => (
                  <ArtistItem item={item} key={item.id} />
               ))}
            </Slider>
         )}
      </ArtistStyles>
   )
}

export default Artist
