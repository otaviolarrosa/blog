# Blog do Otávio Larrosa
Este repositório contém o site pessoal do Otávio Larrosa, gerado com MkDocs e o tema Material for MkDocs. O site é publicado como site estático (GitHub Pages) em [https://otaviolarrosa.github.io/blog](https://otaviolarrosa.github.io/blog).

**Resumo rápido**

- **Site generator**: MkDocs
- **Tema**: Material for MkDocs (`material`)
- **Linguagem**: Português (pt-BR)
- **Deploy**: GitHub Pages (branch `gh-pages`, com build possivelmente acionado por GitHub Actions)
- **Formato do conteúdo**: Markdown (arquivos em `docs/`)

**Arquivo de configuração principal**: `mkdocs.yml`

Conteúdo e estrutura

- `mkdocs.yml`: configuração do site (nome, URL, tema, navegação, plugins e extensões Markdown).
- `docs/`: conteúdo em Markdown. Ex.: `docs/index.md` e `docs/posts/2025/09/hello-world.md`.

Tecnologias e dependências

- `mkdocs` — gerador de site estático para documentação/ blogs simples.
- `material` — tema Material for MkDocs (configurado em `mkdocs.yml`).
- Plugins e extensões usados no `mkdocs.yml`:
  - `search` (plugin)
  - `admonition`, `toc` (com permalink), `pymdownx.highlight`, `pymdownx.superfences` (extensões Markdown)

Como rodar localmente

1. Instale Python 3.8+ e um ambiente virtual (recomendado):

```bash
python -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
```

2. Instale as dependências necessárias (MkDocs + Material):

```bash
pip install mkdocs mkdocs-material pymdown-extensions
```

3. Execute o servidor de desenvolvimento:

```bash
mkdocs serve
```

Abra `http://127.0.0.1:8000/` no navegador para ver o site localmente.

Como gerar o build estático

```bash
mkdocs build
```

O conteúdo gerado ficará em `site/` por padrão.


URLs importantes
- URL do site (configurada em `mkdocs.yml`): [https://otaviolarrosa.github.io/blog](https://otaviolarrosa.github.io/blog)

Estrutura do repositório
- `mkdocs.yml` — config do MkDocs
- `docs/` — arquivos Markdown do site
- `site/` — saída gerada (não versionada normalmente)
- `README.md` — este arquivo


Contato
- E-mail: `otaviolarrosa@outlook.com` (presente em `docs/index.md`).