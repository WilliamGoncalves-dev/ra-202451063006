# PERÍCIA DE ESTILO

*Como o navegador decide qual regra CSS ganha — e ele mostra isso de graça*

**Programação Web — Aula 4 de 20 · CSS: Seletores, Cascata e Box Model**

## 🎯 MISSÃO

O navegador não esconde nada: ele mostra quais regras aplicou, quais descartou e de onde veio cada valor final. Sua missão é aprender a ler esse relatório e, a partir dele, deduzir as regras do jogo.

- Escolha um site com visual elaborado (portal de notícias, loja, site institucional).
- Trabalhe na aba Elements do DevTools (F12): painéis Styles e Computed.
- Na Rodada 3, use o arquivo especificidade-quiz.html disponibilizado pelo professor.
- Notação de especificidade a usar: (id, classe, elemento). Ex.: #nav .item a = (1, 1, 1).

**⏱️ Tempo:** 40 minutos     **👥 Formato:** individual, conferindo cada rodada com o colega ao lado

> **Nome:** William Douglas Cândido Gonçalves__   **Turma:** _Programação Web__   **Data:** _10_ / _09_ / _2026_

## RODADA 01 — As regras que valem e as que morreram

> `Site real → botão direito num título → Inspecionar → painel Styles (lado direito)`

O painel Styles lista TODAS as regras que miram aquele elemento, da mais forte para a mais fraca. As que perderam aparecem riscadas. Catalogue o que você vê:

```text
elemento inspecionado: <div>  class="elementor-widget-container_"

regras que VALEM (nao riscadas):
  1. seletor: _.elementor-16 .elementor-element.elementor-element-1f8d503 > .elementor-widget-container  propriedade: padding__
  2. seletor: _.elementor *, .elementor :after, .elementor :before  propriedade: box-sizing_

regras RISCADAS (perderam):
  1. seletor: *, :after, :before_  propriedade: _box-sizing__
  2. seletor: .elementor-widget-image_  propriedade: _text-align__
```

**Sua análise:**

1. Quantas regras diferentes tentavam estilizar esse único elemento?

R: 7 regras CSS relevantes aparecem no trecho

2. Escolha uma regra riscada: por que você acha que ela perdeu?

R: A regra .elementor-widget-image { text-align: center; } perdeu para .elementor-16 .elementor-element.elementor-element-1f8d503 { text-align: start; } porque sua especificidade é menor: (0,1,0) contra (0,3,0).

3. Existe alguma declaração com !important? Onde?

R: Não há !important nas declarações apresentadas.

## RODADA 02 — De onde veio esse valor?

> `Mesmo elemento → painel Computed → clicar na setinha ao lado de uma propriedade`

O painel Computed mostra o valor FINAL de cada propriedade — inclusive de coisas que ninguém declarou. Investigue quatro delas:

```text
propriedade      valor final        veio de qual seletor?
--------------   ----------------   ----------------------
color            _rgb(67, 67, 67)___   __.elementor-kit-9____
font-size        ______16px_______   _____body_______
display          _____block______   _____div (user agent stylesheet)___________
margin-top       _____0px_____   _____element.style______
```

**Sua análise:**

1. Alguma dessas propriedades tinha valor sem ninguém ter declarado nada? De onde ele veio?

R: Sim.

O melhor exemplo é display:

div {
    display: block;
}

2. O valor de font-size aparece em px mesmo se o CSS usou outra unidade. Por que?

R: Eu encontrei:

body {
    font-size: 1rem;
}

E o Computed mostra:

16px

Isso acontece porque rem é uma unidade relativa. O navegador calcula o valor efetivo e o painel Computed mostra o resultado final.

Então:

1rem → 16px

No meu caso específico. 

Styles

O que foi declarado no CSS. e Computed O resultado final calculado pelo navegador.

3. Qual propriedade dessa lista foi HERDADA do elemento pai? 

R: A propriedade color é candidata à herança, pois é uma propriedade que pode ser herdada do elemento pai. Porém, o trecho analisado não permite confirmar que o valor final desse elemento foi efetivamente herdado.

## RODADA 03 — Quem ganha — agora com a conta feita

