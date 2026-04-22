# .NET 11 Preview 3 — Novidades práticas em C# e libs

O .NET 11 Preview 3 foi disponibilizado para download em 14 de abril, mas só consegui dar uma olhada no que veio de novo agora. Vou trazer um resumo focado nas mudanças de linguagem e nas bibliotecas padrão que impactam o dia a dia do desenvolvedor. Alterações em ASP.NET e CLR merecem um post à parte, pois são mais profundas e menos orientadas ao código do dia a dia.

## System.Text.Json: `JsonNamingPolicy.PascalCase`

A biblioteca `System.Text.Json` agora oferece suporte a PascalCase como política de nomeação através de `JsonNamingPolicy.PascalCase`. Isso facilita quando você precisa serializar objetos mantendo propriedades em PascalCase por padrão, e ainda assim permitir sobrescritas locais.

```csharp
using System.Text.Json;
using System.Text.Json.Serialization;

var options = new JsonSerializerOptions
{
    PropertyNamingPolicy = null,
    PropertyNameCaseInsensitive = true,
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

var jsonInput = "{\"ProductId\":456,\"ProductName\":\"Camiseta\",\"Price\":59.9,\"Description\":\"Algumas%20info\"}";
var parsed = JsonSerializer.Deserialize<Product>(jsonInput, options);
Console.WriteLine($"Deserializando: ProductId={parsed?.ProductId}, ProductName={parsed?.ProductName}, Price={parsed?.Price}");

[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
public sealed class Product
{
    public int ProductId { get; set; }

    [JsonNamingPolicy(JsonKnownNamingPolicy.CamelCase)]
    public string ProductName { get; set; } = string.Empty;

    public decimal Price { get; set; }

    public string? Description { get; set; }
}
```

## Regex: reconhecimento de todas as quebras de linha

A classe `Regex` passou a reconhecer todas as sequências de quebra de linha quando usadas as flags `RegexOptions.Multiline` e `RegexOptions.AnyNewLine`. Antes, era comum trabalhar apenas com `\n`; agora temos suporte a `\r\n`, `\u0085`, `\u2028` e outros, o que melhora a interoperabilidade entre ambientes Windows e UNIX (Mac e Linux).

```csharp
using System.Text.RegularExpressions;

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

// `FormaPagamento` é uma union com variantes `Pix` e `CartaoDeCredito`.
FormaPagamento pagamento1 = new Pix("123.456.789-00");
FormaPagamento pagamento2 = new CartaoDeCredito("João Silva", "1234-5678-9012-3456");

// Pattern matching sobre a union: escolhe o formato de saída conforme a variante.
Console.WriteLine(pagamento1 switch
{
    Pix p => $"Pagamento via Pix. Chave: {p.Chave}",
    CartaoDeCredito c => $"Pagamento via Cartão de Crédito. Titular: {c.NomeTitular}",
});

Console.WriteLine(pagamento2 switch
{
    Pix p => $"Pagamento via Pix. Chave: {p.Chave}",
    CartaoDeCredito c => $"Pagamento via Cartão de Crédito. Titular: {c.NomeTitular}",
});

// Tipos auxiliares que suportam a sintaxe `union` em tempo de compilação/geração.
namespace System.Runtime.CompilerServices
{
    // Atributo que marca uma união (usado pelo compilador).
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Struct, AllowMultiple = false)]
    public sealed class UnionAttribute : Attribute;

    // Interface base para representar o valor interno da união.
    public interface IUnion
    {
        object? Value { get; }
    }
}

// Variáveis concretas da union `FormaPagamento`.
public record class Pix(string Chave);
public record class CartaoDeCredito(string NomeTitular, string Numero);

// Declaração: `FormaPagamento` como union com as variantes acima.
public union FormaPagamento(Pix, CartaoDeCredito);
```