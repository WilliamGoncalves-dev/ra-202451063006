# AUDITORIA DE RESPONSIVIDADE E ACESSIBILIDADE

*Testar um site como quem não tem o seu computador, o seu mouse e a sua visão*

**Programação Web - Responsividade e Acessibilidade**

## 🎯 MISSÃO

Você vai auditar sites reais com as ferramentas que já tem no navegador. Ao final, aplica o mesmo protocolo no seu próprio projeto — que vale nota na próxima aula.

- Escolha um site real de porte médio (loja, portal, site institucional) para as Rodadas 2, 3, 4 e 6.
- As Rodadas 1 e 5 usam o arquivo site-nao-responsivo.html disponibilizado pelo professor.
- Ferramentas: modo dispositivo (Ctrl+Shift+M), aba Lighthouse, painel Elements, tecla Tab.
- Na Rodada 5, NÃO leia o comentário no topo do arquivo antes de terminar a caça.

**⏱️ Tempo:** 40 minutos     **👥 Formato:** individual, conferindo cada rodada com o colega ao lado

> **Nome:** _William Douglas Candido Gonçalves_   **Turma:** __Programação Web__   **Data:** 18 / 09 / 2026

## RODADA 01 — A linha que falta

> `Abrir site-nao-responsivo.html e um site real, ambos no modo dispositivo (Ctrl+Shift+M) em 360px`

Um dos dois se comporta como se estivesse num computador, mesmo no celular. Compare e investigue o `<head>` dos dois:

```text
site-nao-responsivo.html em 360px:
  ha rolagem horizontal?     ( )sim (x)nao
  o texto ficou legivel?     ( )sim (x)nao

site real em 360px:
  ha rolagem horizontal?     ( )sim (x)nao

a linha que existe no <head> do site real e falta no outro:
  <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
```

**Sua análise:**

1. Sem essa linha, que largura o celular finge ter? (dica: procure "980" na web)

R: Ele finge ter 980px

2. Essa linha faz o layout se adaptar sozinho, ou apenas permite que ele se adapte?

R: Ela apenas permite que ele se adapte

3. Ela é CSS ou HTML? Em que aula vocês viram esse elemento pela primeira vez?

R: Ela é um elemento de HTML, vimos ele pela primeira vez na aula 2 ou 3  

## RODADA 02 — Caça aos breakpoints

> `Site real → arrastar a borda da janela DEVAGAR, do máximo até uns 320px, observando o layout`

Anote as larguras exatas em que o layout muda de estrutura (colunas que viram uma, menu que vira sanduíche). Depois procure esses números no CSS:

```text
largura (px)   o que mudou na tela
------------   ----------------------------------------
___340_____   __O ícone das redes sociais no menu superior foi para a parte inferior e surge um botão de menu sanduíche__
___1000____   __O menu superior volta a ter o ícone das redes sociais__________
___1020____   __O ícone das buscas rápidas do site vai se agrupando conforme a largura diminui_

no CSS (Styles), esses numeros aparecem dentro de:
  @media (min-width: __992px) { ... }

total de breakpoints encontrados: __03___
```

**Sua análise:**

1. As media queries do site usam min-width ou max-width? O que isso diz sobre a estratégia dele?

R: min-width

2. Os breakpoints são números redondos (768, 1024) ou valores incomuns? O que cada escolha sugere?

3. Houve mudança de layout SEM media query? Onde? (dica: relembre auto-fit da aula 7)

## RODADA 03 — O teste do teclado

> `Site real → clicar uma vez na barra de endereços, depois só Tab, Shift+Tab e Enter. Sem tocar no mouse.`

Muita gente navega sem mouse: por deficiência motora, por lesão temporária ou por velocidade. Tente usar o site inteiro só com o teclado:

```text
voce conseguiu:
  chegar ao menu principal?          ( )sim ( )nao
  chegar a um botao de acao?         ( )sim ( )nao
  usar o campo de busca?             ( )sim ( )nao
  saber SEMPRE onde estava o foco?   ( )sim ( )nao

quantos Tab foram necessarios para chegar ao conteudo principal? ______
encontrou algum elemento clicavel INALCANCAVEL pelo Tab? qual?
  ______________________________________________________
```

