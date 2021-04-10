module.exports = {
   purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
   darkMode: false, // or 'media' or 'class'
   theme: {
      fontFamily: {
         p: ['proxima'],
         pm: ['proxima-medium'],
         pb: ['proxima-bold'],
      },
      gradientColorStops: () => ({
         primary: '#5F9DFE',
         secondary: '#B817FA',
         danger: '#e3342f',
      }),
      boxShadow: {
         md: '0 0 40px rgb(130, 46, 255)',
         none: 'none',
      },
   },
   variants: {
      extend: {},
   },
   plugins: [],
}
