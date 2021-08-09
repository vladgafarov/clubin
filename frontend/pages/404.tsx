import Link from 'next/link'

export default function Custom404() {
   return (
      <div
         className="w-full bg-gray-700 flex flex-col items-center justify-center"
         style={{ height: '100vh' }}
      >
         <h1 className="text-2xl font-pb text-white">404 - Page Not Found</h1>
         <Link href="/">To main page</Link>
      </div>
   )
}
