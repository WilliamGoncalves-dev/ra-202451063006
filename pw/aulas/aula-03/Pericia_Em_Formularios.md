PERÍCIA EM FORMULÁRIOS
Como a web coleta dados — e o que o navegador faz (e não faz) para protegê-los

Programação Web — Aula 3 de 20 · Formulários, Tabelas e Validação

🎯 MISSÃO
Você vai testar formulários reais como um usuário desastrado e depois como alguém mal-intencionado. O objetivo é descobrir onde o HTML ajuda, onde ele atrapalha e até onde a proteção do navegador realmente vai.

Use o arquivo formulario-hostil.html (ambiente virtual) e um formulário de cadastro real de um site à sua escolha.
Trabalhe com o DevTools aberto (F12): abas Elements e Console.
Nas rodadas 3 e 5, use o modo dispositivo (Ctrl+Shift+M) — ou o próprio celular.
Preencha à mão. A Rodada 5 é a mais importante: não pule.
⏱️ Tempo: 40 minutos 👥 Formato: individual, conferindo cada rodada com o colega ao lado

Nome: _William Douglas Candido Gonçalves__ Turma: _Programação Web__ Data: _28_ / _08_ / _2026_

RODADA 01 — Anatomia de um campo
Formulário real → clicar com o botão direito num campo → Inspecionar

Cada campo de formulário é uma tag input com atributos que decidem tudo. Catalogue três campos do formulário que você escolheu:

campo   type=__email____  name=_email___
  1     id= uid_13  required? (x)sim ( )nao

campo   type=_text  name= global_name
  2     id=uid_14  required? ( )sim (x)nao

campo   type=password  name=password
  3     id=uid_16  required? (x)sim ( )nao
Sua análise:

Os atributos name e id têm o mesmo valor nos campos que você viu? Eles servem para a mesma coisa?

R: Não possuem o mesmo valor e possuem funções distintas.

Algum campo usa placeholder em vez de um rótulo visível? Qual o problema disso?

R: Nenhum campo usa o placeholder em vez de rótulo visível, o problema passa a ser de usabilidade e acessibilidade pois o texto some quando o usuário digita, os usuários podem achar que o campo já está preenchido por padrão.

Que tipo de dado cada campo espera receber, só pelo type?

R: campo 1 = email no tipo texto // campo 2 = texto // campo 3 = texto

RODADA 02 — O teste do label
Clicar no TEXTO do rótulo (não no campo) em formulario-hostil.html e depois no formulário real

Um label corretamente associado faz o clique no texto focar o campo. É um teste de 1 segundo que revela se a marcação está certa:

formulario-hostil.html   clicar no rotulo focou o campo? ( )sim (x)nao
formulario real          clicar no rotulo focou o campo? ( )sim (x)nao

codigo do que FUNCIONA:
  <label for="__________">Nome</label>
  <input id="__________">
Sua análise:

Qual atributo do label precisa bater com qual atributo do input?

R: O atributo for da tag <label> precisa ter exatamente o mesmo valor do atributo id da tag <input>.

Além do clique, quem mais depende dessa associação para saber o nome do campo?

R: Leitores de tela: Softwares usados por pessoas com deficiência visual leem o texto do <label> assim que o usuário navega para o <input>. Sem a associação, o leitor avisa apenas que há um "campo de texto", sem dizer o que deve ser digitado.Ferramentas de automação: Extensões de preenchimento automático de dados e robôs de testes de software dependem dessa estrutura para mapear o formulário.

No formulário hostil, o que exatamente estava faltando?

R: O defeito 1 ocorreu porque os rótulos foram envolvidos por uma tag genérica <span> em vez de uma tag <label>.Para corrigir o campo "Nome completo", o código precisaria de duas alterações:Trocar a tag <span> por <label>.Adicionar o atributo for="" apontando para o id="c1" do input correspondente.

RODADA 03 — O teclado que o celular abre
DevTools → Ctrl+Shift+M (modo dispositivo) ou abra a página no seu celular

O atributo type muda o teclado que aparece no celular. Teste cada um e descreva o que apareceu:

