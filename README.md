# 📊 Controle de Gastos Residenciais

Sistema para controle de gastos e receitas residenciais, permitindo o cadastro de pessoas, 
categorias e transações financeiras, com regras de negócio bem definidas, relatórios consolidados e validações no backend.

O projeto foi desenvolvido com foco em organização de código, clareza de regras de domínio e boa comunicação entre front-end e API, 
simulando um cenário real de aplicação.

## 🧠 Objetivo do Projeto
Este projeto tem como objetivo demonstrar:
Conhecimento em API REST com ASP.NET Core;
Uso correto de regras de negócio no backend;
Integração com Front-end em React + TypeScript;
Organização de código, DTOs, Services e Enums;
Validações reais além de simples CRUD;
Boas práticas de separação de responsabilidades.

## 🛠️ Tecnologias Utilizadas
### Backend
ASP.NET Core Web API;

Entity Framework Core;

SQL Server;

C#;

Enums e DTOs;

Validações de domínio no Service.

### Frontend
React;

TypeScript;

Axios;

Hooks (`useState`, `useEffect`);

CSS-in-JS (estilos centralizados).

## 🧱 Arquitetura Geral

O projeto segue uma separação clara de responsabilidades:

```
Backend
├── Controllers
├── Services (regras de negócio)
├── DTOs
├── Models 
│   └── Enums
└── Data (DbContext)
```
```
Frontend
├── Pages
├── Services (integração com API)
├── Models (tipagens)
└── Components
```
## 📌 Conceitos Importantes do Domínio
### 👤 Pessoa
Possui nome e idade.

## 🏷️ Categoria

Cada categoria possui uma finalidade, definida por enum:
```csharp
public enum FinalidadeCategoria
{
    Despesa = 1,
    Receita = 2,
    Ambas = 3
}
```
Isso define quais tipos de transação podem usar essa categoria.

## 💰 Transação
Uma transação representa uma entrada ou saída de dinheiro.
```csharp
public enum TipoTransacao
{
    Despesa = 1,
    Receita = 2
}
```
Cada transação está vinculada a:

Uma pessoa

Uma categoria

Um tipo (Receita ou Despesa)

Um valor

Uma data

## 🔐 Regras de Negócio Implementadas
As principais regras são validadas no backend, garantindo segurança e consistência dos dados.

### Regra 1 — Menores de idade
Pessoas menores de 18 anos não podem cadastrar receitas
Se violada, a API retorna erro.

### Regra 2 — Compatibilidade entre categoria e transação
A categoria só pode ser usada se sua finalidade for compatível com o tipo da transação:

| Categoria | Pode ser usada  |
|----------|------------------|
| Despesa  | Apenas Despesas  |
| Receita  | Apenas Receitas  |
| Ambas    | Receitas e Despesas |

### Regra 3 — Validações gerais
Valor deve ser maior que zero
Pessoa deve existir
Categoria deve existir
Campos obrigatórios validados via DTO

# 📊 Relatórios

### O sistema possui relatórios consolidados:
### 📌 Totais por Pessoa
Total de receitas
Total de despesas
Saldo individual
Total geral do sistema

### 📌 Totais por Categoria
Total de receitas
Total de despesas
Saldo por categoria
Total geral

Os relatórios são calculados no backend e consumidos pelo frontend.

### 🧪 Testes Manuais Realizados

Como forma de validação do funcionamento do sistema, foram realizados testes manuais, incluindo:

— Cadastro de pessoas

— Cadastro de categorias

— Cadastro de transações

— Exclusão de pessoa com remoção em cascata de suas transações

— Tentativa de cadastrar receita para menor de idade (erro esperado)

— Tentativa de usar categoria incompatível (erro esperado)

## 📸 Prints dessas validações estão disponíveis baixo:
Tela Inicial:
![Tela Inicial ](https://github.com/user-attachments/assets/ac10c7bb-02ab-4243-9b80-c69b70f6adef)

Cadastro de Pessoas:
![Tela Pessoas](https://github.com/user-attachments/assets/f993d4aa-8dea-4fe5-be2e-06c8e4f7599b)

Cadastro de Categorias:
![Tela Categorias](https://github.com/user-attachments/assets/a0275fb2-713d-4ea0-917c-0ce2db6d4569)

Cadastro de Transações:
![Tela Transacoes](https://github.com/user-attachments/assets/196223da-0fdc-4760-a5ee-ccd416077b4a)

Relatório por Pessoas:
![Tela Relatorio Pessoa](https://github.com/user-attachments/assets/32161e00-4a1c-4331-91e6-b9b8b4c977f9)

Relatório por Categorias: 
![Tela Relatorio Categoria](https://github.com/user-attachments/assets/c2c0c582-03d1-4e1c-8edc-35d6c047461d)

Excluindo um registro de Pessoa para o teste de exclusão em cascata:
![Tela Pessoas Excluir](https://github.com/user-attachments/assets/c7fa2436-0a0f-46a9-b34f-4ecfa5ed2842)

Transações após a exclusão:
![Tela Transacoes Apos Exclusao](https://github.com/user-attachments/assets/fa45dcac-39aa-49c8-88a2-2f0d95d58ca7)

Erro ao tentar adicionar receita para um menor de idade:
![TelaTransacoesErroAoAddReceitaParaMenor](https://github.com/user-attachments/assets/96a262ad-397e-4dc1-9ad9-96be38b4f9bd)

Erro ao tentar inserir uma categoria que é receita para uma despesa:
![Tela Transacao Erro Ao Atribuir Receita Despesa](https://github.com/user-attachments/assets/73057ebd-4223-411c-84c8-793d244c85eb)

Erro ao tentar o inverso:
![Teste Inverso](https://github.com/user-attachments/assets/26f38404-3b35-4da7-8f77-2acc31652c14)


## 🌐 Comunicação Frontend ↔ Backend
A comunicação é feita via Axios, centralizando as requisições HTTP:
``` ts
export const api = axios.create({
  baseURL: "https://localhost:7065/api"
});
```
## 🚀 Como Executar o Projeto
### Backend
Configure a string de conexão no appsettings.json
Inicie a API

### Frontend
1 - Instale as dependências:

`npm install`

2 - Inicie o projeto:

`npm run dev`

### 📌 Considerações Finais
Esse projeto foi desenvolvido com foco em:
clareza de código;
organização;
regras de negócio bem definidas;
facilidade de entendimento por avaliadores técnicos;
Ele representa um cenário realista de aplicação full stack.
