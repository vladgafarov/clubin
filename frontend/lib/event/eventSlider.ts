const eventSlider = (perPage: number, events: Array<Object>) => {
   let helperArr = []
   let output = []

   for (let index in events) {
      if (+index % perPage === 0 && +index > 0) {
         output = [...output, helperArr]
         helperArr = []
      }
      helperArr.push(events[index])
      if (+index + 1 === events.length) {
         output = [...output, helperArr]
      }
   }

   return output
}

export default eventSlider
