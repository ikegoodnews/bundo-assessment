/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
   theme: {
      colors: {
         'color-1': '#FF4D4F',
         'color-2': '#ECECEC',
         'color-3': '#34A853',
         'color-3-hover': '#34A85398',
         'color-4': '#333333',
         'color-5': 'rgba(222, 242, 251, 0.3)',
         'color-6': '#C8C8C8',
         'color-7': '#302F2C',
         'color-8': '#0A2211',
         'color-9': 'rgba(0, 0, 0, 0.06)',
      },
      container: {
         padding: '1rem',
         screens: {
            sm: '600px',
            md: '728px',
            lg: '984px',
            xl: '1240px',
            '2xl': '1496px',
         },
      },
      // fontSize: {
      //    10: '10px',
      // },
      borderRadius: {
         5: '5px',
      },
      letterSpacing: {
         1: '1px',
      },
      extend: {
         boxShadow: {
            xl: '0 6px 13px -3px rgba(0, 0, 0, 0.25)',
         },
         // backgroundImage: {
         //    'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
         //    'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
         // },
      },
   },
   variants: {},
   plugins: [],
};
