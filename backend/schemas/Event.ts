import { list } from '@keystone-next/keystone/schema'
import { relationship, text, timestamp } from '@keystone-next/fields'

export const Event = list({
   fields: {
      name: text({ isRequired: true, ui: { description: 'Name of Event' } }),
      time: timestamp({ defaultValue: new Date().toISOString() }),
      place: text({ isRequired: true }),
      description: text({
         ui: {
            displayMode: 'textarea',
         },
      }),
      musician: relationship({
         ref: 'Musician.event',
         many: true,
      }),
      photo: relationship({
         ref: 'Image.event',
         many: false,
         ui: {
            displayMode: 'cards',
            cardFields: ['image', 'altText'],
            inlineCreate: { fields: ['image', 'altText'] },
            inlineEdit: { fields: ['image', 'altText'] },
         },
      }),
   },
   ui: {
      listView: {
         initialColumns: ['name', 'place', 'time'],
      },
   },
})
