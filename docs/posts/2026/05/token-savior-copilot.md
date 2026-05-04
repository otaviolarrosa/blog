# Token Savior + GitHub Copilot: Como Configurar o Servidor MCP

## O que é o Token Savior e por que você vai querer ele

Se você usa o GitHub Copilot no dia a dia, já deve ter percebido que contextos grandes consomem tokens rapidamente. O **Token Savior** é um servidor MCP (Model Context Protocol) que atua como um filtro inteligente entre o seu ambiente e o modelo: ele comprime, resume e prioriza o contexto antes de enviá-lo, reduzindo o consumo de tokens sem perder informação relevante.

Neste post você vai aprender a configurar o Token Savior tanto no **Copilot CLI** quanto no **VS Code**, usando o `uvx` como runtime — e vai sair daqui sabendo resolver os três erros mais comuns que aparecem no Windows.


## Passo 1 — Instalar o `uv`

O `uv` é o gerenciador de pacotes Python ultrarrápido da Astral que usaremos para rodar o Token Savior via `uvx`, sem precisar criar um ambiente virtual manualmente.

Abra o **PowerShell** e execute:

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

Após a instalação, feche e reabra o terminal. Confirme que o `uvx` está disponível:

```powershell
uvx --version
```

## Passo 2 — Configurar o Servidor MCP

Independente de você configurar no Copilot CLI ou no VS Code, o bloco de configuração JSON é o mesmo. Localize o arquivo de configuração correto para cada ferramenta (detalhado abaixo) e insira o seguinte JSON:

```json
{
  "mcpServers": {
    "token-savior-recall": {
      "type": "stdio",
      "command": "C:\\Users\\otavio.larrosa\\.cargo\\bin\\uvx.exe",
      "args": [
        "--quiet",
        "--with",
        "mcp",
        "token-savior"
      ],
      "env": {
        "WORKSPACE_ROOTS": "C:\\dev",
        "TOKEN_SAVIOR_CLIENT": "vscode,github-copilot-cli"
      }
    }
  }
}
```

## Passo 3 — Configurar no Copilot CLI

O Copilot CLI lê a configuração MCP de um arquivo YAML ou JSON localizado em:
`%APPDATA%\GitHub\copilot-cli\mcp-settings.json`

Se o arquivo não existir, crie-o. Insira o JSON do Passo 2 completo e salve.

Reinicie o Copilot CLI e teste com um prompt qualquer. Você deverá ver o servidor `token-savior-recall` listado como contexto ativo.

## Passo 4 — Configurar no VS Code

No VS Code, a configuração de servidores MCP fica dentro das **User Settings (JSON)**. Abra o arquivo de configurações:

1. Pressione `Ctrl + Shift + P`
2. Digite `Preferences: Open User Settings (JSON)`
3. Adicione a chave `mcpServers` dentro do objeto raiz do seu `settings.json`, mesclando com o JSON do Passo 2

O resultado final no seu `settings.json` deve se parecer com isto:

```json
{
  // ... suas outras configurações do VS Code ...
  "mcpServers": {
    "token-savior-recall": {
      "type": "stdio",
      "command": "C:\\Users\\otavio.larrosa\\.cargo\\bin\\uvx.exe",
      "args": [
        "--quiet",
        "--with",
        "mcp",
        "token-savior"
      ],
      "env": {
        "WORKSPACE_ROOTS": "C:\\dev",
        "TOKEN_SAVIOR_CLIENT": "vscode,github-copilot-cli"
      }
    }
  }
}
```

Salve o arquivo e recarregue o VS Code (`Ctrl + Shift + P` → `Developer: Reload Window`). O Copilot passará a usar o Token Savior automaticamente nas sessões de chat.