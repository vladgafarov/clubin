import 'dotenv/config'
import { config, createSchema } from '@keystone-next/keystone/schema'
import { createAuth } from '@keystone-next/auth'
import {
   withItemData,
   statelessSessions,
} from '@keystone-next/keystone/session'
import { User } from './schemas/User'
import { Event } from './schemas/Event'
import { EventImage } from './schemas/EventImage'
import { MusicianImage } from './schemas/MusicianImage'
import { Musician } from './schemas/Musician'
import { insertSeedData } from './seed-data'
import { sendPasswordResetEmail } from './lib/mail'

const databaseURL =
   process.env.DATABASE_URL ||
   'postgres://localhost/keystone-sick-fits-tutorial'

const sessionConfig = {
   maxAge: 60 * 60 * 24 * 360,
   secret: process.env.COOKIE_SECRET,
}

const { withAuth } = createAuth({
   listKey: 'User',
   identityField: 'email',
   secretField: 'password',
   initFirstItem: {
      fields: ['name', 'email', 'password'],
   },
   passwordResetLink: {
      async sendToken(args) {
         await sendPasswordResetEmail(args.token, args.identity)
      },
   },
})

export default withAuth(
   config({
      server: {
         cors: {
            origin: [process.env.FRONTEND_URL],
            credentials: true,
         },
      },
      db: {
         adapter: 'prisma_postgresql',
         url: databaseURL,
         async onConnect(keystone) {
            if (process.argv.includes('--seed-data')) {
               await insertSeedData(keystone)
            }
         },
      },
      lists: createSchema({
         User,
         Event,
         Musician,
         EventImage,
         MusicianImage,
      }),
      ui: {
         isAccessAllowed: ({ session }) => {
            return !!session?.data
         },
      },
      session: withItemData(statelessSessions(sessionConfig), {
         User: `id name email`,
      }),
   })
)