type="text"      teclado: Alfanumérico padrão__
type="email"     teclado: Alfanumérico com atalhos de arroba (@) e ponto (.)__
type="tel"       teclado: Numérico telefônico (teclas grandes de 0 a 9, * e #)____
type="number"    teclado: Numérico simples (números de 0 a 9 e sinais matemáticos)_______
type="date"      controle: Calendário nativo em formato de roleta ou grade___
Sua análise:

Qual type você usaria para CEP? E para um valor em reais? Justifique.

R: Usaria type="text" combinado com inputmode="numeric". O type="number" apagaria o zero à esquerda (ex: 01001-000 viraria 1001000) e daria erro com o hífen. O inputmode garante o teclado numérico sem quebrar o dado.Valor em reais: Usaria type="text" com inputmode="decimal" aliado a uma máscara JavaScript. O type="number" só aceita o padrão americano (ponto como decimal), rejeitando a vírgula dos centavos brasileiros (R$ 10,50).

Um campo de telefone com type="text" funciona. Então por que usar type="tel"?

R: Usamos type="tel" por acessibilidade e usabilidade (UX). O type="text" força o usuário a alternar manualmente o teclado do celular de letras para números. O type="tel" economiza tempo abrindo o teclado numérico direto e informa aos leitores de tela que o campo exige um telefone.

O type="date" mostrou um calendário? Quem desenhou esse calendário: você ou o navegador?

R: Sim, mostrou um calendário. Quem desenhou foi o navegador/sistema operacional de forma 100% nativa. O visual muda automaticamente se o usuário abrir o formulário em um iPhone (iOS) ou em um Samsung (Android), adaptando-se ao design do aparelho sem exigir código extra.

RODADA 04 — A validação que vem de graça
Formulário real → deixar tudo em branco → clicar em enviar

Antes de qualquer JavaScript, o navegador já barra o envio. Anote a mensagem EXATA que apareceu e descubra quem a causou:

mensagem exibida pelo navegador:
  "___"Preencha este campo."_______________"

campo que ele apontou primeiro: _ E-mail _________
atributo no HTML que causou isso: __required________

agora digite "batata" num campo type="email" e envie:
  o que aconteceu? _O navegador barrou o envio novamente e exibiu um balão avisando que falta o símbolo @ no texto__
Sua análise:

Você escreveu alguma linha de JavaScript para isso funcionar? 

R: Não, tudo aconteceu de forma nativa pelo navegador.

A mensagem apareceu em português. Quem escolheu esse idioma?

R: O próprio navegador. Ele detecta o idioma configurado no sistema operacional ou nas preferências do navegador e traduz o balão de erro automaticamente.

Qual atributo você usaria para exigir no mínimo 3 caracteres num campo de nome?

R: O atributo minlength="3".

RODADA 05 — Burlando a validação (a rodada que importa)
DevTools → Elements → achar um input com required → duplo clique no atributo → apagar → Enter → submeter vazio

Você acabou de remover a proteção do formulário sem instalar nada, em 3 segundos, só com o navegador. Registre o resultado:

antes de apagar o required, o envio vazio era: (X)bloqueado ( )permitido
depois de apagar o required, o envio vazio foi: (X)bloqueado ( )permitido

tempo que você levou para fazer isso: _10__ segundos
ferramenta extra que voce precisou instalar: Nenhuma____
Sua análise:

Se qualquer pessoa faz isso em 3 segundos, a validação do HTML serve para proteger o SISTEMA ou para ajudar o USUÁRIO?

R: Serve estritamente para ajudar o USUÁRIO. A validação no HTML (front-end) funciona como uma excelente ferramenta de Usabilidade (UX), pois dá um feedback instantâneo e amigável para a pessoa não errar o preenchimento. Ela não serve como barreira de segurança, pois qualquer usuário comum consegue inspecionar o elemento e apagá-la.

Onde, então, a validação precisa acontecer de novo obrigatoriamente?

R: No Back-end

Escreva em uma frase o que você diria a um colega que afirma "meu formulário está seguro, tem required em tudo".

R: O required só ajuda a experiência do usuário na tela, mas qualquer um pode apagá-lo no DevTools; a segurança real do seu formulário só acontece se você validar os dados no back-end.

RODADA 06 — A tabela é de dados ou de layout?

R: Uma tabela de dados

Procurar uma tabela real (extrato bancário, tabela de preços, classificação de campeonato) → Inspecionar

Tabela serve para dados tabulares, com cabeçalhos que dizem o que cada coluna significa. Verifique se a que você achou está marcada corretamente:

usa <caption> (titulo da tabela)?     ( )sim (X)nao
usa <thead> e <tbody>?                (X)sim ( )nao
os cabecalhos sao <th> ou <td>?       (X)th  ( )td
os <th> tem scope="col" ou "row"?     ( )sim (x)nao

site investigado: https://ge.globo.com/futebol/brasileirao-serie-a/
Sua análise: 

Se os cabeçalhos são td, como um leitor de tela sabe que "R$ 250,00" pertence à coluna Valor?

R: Se os cabeçalhos fossem <td>, um leitor de tela teria mais dificuldade para saber que determinado valor pertence àquela coluna, porque <td> representa uma célula de dados, enquanto <th> representa uma célula de cabeçalho.

Para que serve o atributo scope?

R: O atributo scope informa a quais células de dados um cabeçalho está relacionado. scope="col" indica que o <th> é cabeçalho de uma coluna, enquanto scope="row" indica que é cabeçalho de uma linha.

Você encontrou alguma tabela usada para posicionar elementos na tela em vez de mostrar dados? Por que isso é um problema?

R: Não. Não encontrei nenhuma, a tabela encontrada no site é utilizada para apresentar dados da classificação do campeonato. O uso delas para layout é um problema porque mistura apresentação visual com estrutura de dados, podendo dificultar a interpretação da página por leitores de tela e outras tecnologias assistivas. Para posicionamento e organização visual, o correto seria utilizar CSS.

DESAFIO
Terminou antes do tempo? Escolha um destes:

No Console, digite document.querySelector('form').checkValidity() e depois .reportValidity(). O que cada um retorna e faz?
Descubra o atributo pattern de algum campo real e traduza a expressão regular dele em português.
Compare um formulário que usa method="GET" com um que usa method="POST": submeta os dois e observe a barra de endereços. Onde os dados aparecem?