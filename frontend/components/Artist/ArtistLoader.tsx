const ArtistLoader = () => {
   return (
      <div className="flex justify-between items-stretch flex-wrap space-x-12 animate-pulse h-80">
         {Array.from({ length: 3 }).map((_, i) => (
            <div className="shadow-2xl h-full flex-1" key={i}>
               <div className="h-2/5 bg-gray-700 rounded mb-4"></div>
               <div className="p-4">
                  <div className="h-9 bg-gray-700 rounded mb-6"></div>
                  <div className="space-y-3">
                     <div className="h-4 bg-gray-700 rounded"></div>
                     <div className="h-4 w-4/5 bg-gray-700 rounded"></div>
                     <div className="h-4 bg-gray-700 rounded"></div>
                     <div className="h-4 w-2/5  bg-gray-700 rounded"></div>
                  </div>
               </div>
            </div>
         ))}
      </div>
   )
}

export default ArtistLoader
