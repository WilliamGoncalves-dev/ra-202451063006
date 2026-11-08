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

## Pré-requisitos

- Um navegador atualizado (Chrome, Firefox, Edge ou Safari)
- Não há dependências, build ou instalação de pacotes nesta fase — o projeto é
  HTML, CSS e JavaScript puros

## Instalação e execução

```bash
# Clone o repositório
git clone https://github.com/WilliamGoncalves-dev/ra-202451063006.git
cd cd ra-202451063006

# Abra o arquivo index.html diretamente no navegador
# (duplo clique no arquivo, ou):
xdg-open index.html      # Linux
start index.html         # Windows
open index.html          # macOS
```

Alternativamente, para evitar restrições de navegador com arquivos locais,
rode um servidor estático simples na pasta do projeto:

```bash
python3 -m http.server 8000
# depois acesse http://localhost:8000 no navegador
```

## Páginas do projeto

| Página | Descrição |
|---|---|
| `index.html` | Landing page — o que é o projeto, como funciona, quem somos |
| `peneiras.html` | Listagem das peneiras abertas, em cards |
| `inscricao.html` | Formulário de inscrição do atleta, com validação |

## Uso de IA

- **Ferramentas usadas:** Claude (Anthropic), ChatGPT(OpenAI)
- **Onde ajudou:** apoio na estruturação semântica do HTML (uso correto de
  `header`, `nav`, `main`, `section`/`article`, `fieldset`/`legend`), nas
  práticas de acessibilidade (labels associados, `aria-describedby`,
  `aria-live`, foco visível, link de atalho) e na lógica de validação do
  formulário em JavaScript (regras de campo obrigatório, máscara de telefone
  via regex e cálculo de idade mínima).
- **O que eu revisei/reescrevi:** \testei cada regra de validação, ajustei
  cores e espaçamento no CSS, corrigi duplicações de `<head>`/`<body>` que
  apareceram ao colar trechos que eu estava implementando, decidi a ordem das seções da landing page\

## Fase 2 (a preencher)

- **URL pública da aplicação:** _(será adicionada quando o deploy da Fase 2 estiver
  publicado)_
