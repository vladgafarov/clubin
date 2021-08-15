import 'dotenv/config'
import { config, createSchema } from '@keystone-next/keystone/schema'
import { createAuth } from '@keystone-next/auth'
import { statelessSessions } from '@keystone-next/keystone/session'
import { User } from './schemas/User'
import { Event } from './schemas/Event'
import { Image } from './schemas/Image'
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
   sessionData: 'id name email',
   initFirstItem: {
      fields: ['name', 'email', 'password'],
      // itemData: { isAdmin: true },
      skipKeystoneWelcome: false,
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
         idField: { kind: 'uuid' },
         useMigrations: true,
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
         Image,
      }),
      ui: {
         isAccessAllowed: ({ session }) => {
            return !!session?.data
         },
      },
      session: statelessSessions(sessionConfig),
   })
)
