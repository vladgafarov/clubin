import axios from 'axios'

interface SendEmailProps {
   name: string
   email: string
   message: string
}

const sendEmail = async (values: SendEmailProps) => {
   const res = await axios.post('/api/contact', values, {
      headers: {
         'Content-Type': 'application/json',
      },
   })

   return res
}

export default sendEmail
