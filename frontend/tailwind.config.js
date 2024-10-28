/** @type {import('tailwindcss').Config} */
export default {
  content: [    './index.html',
                './src/**/*.{js,ts,jsx,tsx}',],
                theme: {
                  extend: {},
                  colors:{
                    anaranjado: '#ffac81',
                    rojo: '#ff928b',
                    piel: '#fec3a6',
                    amarillo: '#efe9ae',
                    verde: '#cdeac0',
                  }
                },
                plugins: [
                  require('daisyui'),
                
  ],
}

