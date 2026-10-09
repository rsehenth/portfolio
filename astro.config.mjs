import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Import component registry
import mdxComponents from './src/components/index.js';

const site = process.env.PUBLIC_SITE_URL || 'https://lsehnemportfolio.pages.dev';

export default defineConfig({
  site,
  integrations: [
    mdx({
      components: mdxComponents,
    }),
    tailwind(),
    sitemap({
      // Never expose error pages in the sitemap
      filter: (page) => !page.includes('/404'),
    }),
  ],
  output: 'static',
  trailingSlash: 'always',
  build: {
    assets: 'assets',
  },
  compressHTML: true,
  prefetch: true,
});
