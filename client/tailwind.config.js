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
                // wiggle: {
                //   '0%': { transform: 'scale(0.5) rotate(0deg)' },
                //   '10%': { transform: 'scale(0.5) rotate(-1deg)' },
                //   '20%': { transform: 'scale(0.5) rotate(1deg)' },
                //   '35%': { transform: 'scale(0.5) rotate(-1deg)' },
                //   '50%': { transform: 'scale(0.5) rotate(1deg)' },
                //   '60%': { transform: 'scale(0.5) rotate(-1deg)' },
                //   '70%': { transform: 'scale(0.5) rotate(1deg)' },
                //   '85%': { transform: 'scale(3) rotate(-1deg)' },
                //   '100%': {transform: 'scale(1) roatate(0deg)'}
                // }
                scale: {
                  '0%': { transform: 'scale(0) '},
                  '50%': { transform: 'scale(2) '},
                  '100%': {transform: 'scale(1) '}
                },
                fadeIn: {
                  '0%': { opacity: '0'},
                  '50%': { opacity: '0'},
                  '100%': {opacity: '1'}
                }
            },
              animation: {
                wiggle: 'scale 2s ease-in-out',
                fadeIn: 'fadeIn 5s ease-in-out' // Short shake animation
            },

        } 
    },
    plugins: [],
  };
  