> `Abrir especificidade-quiz.html e inspecionar o parágrafo de cada caixa`

Volte ao quiz do início da aula. Agora não é para adivinhar: conte os id, as classes e os elementos de cada seletor e escreva a soma antes de conferir no DevTools.

```text
cx  seletor vencedor            especificidade   cor final
--  --------------------------  --------------   ---------
 1  #alvo1____________________  (1 , 0 , 0)      _verde_
 2  #c2 p_____________________  (1 , 0 , 1)      _vermelho_
 3  .empate___________________  (0 , 1 , 0)      _verde_
 4  style inline______________  (1 , 0 , 0 ,0)   _vermelho_
 5  !important________________  (_ , _ , _)      _verde__
 6  .a6.b6____________________  (0 , 2 , 0)      _verde__
 7  #c7_______________________  (_ , _ , _)      _verde___
 8  .card8 .destaque8 span____  (0 , 2 , 1)      _vermelho_

**Sua análise:**

1. Na caixa 2, por que a regra com class perdeu para a regra com id + elemento?

R: A regra .verde2 perdeu porque sua especificidade (0,1,0) é menor que a especificidade de #c2 p, que é (1,0,1). O ID tem peso maior na comparação da especificidade.

2. Nas caixas 3, o que decidiu o resultado, se a especificidade era igual nas duas regras?

A ordem de declaração das regras

3. Na caixa 7 nenhuma regra mirava o parágrafo. Então de onde veio a cor dele?

R: A cor veio do elemento pai #c7. Ele herdou a cor definida no pai.

## RODADA 04 — A caixa é maior do que você pediu

> `Site real → inspecionar um card ou botão → rolar o painel Styles até o fim → diagrama colorido do box model`

Todo elemento é uma caixa com quatro camadas. O diagrama do DevTools mostra as quatro. Anote as medidas e faça a conta à mão:

```text
                +---------------------------+
     margin     |  ____ px                  |
                |  +---------------------+  |
     border     |  |  ____ px            |  |
                |  |  +---------------+  |  |
     padding    |  |  |  ____ px      |  |  |
                |  |  |  +---------+  |  |  |
     content    |  |  |  | __ x __ |  |  |  |
                |  |  |  +---------+  |  |  |

largura total ocupada = content + padding*2 + border*2 + margin*2
                      = 710X9737.938_ px
```

**Sua análise:**

1. Qual camada empurra os elementos vizinhos para longe, sem pintar nada?

R: A camada Margin  

2. Qual camada aumenta a área clicável do elemento junto com o fundo?

R: O padding

3. A largura que aparece em width no CSS é a mesma que o elemento ocupa na tela?

R: Sim, pois temos o box-sizing = border box

## RODADA 05 — O experimento do box-sizing

> `Ainda no elemento inspecionado → painel Styles → localizar (ou adicionar) box-sizing e alternar o valor`

Troque box-sizing entre content-box e border-box e observe o elemento na tela. Registre a diferença:

```text
width declarado no CSS: ______ px

box-sizing: content-box  ->  largura na tela: ______ px
box-sizing: border-box   ->  largura na tela: ______ px

diferenca entre as duas: ______ px
essa diferenca corresponde a que camadas? ____________________
```

**Sua análise:**

1. Com qual dos dois valores a largura na tela é igual à largura que você declarou?

2. Por que quase todo projeto começa o CSS com a regra * { box-sizing: border-box }?

3. Se você somar padding a um elemento com border-box, o que muda de tamanho: a caixa ou o conteúdo dentro dela?

## 🏆 DESAFIO BÔNUS

Terminou antes do tempo? Escolha um destes:

- No painel Styles, clique no botão + e crie uma regra nova para o elemento. Ela nasce com qual seletor? Por que o DevTools escolheu esse?
- Procure na página um elemento que tenha estilo inline (atributo style). Ele pode ser sobrescrito por uma regra da folha? Teste.
- Encontre dois elementos irmãos com margin vertical e verifique no DevTools se o espaço entre eles é a soma das duas margens ou apenas a maior. Pesquise o nome desse comportamento.
