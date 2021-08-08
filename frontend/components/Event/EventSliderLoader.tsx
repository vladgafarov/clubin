const EventSliderLoader = () => {
   return (
      <div className="animate-pulse space-y-4 mt-4">
         {Array.from({ length: 5 }).map((_, i) => (
            <div
               className="flex items-center space-x-9 h-16 shadow-2xl "
               key={i}
            >
               <div className="w-1/5 bg-gray-700 h-full rounded"></div>
               <div className="w-2/5 bg-gray-700 h-5 rounded"></div>
               <div className="w-1/5 bg-gray-700 h-5 rounded"></div>
               <div className="w-1/5 bg-purple-500 h-full rounded"></div>
            </div>
         ))}
      </div>
   )
}

export default EventSliderLoader
