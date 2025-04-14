/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html", 
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: { 
        extend: {
            colors: {
                "primary-200" : '#1e76bb',
                "primary-100" : '#65aee7',
                "primary-50" : '#a6d0f2',
                "secondary-200": "#00b050",
                "secondary-100": "#66ffab"
            },
            keyframes: {
                fadeIn: {
                  '0%': { opacity: '0', transform: 'scale(0)'},
                  '100%': {opacity: '1', transform: 'scale(1)'}
                }
            },
              animation: {
                fadeIn: 'fadeIn 2s ease-in-out',
            }
        } 
    },
    plugins: [],
  };
  