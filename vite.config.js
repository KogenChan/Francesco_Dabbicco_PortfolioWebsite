import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { createHtmlPlugin } from "vite-plugin-html";
import heroSchemaPlugin from './vite-plugin-hero-schema.min.js';

export default defineConfig({
   plugins: [
      react(),
      tailwindcss(),
      createHtmlPlugin({
         inject: {
            injectData: {
               canonical: 'https://www.francescodabbiccoart.com/'
            }
         }
      }),
      heroSchemaPlugin(),
   ],
})
