# VisuAll

## Descrição do Projeto

O VisuAll é um aplicativo SPA (Single Page Application) desenvolvido com foco em acessibilidade, especialmente para idosos e pessoas com necessidades especiais. O projeto visa democratizar o acesso à informação e facilitar a gestão de compromissos médicos através de uma interface intuitiva e acessível.

## Tecnologias Utilizadas

O projeto VisuAll foi construído utilizando as seguintes tecnologias:

- **Frontend:**
  - **React:** Biblioteca JavaScript para construção de interfaces de usuário.
  - **Vite:** Ferramenta de build rápido para projetos web modernos.
  - **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
  - **TailwindCSS:** Framework CSS utilitário para estilização rápida e responsiva.
  - **React Router DOM:** Biblioteca para roteamento declarativo no React.
  - **React Hook Form:** Biblioteca para gerenciamento de formulários com validação.
  - **Zod:** Biblioteca de validação de esquemas para TypeScript.

## Status do Projeto - Sprint 4

A Sprint 4 focou na **integração com o Back-end** e na **conformidade técnica** do projeto.

*   **Funcionalidades:** Foram adicionadas rotas de autenticação (`/login`, `/cadastro`) e contextos para gerenciamento de estado global (Autenticação e Acessibilidade).

## Integrantes da Equipe

| Nome | Função | RM | Habilidades | GitHub | LinkedIn |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Deryk de Souza Queiroz | Front-End Developer | 563412 | React, TypeScript, TailwindCSS, Acessibilidade Web | [deryksouza2006](https://github.com/deryksouza2006) | [Deryk Souza](https://www.linkedin.com/in/deryksouza/) |
| Vinicius Paschoeto da Silva | Data Base Administrator | 563089 | SQL, ORACLE, Mongodb, Chatbot | [pasva01](https://github.com/pasva01) | [Vinícius Paschoeto](https://www.linkedin.com/in/vin%C3%ADcius-paschoeto-785009349/) |
| Lucas Gonçalves Viana | Back-End Developer | 563254 | Java, Python, Panda | [LucasViana130](https://github.com/LucasViana130) | [Lucas Viana](https://www.linkedin.com/in/lucas-viana-262068367/) |

## Estrutura de Pastas do Projeto

A estrutura de pastas foi atualizada para incluir a modularização de serviços e contextos:

```
visuall-git
├── eslint.config.js
├── index.html
├── node_modules/
├── package.json
├── public/
│   └── vite.svg
├── src/
│   ├── App.css
│   ├── App.tsx
│   ├── assets/
│   │   └── images/ (Imagens e ícones do projeto)
│   ├── components/ (Componentes reutilizáveis)
│   │   ├── AccountDrawer.tsx
│   │   ├── BackButton.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── HistoryCard.tsx
│   │   ├── PrivateRoutes.tsx
│   │   └── ReminderCard.tsx
│   ├── context/ (Contextos de estado global)
│   │   ├── AccessibilityContext.tsx
│   │   └── AuthContext.tsx
│   ├── pages/ (Páginas da aplicação)
│   │   ├── auth/ (Páginas de autenticação)
│   │   │   ├── Cadastro.tsx
│   │   │   └── Login.tsx
│   │   ├── Contato.tsx
│   │   ├── Dev.tsx
│   │   ├── DeveloperDetail.tsx
│   │   ├── FAQ.tsx
│   │   ├── Home.tsx
│   │   ├── Instrucoes.tsx
│   │   ├── OuvidoriaHC.tsx
│   │   ├── SobreVisuall.tsx
│   │   └── Tutorial.tsx
│   ├── services/ (Serviços de API)
│   │   └── apiService.ts (Implementação de `fetch` para comunicação com API)
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Links do Projeto

- **Repositório GitHub:** [https://github.com/deryksouza2006/Challenge.git](https://github.com/deryksouza2006/Challenge.git)
- **Vídeo de Apresentação (YouTube):** [https://youtu.be/Y1Jl9EWHx7w?si=x-C1edQ73qPojumv](https://youtu.be/Y1Jl9EWHx7w?si=x-C1edQ73qPojumv)

**Repositório Vercel:** [https://challenge-git-master-deryksouza2006s-projects.vercel.app/](https://challenge-git-master-deryksouza2006s-projects.vercel.app/)
## Análise de APIs, Hooks, Props e Rotas (Pós-Sprint 4)

### APIs

O projeto agora utiliza um serviço de API nativo para todas as requisições HTTP, garantindo a conformidade com as restrições de framework.

*   **Implementação Atual:** Todas as chamadas de API devem ser realizadas através das funções exportadas em **`src/services/apiService.ts`**, que utiliza a API nativa **`fetch`** do JavaScript.
*   **Próximo Passo:** O time deve integrar as funções (`get`, `post`, `put`, `del`) deste serviço nos componentes que necessitam de comunicação com o Back-end.

### Hooks

O projeto faz uso dos seguintes hooks do React:

- **`useState()`:** Amplamente utilizado para gerenciar o estado local dos componentes.
- **`useEffect()`:** Utilizado para gerenciar efeitos colaterais, como chamadas de API (após a integração do `apiService.ts`) e manipulação do DOM.
- **`useNavigate()`:** Implementado para navegação programática entre as rotas.
- **`useParams()`:** Implementado em `DeveloperDetail.tsx` para capturar parâmetros de rotas dinâmicas.
- **`useContext()`:** Utilizado para consumir os dados e funções dos contextos de estado global (`AuthContext` e `AccessibilityContext`).

### Rotas

O projeto utiliza a biblioteca `react-router-dom` para o gerenciamento de rotas, incluindo rotas protegidas (via `PrivateRoutes.tsx`). As rotas identificadas são:

- `/` (Página Inicial)
- `/login` (Página de Login)
- `/cadastro` (Página de Cadastro)
- `/faq` (Perguntas Frequentes)
- `/dev` (Página dos Desenvolvedores)
- `/contato` (Página de Contato)
- `/tutorial` (Página de Tutorial)
- `/instrucoes` (Página de Instruções)
- `/ouvidoria-hc` (Página da Ouvidoria HC)
- `/sobreVisuAll` (Página Sobre o VisuAll)
- `/dev/:id` (Rota dinâmica para detalhes do desenvolvedor, utilizando `useParams()`)

O projeto agora inclui rotas de autenticação e rotas protegidas, demonstrando um sistema de roteamento mais completo.

## Imagens e Ícones do Projeto

O projeto utiliza as seguintes imagens e ícones, localizados em `src/assets/images/`:

- `atencao.png`
- `audio.png`
- `calendario.png`
- `chatbot.png`
- `check.png`
- `compartilhar.png`
- `dev.png`
- `dev1.jpeg`
- `dev2.jpeg`
- `dev3.jpeg`
- `fale.png`
- `ideia.png`
- `imagem ilustrativa.jpg`
- `info.png`
- `informacao.png`
- `instrucao.png`
- `interrogacao.png`
- `lixeira.png`
- `localizacao.png`
- `logo.png`
- `mail.png`
- `mail2.png`
- `pen.png`
- `perfil.png`
- `pessoa.png`
- `relogio.png`
- `relogio2.png`
- `telefone.png`
- `telefone2.png`
- `telefone24.png`
- `tutorial.png`
- `voltar.png`

Além disso, o ícone `react.svg` está presente em `src/assets/`.
