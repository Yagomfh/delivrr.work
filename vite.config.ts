import { defineConfig, type Plugin } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Plugin to suppress source map warnings for lucide-react/dynamic
const suppressSourceMapWarning = (): Plugin => {
  return {
    name: 'suppress-sourcemap-warning',
    enforce: 'pre',
    configureServer(server) {
      const originalWarn = server.config.logger.warn.bind(server.config.logger)
      server.config.logger.warn = (msg: string, options?: Parameters<typeof originalWarn>[1]) => {
        if (msg.includes('Failed to load source map') && msg.includes('lucide-react/dynamic.mjs')) {
          return
        }
        originalWarn(msg, options)
      }
    },
  }
}

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
  server: {
    allowedHosts: ['ec10f72ddbd1.ngrok-free.app']
  },
  plugins: [
    devtools(),
    nitro({
      vercel: {
        functions: {
          runtime: "bun1.x",
        }
      }
    }),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
    suppressSourceMapWarning(),
  ],
})

export default config
