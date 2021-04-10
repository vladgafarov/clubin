import { relationship, text } from '@keystone-next/fields'
import { list } from '@keystone-next/keystone/schema'
import { cloudinaryImage } from '@keystone-next/cloudinary'
import { isSignedIn, permissions } from '../access'

export const cloudinary = {
   cloudName: process.env.CLOUDINARY_CLOUD_NAME,
   apiKey: process.env.CLOUDINARY_KEY,
   apiSecret: process.env.CLOUDINARY_SECRET,
   folder: 'sickfits123',
}

export const EventImage = list({
   fields: {
      image: cloudinaryImage({
         cloudinary,
         label: 'Source',
      }),
      altText: text(),
      event: relationship({ ref: 'Event.photo' }),
   },
   ui: {
      listView: {
         initialColumns: ['image', 'altText', 'event'],
      },
   },
})
