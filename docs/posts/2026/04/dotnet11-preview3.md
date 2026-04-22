# .NET 11 Preview 3 — Novidades práticas em C# e libs

O .NET 11 Preview 3 foi disponibilizado para download em 14 de abril. Aqui faço um resumo focado nas mudanças de linguagem e nas bibliotecas padrão que impactam o dia a dia do desenvolvedor. Alterações em ASP.NET e CLR merecem um post à parte, pois são mais profundas e menos orientadas ao código do dia a dia.

## System.Text.Json: `JsonNamingPolicy.PascalCase`

A biblioteca `System.Text.Json` agora oferece suporte a PascalCase como política de nomeação através de `JsonNamingPolicy.PascalCase`. Isso facilita quando você precisa serializar objetos mantendo propriedades em PascalCase por padrão, e ainda assim permitir sobrescritas locais.

```csharp
using System;
using System.Text.Json;
using System.Text.Json.Serialization;

[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
public sealed class Product
{
    public int ProductId { get; set; }

    [JsonNamingPolicy(JsonKnownNamingPolicy.CamelCase)]
    public string ProductName { get; set; } = string.Empty;

    public decimal Price { get; set; }

    public string? Description { get; set; }
}

var options = new JsonSerializerOptions
{
    PropertyNamingPolicy = JsonNamingPolicy.PascalCase,
    WriteIndented = true
};

var product = new Product
{
    ProductId = 123,
    ProductName = "Caneca de Cerâmica",
    Price = 29.90m,
    Description = null
};

Console.WriteLine("Serializando com PropertyNamingPolicy = PascalCase (ProductName sobrescrito para camelCase):");
Console.WriteLine(JsonSerializer.Serialize(product, options));

string jsonInput = "{\"ProductId\":456,\"ProductName\":\"Camiseta\",\"Price\":59.9,\"Description\":\"Algumas%20info\"}";
var parsed = JsonSerializer.Deserialize<Product>(jsonInput, options);
Console.WriteLine($"Deserializado: ProductId={parsed?.ProductId}, ProductName={parsed?.ProductName}, Price={parsed?.Price}");
```

## Regex: reconhecimento de todas as quebras de linha

A classe `Regex` passou a reconhecer todas as sequências de quebra de linha quando usadas as flags `RegexOptions.Multiline` e `RegexOptions.AnyNewLine`. Antes, era comum trabalhar apenas com `\n`; agora temos suporte a `\r\n`, `\u0085`, `\u2028` e outros, o que melhora a interoperabilidade entre ambientes Windows e UNIX (Mac e Linux).

```csharp
string textoComMultiplasLinhas = "line1\r\nline2\u0085line3\u2028line4";

var resultadosEncontrados = Regex.Matches(
    textoComMultiplasLinhas,
    @"^line\d$",
    RegexOptions.Multiline | RegexOptions.AnyNewLine);

Console.WriteLine($"Foram encontradas {resultadosEncontrados.Count} correspondências:");
foreach (Match item in resultadosEncontrados)
    Console.WriteLine($"- {item.Value}");
```

## C# 15: Union Types

O C# 15 introduz Union Types, permitindo que um tipo (ou o retorno de um método) seja exatamente uma opção dentro de um conjunto fechado de tipos. Isso evita o uso de `object`, tuplas confusas ou exceções como controle de fluxo, tornando o código mais seguro e expressivo.

Um ganho importante é que o compilador exige pattern matching exaustivo: ao adicionar um novo tipo à união, o código só compila depois que todos os `switch`/expressões forem atualizados para tratar a nova opção.

```csharp
using System;

public record class User(int Id, string Name);
public record class NotFoundError(string Message);
public record class UnauthorizedError(string Reason);

// Define que o resultado será exatamente um desses três tipos
public union FetchUserResult(User, NotFoundError, UnauthorizedError);

public FetchUserResult GetUser(int id, bool isTokenValid)
{
    if (!isTokenValid) return new UnauthorizedError("Token inválido.");
    if (id <= 0) return new NotFoundError("Usuário não encontrado no banco.");

    return new User(id, "Maria da Silva");
}

var result = GetUser(10, true);

// O compilador garante que todos os casos sejam tratados
string message = result switch
{
    User u => $"Sucesso: Bem-vinda, {u.Name}",
    NotFoundError n => $"Aviso: {n.Message}",
    UnauthorizedError e => $"Erro: {e.Reason}"
};

Console.WriteLine(message);
```