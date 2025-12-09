import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const config = defineConfig({
  optimizeDeps: {
    exclude: ["bun"]
  },
  ssr: {
    external: ["bun"]
  },
  resolve: {
    alias: {
      'lucide-react/dynamic': path.resolve(__dirname, 'node_modules/lucide-react/dynamic.mjs'),
    },
  },
  plugins: [
    devtools(),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart(),
    nitro({
      vercel: {
        functions: {
          runtime: "bun1.x",
        }
      },
    }),
    viteReact(),
  ],
})

export default config
