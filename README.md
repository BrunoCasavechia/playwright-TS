# Projeto de Automação E2E com Playwright + TypeScript

Projeto de automação End-to-End utilizando Playwright com TypeScript para validação de criação de tarefas, incluindo controle de massa de dados e organização de testes.

---

## Tecnologias Utilizadas:

* Playwright

* TypeScript

* Playwright Test Runner

* APIRequestContext (controle de dados via API)

* Yarn

---

## Estrutura do Projeto:

```

├── apps/                  # Application under test
├── tests/
│   ├── fixtures/          # Test data and reusable helpers
│   ├── task.model.ts      # Task data model definition
│   └── test_creating_new_task.spec.ts
│
├── test-results/           # Generated reports and test artifacts
├── Insomnia_mark.json     # API collection for manual testing
├── package.json
├── yarn.lock
└── README.md

```
---

## Instalação:

1. Clonar o repositório

```
git clone https://github.com/BrunoCasavechia/playwright-TS.git
```
2. Instalar dependências:
```
yarn install
```
3. Instalar navegadores do Playwright:
   
```
npx playwright install
```

---

## Execução dos Testes:

1. Executar todos os testes:
```
npx playwright test
```
2. Executar em modo visual:
```
npx playwright test --headed
```
3. Executar teste específico:
```
npx playwright test tests/test_creating_new_task.spec.ts
```
4. Abrir relatório:
```
npx playwright show-report
```
---

## Estratégia de Testes:

* Testes independentes

* Controle de massa via API

* Estrutura organizada em fixtures

* Modelagem de dados separada (task.model.ts)

* Comentários estruturados no padrão GIVEN / WHEN / THEN

---

## Controle de Massa:

Utilização do APIRequestContext do Playwright para:

* Remover tarefas existentes antes do teste

* Garantir idempotência

* Evitar dependência entre cenários

---

## Objetivo:

Garantir qualidade e confiabilidade no fluxo de criação de tarefas, aplicando boas práticas de automação com Playwright e TypeScript.
