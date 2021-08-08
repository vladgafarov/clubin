const EventInfoLoader = () => {
   return (
      <div className="col-span-3 mr-12 rounded-xl overflow-hidden shadow-xl animate-pulse">
         <div className="h-2/5 bg-gray-700 rounded"></div>
         <div className="p-4 h-3/5 flex flex-col justify-between">
            <div>
               <div className="h-5 bg-gray-700 mb-4 rounded"></div>
               <div className="h-5 w-2/5 bg-gray-700 mb-4 rounded"></div>
            </div>
            <div>
               <div className="h-5 mb-4 bg-gray-700 rounded"></div>
               <div className="h-5 w-4/5 bg-gray-700 rounded"></div>
            </div>
            <div className="h-5 w-2/5 bg-gray-700 rounded"></div>
         </div>
      </div>
   )
}

export default EventInfoLoader
