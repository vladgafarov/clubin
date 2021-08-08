const EventsLoader = () => {
   return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-6 animate-pulse">
         {Array.from({ length: 4 }).map((_, i) => (
            <div
               key={i}
               className="border-2 border-gray-600 rounded-lg flex items-stretch w-full overflow-hidden shadow-xl"
            >
               <div className="flex-none relative w-1/3 bg-gray-700"></div>
               <div className="flex-auto p-4">
                  <div className="h-7 bg-gray-700 rounded mb-4"></div>
                  <div className="h-4 w-1/4 bg-gray-700 rounded mb-3"></div>
                  <div className="h-4 w-1/5 bg-gray-700 rounded"></div>
               </div>
            </div>
         ))}
      </div>
   )
}

export default EventsLoader
