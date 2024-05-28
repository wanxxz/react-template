import { defineConfig } from '@tanstack/start/config'
import { glob } from 'glob'
import tsconfigPathsPlugin from 'vite-tsconfig-paths'

export default defineConfig({
  routers: {
    ssr: {
      entry: './src/server.tsx'
    },
    client: {
      entry: './src/client.tsx'
    }
  },
  vite: {
    plugins: [tsconfigPathsPlugin()],
    ssr: {
      noExternal: ['@adobe/react-spectrum', '@react-spectrum/*', '@spectrum-icons/*'].flatMap(spec =>
        glob.sync(`${spec}`, { cwd: 'node_modules/' })
      )
    }
  }
})
