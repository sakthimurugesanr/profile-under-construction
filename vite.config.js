import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  ssr: { noExternal: ['gsap'] },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // Optimize bundle size (using esbuild instead of terser)
    minify: 'esbuild',
    // Split chunks for better caching
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React vendor chunk
          if (id.includes('react') || id.includes('react-dom') || id.includes('react-helmet-async')) {
            return 'react-vendor'
          }
          // Animation vendor chunk
          if (id.includes('gsap')) {
            return 'animation-vendor'
          }
        },
        // Optimize chunk naming for better caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Enable source maps for production debugging (disable for production)
    sourcemap: false,
    // Chunk size warning limit
    chunkSizeWarningLimit: 500,
    // CSS code splitting
    cssCodeSplit: true,
    // Optimize CSS
    cssMinify: true,
    // Additional build optimizations
    target: 'es2015',
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'gsap'],
    exclude: ['@tsparticles/react', '@tsparticles/slim', 'three'],
  },
  // Server configuration
  server: {
    host: true,
    port: 3000,
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  },
})
