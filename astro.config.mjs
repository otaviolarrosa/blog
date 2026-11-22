// @ts-check
import { defineConfig } from 'astro/config';
import expressiveCode, { pluginFramesTexts } from 'astro-expressive-code';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

pluginFramesTexts.overrideTexts('pt-BR', {
  copyButtonTooltip: 'Copiar para a área de transferência',
  copyButtonCopied: 'Copiado!',
  terminalWindowFallbackTitle: 'Terminal',
});

export default defineConfig({
  site: 'https://otaviolarrosa.github.io',
  base: '/blog',
  integrations: [
    expressiveCode({
      themes: ['github-dark-default'],
      defaultLocale: 'pt-BR',
      emitExternalStylesheet: false,
      styleOverrides: {
        borderRadius: '0.5rem',
        codeFontFamily: 'var(--font-code)',
        codeFontSize: '0.875rem',
        codeLineHeight: '1.6',
      },
    }),
    sitemap({
      i18n: {
        defaultLocale: 'pt-BR',
        locales: {
          'pt-BR': 'pt-BR',
        },
      },
    }),
  ],
  vite: {
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
