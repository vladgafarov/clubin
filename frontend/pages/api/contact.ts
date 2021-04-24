import 'dotenv/config'
import nodemailer from 'nodemailer'

export default async (req, res) => {
   const { name, email, message } = req.body

   const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      auth: {
         user: process.env.MAIL_USER,
         pass: process.env.MAIL_PASSWORD,
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
         <h2>Hy!</h2>
         <p>${text}</p>
      </div>
      `
   }

   const mailOption = {
      from: `${name} <${email}>`,
      to: `${process.env.MAIL_USER}`,
      subject: `New mail from ${email}`,
      html: makeEmail(`${message}`),
   }

   const info = await transporter.sendMail(mailOption, (err, data) => {
      res.send(JSON.stringify(err))
   })
}
