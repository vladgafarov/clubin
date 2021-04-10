import { createTransport, getTestMessageUrl } from 'nodemailer'

const transport = createTransport({
   host: process.env.MAIL_HOST,
   port: process.env.MAIL_PORT,
   auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
   },
})

const makeEmail = (text: string): string => {
   return `
      <div style="
         border: 1px solid black;
         padding: 20px;
         font-family: sans-serif;
         line-height: 2;
         font-size: 20px;
      ">
         <h2>Hyyy</h2>
         <p>${text}</p>
      </div>
   `
}

export interface MailResponse {
   accepted?: string[] | null
   rejected?: null[] | null
   envelopeTime: number
   messageTime: number
   messageSize: number
   response: string
   envelope: Envelope
   messageId: string
}
export interface Envelope {
   from: string
   to?: string[] | null
}

export const sendPasswordResetEmail = async (
   resetToken: string,
   to: string
) => {
   const info = (await transport.sendMail({
      to,
      from: 'test@example.com',
      subject: 'Your password reset token!',
      html: makeEmail(`Your password reset token is here
         <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click here to reset</a>
      `),
   })) as MailResponse
   if (process.env.MAIL_USER.includes('ethereal.email')) {
      console.log(`💌 Message Sent!  Preview it at ${getTestMessageUrl(info)}`)
   }
}