**Sua análise:**

1. Em algum momento você se perdeu na página? O que faltava para não se perder?

2. Se um site tem 40 links no topo, quantos Tab um usuário de teclado dá antes do conteúdo? Existe solução para isso?

3. Repita o teste no site-nao-responsivo.html: você consegue se inscrever na feira usando só o teclado?

## RODADA 04 — A nota do Lighthouse

> `DevTools → aba Lighthouse → marcar apenas "Accessibility" → Analyze page load`

O Lighthouse audita automaticamente parte dos critérios da WCAG. Rode em dois sites e compare:

```text
site 1: ______________________________  nota: ______ /100
  problema 1: __________________________________________
  problema 2: __________________________________________
  problema 3: __________________________________________

site 2: ______________________________  nota: ______ /100
  problema 1: __________________________________________

site-nao-responsivo.html                nota: ______ /100
```

**Sua análise:**

1. Algum problema apontado aparece nos DOIS sites? Qual? Por que ele é tão comum?

2. Uma nota 100 significa que o site é acessível? Pense no que você descobriu na Rodada 3.

3. Qual problema apontado você saberia corrigir agora, com o que aprendeu até a aula 7?

## RODADA 05 — Caça aos defeitos (sem espiar)

> `site-nao-responsivo.html → Elements, Lighthouse, Tab e o olho. NÃO leia o comentário no topo do arquivo.`

Este arquivo tem 14 defeitos plantados: 6 de responsividade e 8 de acessibilidade. Encontre o máximo que conseguir e classifique cada um:

```text
#   defeito encontrado                      tipo (R/A)  como voce achou
--  --------------------------------------  ----------  ----------------
 1  ______________________________________  __________  ________________
 2  ______________________________________  __________  ________________
 3  ______________________________________  __________  ________________
 4  ______________________________________  __________  ________________
 5  ______________________________________  __________  ________________
 6  ______________________________________  __________  ________________
 7  ______________________________________  __________  ________________
 8  ______________________________________  __________  ________________

R = responsividade   A = acessibilidade      total: ______ de 14
```

**Sua análise:**

1. Quantos você encontrou com o Lighthouse e quantos só percebeu testando à mão?

2. Qual defeito é o mais grave, na sua opinião? Justifique pensando em quem é afetado.

3. Escolha o defeito que você acha mais fácil de corrigir e escreva a linha de CSS ou HTML que resolve.

## RODADA 06 — Dá para acertar com o dedo?

> `Site real → inspecionar um link do menu e um botão → painel Computed → ler width e height (ou usar o diagrama do box model)`

A WCAG 2.2 acrescentou o critério 2.5.8: alvos de toque devem ter ao menos 24×24 pixels. Meça três elementos clicáveis:

```text
elemento                largura x altura     passa (>= 24x24)?
---------------------   ------------------   -----------------
link do menu            ______ x ______ px   ( )sim ( )nao
botao principal         ______ x ______ px   ( )sim ( )nao
link do rodape          ______ x ______ px   ( )sim ( )nao

no site-nao-responsivo.html, o link do topo tem font-size ______ px
```

**Sua análise:**

1. Qual propriedade CSS aumenta a área clicável sem mudar o tamanho do texto?

2. Por que links de rodapé costumam ser os piores nesse critério?

3. Você já errou o toque num link pequeno no celular? Isso é falha do usuário ou do site?

## 🏆 DESAFIO BÔNUS

Terminou antes do tempo? Escolha um destes:

- DevTools → Rendering → Emulate vision deficiencies. Teste "protanopia" num site que usa verde e vermelho para indicar status. A informação sobrevive?
- Rode o Lighthouse na aba Performance de um site pesado no modo Slow 4G. Acessibilidade e desempenho se relacionam? Como?
- Procure no HTML de um site real o atributo aria-label. O que ele faz e por que foi necessário ali?
