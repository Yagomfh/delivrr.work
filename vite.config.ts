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
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split TanStack Router into its own chunk
          if (id.includes('@tanstack/react-router') || id.includes('@tanstack/router-core')) {
            return 'tanstack-router';
          }
          // Split TanStack Query into its own chunk
          if (id.includes('@tanstack/react-query')) {
            return 'tanstack-query';
          }
          // Split tRPC into its own chunk
          if (id.includes('@trpc/')) {
            return 'trpc';
          }
          // Split Radix UI components into their own chunk
          if (id.includes('@radix-ui/')) {
            return 'radix-ui';
          }
          // Split Octokit into its own chunk
          if (id.includes('@octokit/')) {
            return 'octokit';
          }
          // Split other large dependencies
          if (id.includes('node_modules')) {
            if (id.includes('lucide-react') || id.includes('@tabler/icons-react')) {
              return 'icons';
            }
            if (id.includes('fuse.js') || id.includes('date-fns') || id.includes('superjson')) {
              return 'utils';
            }
            // Vendor chunk for other node_modules
            return 'vendor';
          }
        },
      },
    },
  },
  plugins: [
    devtools(),
    nitro({
      vercel: {
        functions: {
          runtime: "bun1.x",
        }
      },
      // Optimize Nitro build
      minify: true,
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
