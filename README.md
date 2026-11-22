# Blog do Otávio Larrosa

Este repositório contém o blog pessoal e técnico do **Otávio Larrosa**, construído com **Astro**, **TypeScript** e **Tailwind CSS**, publicado no GitHub Pages em [https://otaviolarrosa.github.io/blog/](https://otaviolarrosa.github.io/blog/).

## Estrutura do projeto

- `src/content/posts/` — Artigos em Markdown organizados por ano/mês
- `src/layouts/` — Layouts base e de artigo
- `src/pages/` — Páginas do site (`/` início, `/posts/` listagem, `/sobre/`, `/rss.xml`)
- `src/components/` — Componentes reutilizáveis (Header, Footer, PostCard, BaseHead)
- `astro.config.mjs` — Configuração do Astro (`site`, `base`, Shiki, Sitemap, Tailwind)
- `.github/workflows/deploy.yml` — Pipeline de deploy automático para GitHub Pages

## Como rodar localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:4321/blog/` no navegador.

## Build e validação

```bash
npm run build
npm run preview
```

## Contato

- E-mail: `otaviolarrosa@outlook.com`
