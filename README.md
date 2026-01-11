#📊 Controle de Gastos Residenciais#

Sistema completo para controle de gastos e receitas residenciais, permitindo o cadastro de pessoas, 
categorias e transações financeiras, com regras de negócio bem definidas, relatórios consolidados e validações no backend.

O projeto foi desenvolvido com foco em organização de código, clareza de regras de domínio e boa comunicação entre front-end e API, 
simulando um cenário real de aplicação.

##🧠 Objetivo do Projeto##
Este projeto tem como objetivo demonstrar:
Conhecimento em API REST com ASP.NET Core;
Uso correto de regras de negócio no backend;
Integração com Front-end em React + TypeScript;
Organização de código, DTOs, Services e Enums;
Validações reais além de simples CRUD;
Boas práticas de separação de responsabilidades.

##🛠️ Tecnologias Utilizadas##
###Backend###
ASP.NET Core Web API;
Entity Framework Core;
SQL Server;
C#;
Enums e DTOs;
Validações de domínio no Service.

###Frontend###
React;
TypeScript;
Axios;
Hooks (`useState`, `useEffect`);
CSS-in-JS (estilos centralizados).

##🧱 Arquitetura Geral##

O projeto segue uma separação clara de responsabilidades:

###Backend###
```
├── Controllers
├── Services (regras de negócio)
├── DTOs
├── Models 
│   └── Enums
└── Data (DbContext)
```
```
###Frontend###
├── Pages
├── Services (integração com API)
├── Models (tipagens)
└── Components
```
##📌 Conceitos Importantes do Domínio##
###👤 Pessoa###
Possui nome e idade
Regra importante: pessoas menores de idade não podem ter receitas.

##🏷️ Categoria##

Cada categoria possui uma finalidade, definida por enum:
```
public enum FinalidadeCategoria
{
    Despesa = 1,
    Receita = 2,
    Ambas = 3
}
```
Isso define quais tipos de transação podem usar essa categoria.

##💰 Transação##
Uma transação representa uma entrada ou saída de dinheiro.
```
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

##🔐 Regras de Negócio Implementadas##
As principais regras são validadas no backend, garantindo segurança e consistência dos dados.

###Regra 1 — Menores de idade###
Pessoas menores de 18 anos não podem cadastrar receitas
Se violada, a API retorna erro.

###Regra 2 — Compatibilidade entre categoria e transação###
A categoria só pode ser usada se sua finalidade for compatível com o tipo da transação:

Categoria	Pode usar em
Despesa	Apenas Despesas
Receita	Apenas Receitas
Ambas	Receitas e Despesas

###Regra 3 — Validações gerais###
Valor deve ser maior que zero
Pessoa deve existir
Categoria deve existir
Campos obrigatórios validados via DTO

##📊 Relatórios##

#O sistema possui relatórios consolidados:#
##📌 Totais por Pessoa##
Total de receitas
Total de despesas
Saldo individual
Total geral do sistema

##📌 Totais por Categoria##
Total de receitas
Total de despesas
Saldo por categoria
Total geral
Os relatórios são calculados no backend e consumidos pelo frontend.

##🧪 Testes Manuais Realizados##
Como forma de validação do funcionamento do sistema, foram realizados testes manuais, incluindo:
— Cadastro de pessoas
— Cadastro de categorias
— Cadastro de transações
— Exclusão de pessoa com remoção em cascata de suas transações
— Tentativa de cadastrar receita para menor de idade (erro esperado)
— Tentativa de usar categoria incompatível (erro esperado)

##📸 Prints dessas validações estão disponíveis baixo:##

##🌐 Comunicação Frontend ↔ Backend##
A comunicação é feita via Axios, centralizando as requisições HTTP:
```
export const api = axios.create({
  baseURL: "https://localhost:7065/api"
});
```
##🚀 Como Executar o Projeto##
###Backend###
Configure a string de conexão no appsettings.json
Inicie a API

###Frontend###
1 - Instale as dependências:
`npm install`
2 - Inicie o projeto:
`npm run dev`

###📌 Considerações Finais###
Esse projeto foi desenvolvido com foco em:
clareza de código;
organização;
regras de negócio bem definidas;
facilidade de entendimento por avaliadores técnicos;
Ele representa um cenário realista de aplicação full stack.
