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

## Integrantes da Equipe

| Nome                       | Função                    | RM        | Habilidades                                   | GitHub                                         | LinkedIn                                                                 |
|----------------------------|---------------------------|-----------|-----------------------------------------------|------------------------------------------------|--------------------------------------------------------------------------|
| Deryk de Souza Queiroz     | Front-End Developer       | 563412    | React, TypeScript, TailwindCSS, Acessibilidade Web | [deryksouza2006](https://github.com/deryksouza2006) | [Deryk Souza](https://www.linkedin.com/in/deryksouza/)                   |
| Vinicius Paschoeto da Silva| Data Base Administrator   | 563089    | SQL, ORACLE, Mongodb, Chatbot                 | [pasva01](https://github.com/pasva01)          | [Vinícius Paschoeto](https://www.linkedin.com/in/vin%C3%ADcius-paschoeto-785009349/) |
| Lucas Gonçalves Viana      | Back-End Developer        | 563254    | Java, Python, Panda                           | [LucasViana130](https://github.com/LucasViana130) | [Lucas Viana](https://www.linkedin.com/in/lucas-viana-262068367/)         |

## Estrutura de Pastas do Projeto

```
visuall-git
├── eslint.config.js
├── index.html
├── node_modules/
├── package-lock.json
├── package.json
├── public/
│   └── vite.svg
├── src/
│   ├── App.css
│   ├── App.tsx
│   ├── assets/
│   │   ├── images/
│   │   │   ├── atencao.png
│   │   │   ├── audio.png
│   │   │   ├── calendario.png
│   │   │   ├── chatbot.png
│   │   │   ├── check.png
│   │   │   ├── compartilhar.png
│   │   │   ├── dev.png
│   │   │   ├── dev1.jpeg
│   │   │   ├── dev2.jpeg
│   │   │   ├── dev3.jpeg
│   │   │   ├── fale.png
│   │   │   ├── ideia.png
│   │   │   ├── imagem ilustrativa.jpg
│   │   │   ├── info.png
│   │   │   ├── informacao.png
│   │   │   ├── instrucao.png
│   │   │   ├── interrogacao.png
│   │   │   ├── lixeira.png
│   │   │   ├── localizacao.png
│   │   │   ├── logo.png
│   │   │   ├── mail.png
│   │   │   ├── mail2.png
│   │   │   ├── perfil.png
│   │   │   ├── pessoa.png
│   │   │   ├── relogio.png
│   │   │   ├── relogio2.png
│   │   │   ├── telefone.png
│   │   │   ├── telefone2.png
│   │   │   ├── telefone24.png
│   │   │   ├── tutorial.png
│   │   │   └── voltar.png
│   │   └── react.svg
│   ├── components/
│   │   ├── BackButton.tsx
│   │   ├── Footer.tsx
│   │   └── Header.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── pages/
│   │   ├── Contato.tsx
│   │   ├── Dev.tsx
│   │   ├── FAQ.tsx
│   │   ├── Home.tsx
│   │   ├── Instrucoes.tsx
│   │   ├── OuvidoriaHC.tsx
│   │   ├── SobreVisuall.tsx
│   │   ├── Tutorial.tsx
│   │   └── DeveloperDetail.tsx
│   └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

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

## Links do Projeto

- **Repositório GitHub:** [https://github.com/deryksouza2006/Challenge.git](https://github.com/deryksouza2006/Challenge.git)
- **Vídeo de Apresentação (YouTube):** [https://youtu.be/Y1Jl9EWHx7w?si=x-C1edQ73qPojumv](https://youtu.be/Y1Jl9EWHx7w?si=x-C1edQ73qPojumv)

## Análise de APIs, Hooks, Props e Rotas

### APIs

Não foram identificadas chamadas explícitas a APIs externas (como `fetch` ou `axios`) nos arquivos `.tsx` e `.ts` do projeto. Isso sugere que o projeto pode não consumir APIs diretamente no frontend ou que as chamadas estão encapsuladas de forma não convencional. Uma análise mais aprofundada seria necessária para confirmar a ausência total de interações com APIs ou para identificar métodos alternativos de comunicação.

### Hooks

O projeto faz uso dos seguintes hooks do React:

- **`useState()`:** Amplamente utilizado para gerenciar o estado local dos componentes. Exemplos de uso foram encontrados em `Contato.tsx`, `FAQ.tsx`, `Home.tsx`, `Instrucoes.tsx` e `OuvidoriaHC.tsx`.
- **`useEffect()`:** Implementado em `Home.tsx` para demonstrar um efeito colateral simples (log no console) quando o componente é montado.
- **`useNavigate()`:** Implementado em `Home.tsx` para demonstrar navegação programática para a página de Contato.
- **`useParams()`:** Implementado em `DeveloperDetail.tsx` para capturar parâmetros de rotas dinâmicas, permitindo a exibição de detalhes específicos de um desenvolvedor.

### Props

As `props` (propriedades) são utilizadas para passar dados entre componentes. Embora uma análise detalhada de todas as props em cada componente não tenha sido realizada, a estrutura do projeto sugere que as props são empregadas para comunicação de dados entre componentes pai e filho, seguindo o fluxo de dados unidirecional do React. Exemplos de uso de props podem ser inferidos pela forma como os componentes são renderizados e pelos dados que eles exibem.

### Rotas

O projeto utiliza a biblioteca `react-router-dom` para o gerenciamento de rotas. As rotas são definidas no arquivo `App.tsx` usando os componentes `<BrowserRouter>`, `<Routes>` e `<Route>`. As rotas identificadas são:

- `/` (Página Inicial)
- `/faq` (Perguntas Frequentes)
- `/dev` (Página dos Desenvolvedores)
- `/contato` (Página de Contato)
- `/tutorial` (Página de Tutorial)
- `/instrucoes` (Página de Instruções)
- `/ouvidoria-hc` (Página da Ouvidoria HC)
- `/sobreVisuAll` (Página Sobre o VisuAll)
- `/dev/:id` (Rota dinâmica para detalhes do desenvolvedor, utilizando `useParams()`)

Agora, o projeto inclui tanto rotas estáticas quanto uma rota dinâmica para demonstrar o uso de `useParams()`.
