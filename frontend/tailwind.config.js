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
         sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
         DEFAULT:
            '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
         md: '0 0 40px rgb(130, 46, 255)',
         lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
         xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
         '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
         inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
         none: 'none',
      },
      // screens: {
      //    desktop: '1260px',
      //    // => @media (min-width: 1280px) { ... }
      // },
   },
   variants: {
      extend: {},
   },
   plugins: [],
}
