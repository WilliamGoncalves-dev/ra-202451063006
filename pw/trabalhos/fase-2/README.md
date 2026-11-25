# Soccer Dream — Peneiras de Futebol

- **Aluno:** William Douglas Candido Gonçalves
- **Curso:** Sistemas de Informação (SI) · **Turma/Turno:** _Programação Web_
- **Disciplina:** Programação Web — Projeto do Semestre 2026.2

## Descrição do projeto

O Soccer Dream é um site responsivo para um projeto social fictício que conecta
jovens atletas a peneiras gratuitas de futebol em Minas Gerais e São Paulo. O
site apresenta o projeto (landing page), lista as peneiras abertas em formato
de cards e disponibiliza um formulário de inscrição com validação, permitindo
que o atleta se candidate informando seus dados, posição e a peneira de
interesse.


## Fase 2 - Aplicação React publicada

**URL pública:** https://ra-202451063006.vercel.app/

### Pré-requisitos
- Node.js (versão LTS recente) e npm

### Instalação e execução
    git clone https://github.com/williamgoncalves-dev/ra-202451063006.git
    cd ra-202451063006/pw/trabalhos/fase-2
    npm install
    npm run dev

Depois, acesse `http://localhost:5173` no navegador. Outros comandos:
`npm test` (testes) e `npm run build` (versão de produção, na pasta `dist/`).

### Origem dos dados
- As peneiras vêm de `fase-2/public/peneiras.json`, carregado com `fetch`
  dentro de um `useEffect` em `src/context/PeneirasContext.jsx`.
- Enquanto carrega, a tela mostra "Carregando peneiras...".
- Se o arquivo não carregar, aparece uma mensagem de erro no lugar da lista
  e o site não quebra.
- Se o arquivo vier vazio, aparece "Nenhuma peneira cadastrada no momento";
  se os filtros não encontram nada, "Nenhuma peneira encontrada com esses filtros".

## Formulário de inscrição

Formulário controlado (um objeto de estado, `name` igual à chave e um único
`onChange`) com os campos previstos na proposta: nome, data de nascimento,
município, pé dominante, posição principal e secundária, altura, clube atual,
link de vídeo e peneira, além de e-mail, telefone e aceite das diretrizes.

As regras ficam em `src/utils/inscricao.js` (máscara de telefone, idade mínima de
6 anos, altura entre 100 e 230 cm, posição secundária diferente da principal e
link de vídeo com http/https). Os atributos nativos (`required`, `type`,
`pattern`, `min`, `max`) ficam no HTML; o `noValidate` desliga os balões do
navegador para que as mensagens sejam as do site, ligadas aos campos por
`aria-describedby`. O envio é simulado, pois não há backend.

  ### Context

  - **Qual:** `PeneirasContext` (`src/context/PeneirasContext.jsx`), com o hook `usePeneiras()`.
  - **O que guarda:** a lista de peneiras carregada do JSON, o estado de carregamento e o erro.
  - **Quem usa:** `ListaPeneiras` (dentro de `Peneiras`, rota `/peneiras`) e `FormularioInscricao` (dentro de `Inscricao`, rota `/inscricao`); também `FiltroPeneiras`, `PeneirasEmDestaque` (Home) e `DetalhePeneira` (rota `/peneiras/:id`).
  - **Por que Context e não props:** o estado teria de ficar no `App` e descer por `Peneiras`, `Inscricao` e `Home`, que só repassariam o dado sem usá-lo. Além disso, ele precisa ficar acima das rotas: com o Context, trocar de página não refaz o `fetch` nem perde a lista.

  As peneiras são carregadas uma única vez, no `PeneirasProvider`, e lidas
  pelos componentes com o hook `usePeneiras()`. Leem o mesmo dado: a lista, o detalhe, os destaques da Home, o filtro de município e o select do formulário. Sem o Context, cada tela
  precisaria de um `fetch` próprio (com requisição repetida a cada navegação)
  ou o estado teria de subir até o `App` e descer por props por componentes
  que não usam o dado. Com o Context, a lista de peneiras tem uma única fonte
  e o formulário deixou de repeti-la à mão.

  ### Rotas

| Rota | Página |
|---|---|
| `/home` | Home (apresentação e peneiras em destaque) |
| `/peneiras` | Lista de peneiras com busca e filtros por município, status e pé dominante |
| `/peneiras/:id` | Detalhe de uma peneira |
| `/inscricao` | Formulário de inscrição do atleta |
| `*` | Página 404 |

### Testes

    ```bash
    cd ra-202451063006/pw/trabalhos/fase-2
    npm test
    ```

Os testes usam Vitest e React Testing Library (ambiente jsdom) e cobrem:
- `PeneiraCard`: dados exibidos e link para a página de detalhe;
- `FiltroPeneiras`: opções de município sem repetição e aviso de mudança;
- `ListaPeneiras`: estados de carregando, erro, lista, filtro por busca e
  por status, e aviso de nenhum resultado.

## Publicação

A aplicação é publicada na Vercel, a cada `git push` na branch `main`, com Root
Directory `pw/trabalhos/fase-2`, build `npm run build` e saída `dist`. O arquivo
`vercel.json` redireciona qualquer rota para o `index.html`, para que endereços
como `/peneiras/2` funcionem ao serem abertos direto.

## Uso de IA

- **Ferramentas usadas:** Claude (Anthropic) e ChatGPT (OpenAI).
- **Onde ajudou:** na Fase 1, em semântica do HTML, acessibilidade e validação do formulário em JavaScript; na Fase 2, em esqueletos e explicações de componentes React, Router, Context, testes com Vitest e configuração do deploy.
- **O que eu revisei/reescrevi:** testei cada estado da tela (carregando, erro, vazio), encontrei e corrigi o bug em que o filtro não escondia os cards, publiquei e testei o deploy na Vercel e conferi o Lighthouse