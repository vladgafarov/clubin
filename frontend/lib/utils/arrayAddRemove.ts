export type Data = {
   id: number
   text: string
}

export const remove = (data: Data[], id: number): Data[] => {
   const newArr = [...data]
   newArr.splice(
      data.findIndex(i => i.id === id),
      1
   )
   return newArr
}

let index: number = 0
export const add = (data: Data[], text: string): Data[] => {
   index++

   const newItem = {
      id: index,
      text,
   }
   const newData = [...data, newItem]

   return newData
}
