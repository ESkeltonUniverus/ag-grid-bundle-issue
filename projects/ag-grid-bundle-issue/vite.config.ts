import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig, type Plugin } from 'vite'

const projectRoot = resolve(import.meta.dirname)
const sharedEntry = resolve(import.meta.dirname, '../../packages/ag-grid-bundle-shared/src/index.ts')
const agGridCommunityRoot = resolve(import.meta.dirname, '../../packages/ag-grid/packages/ag-grid-community')
const agGridCommunitySrcRoot = resolve(agGridCommunityRoot, 'src')

function agGridRawCssPlugin(): Plugin {
  return {
    name: 'ag-grid-raw-css',
    enforce: 'pre',
    transform(code, id) {
      if (!id.startsWith(agGridCommunityRoot) || !id.endsWith('.ts')) {
        return null
      }

      const rewritten = code.replaceAll(
        /from\s+(['"])(\.\.?(?:\/[^'"]+)+\.css)\1/g,
        (_match, quote, importPath) => `from ${quote}${importPath}?inline${quote}`,
      )

      if (rewritten === code) {
        return null
      }

      return rewritten
    },
  }
}

export default defineConfig(({ mode }) => {
  const useAgGridSource = mode === 'source'
  const outputDir = useAgGridSource ? 'dist-source' : 'dist'

  return {
    resolve: {
      alias: {
        '@workspace/ag-grid-bundle-shared': sharedEntry,
        ...(useAgGridSource
          ? {
              'ag-grid-community': resolve(agGridCommunityRoot, 'src/main.ts'),
              'ag-grid-react': resolve(
                import.meta.dirname,
                'node_modules/ag-grid-react/dist/package/index.esm.mjs',
              ),
            }
          : {}),
      },
    },
    plugins: [
      react(),
      ...(useAgGridSource ? [agGridRawCssPlugin()] : []),
      visualizer({
        filename: resolve(import.meta.dirname, outputDir, 'stats.html'),
        template: 'treemap',
        gzipSize: true,
        brotliSize: true,
        open: false,
      }),
    ],
    optimizeDeps: useAgGridSource
      ? {
          exclude: ['ag-grid-community'],
        }
      : undefined,
    server: useAgGridSource
      ? {
          fs: {
            allow: [projectRoot, agGridCommunityRoot],
          },
        }
      : undefined,
    assetsInclude: useAgGridSource ? [`${agGridCommunitySrcRoot}/**/*.css`] : undefined,
    build: {
      outDir: outputDir,
      sourcemap: true,
    },
  }
})
