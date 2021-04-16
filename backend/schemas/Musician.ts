import { list } from '@keystone-next/keystone/schema'
import { relationship, text } from '@keystone-next/fields'

export const Musician = list({
   fields: {
      name: text({ isRequired: true, ui: { description: 'Name of artist' } }),
      description: text({
         ui: {
            displayMode: 'textarea',
         },
      }),
      event: relationship({
         ref: 'Event.musician',
         many: true,
      }),
      photo: relationship({
         ref: 'Image.musician',
         many: false,
         ui: {
            displayMode: 'cards',
            cardFields: ['image', 'altText'],
            inlineCreate: { fields: ['image', 'altText'] },
            inlineEdit: { fields: ['image', 'altText'] },
         },
      }),
   },
})
