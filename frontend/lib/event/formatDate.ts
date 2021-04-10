import { format } from 'date-fns'

interface IDate {
   month: string
   dayOfMonth: string
   dayOfWeek: string
   time: string
}

const formatDate = (date: Date): IDate => {
   const month = format(date, 'MMMM')
   const dayOfMonth = format(date, 'dd')
   const dayOfWeek = format(date, 'EEEE')
   const time = format(date, 'h:mm aaaa')

   return {
      month,
      dayOfMonth,
      dayOfWeek,
      time,
   }
}

export default formatDate
