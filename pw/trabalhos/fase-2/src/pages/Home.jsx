import { Link } from 'react-router';

function Home() {
  return (
    <>
      <section className="abertura" aria-labelledby="titulo-abertura">
        <h1 id="titulo-abertura">Sua chance de ser visto começa aqui</h1>
        <p>
          O Soccer Dream é um projeto social que reúne peneiras gratuitas de
          futebol e conecta jovens atletas a clubes de Minas Gerais e São Paulo.
          Sem taxa de inscrição: apenas um quilo de alimento não perecível.
        </p>
        <p>
          <Link className="botao" to="/inscricao">Fazer minha inscrição</Link>
          <Link className="botao botao-secundario" to="/peneiras">
            Ver peneiras abertas
          </Link>
        </p>
      </section>

      <section aria-labelledby="titulo-quem-somos">
        <h2 id="titulo-quem-somos">Quem somos</h2>
        <p>
          O Soccer Dream nasceu em Belo Horizonte, em 2023, da percepção de que
          muitos jovens talentosos nunca chegam a uma peneira por falta de
          informação ou por não terem como pagar taxas de inscrição e
          deslocamento.
        </p>
        <p>
          Hoje o projeto é mantido por voluntários — ex-atletas, treinadores e
          estudantes — e organiza seleções em parceria com clubes das categorias
          de base. Todo o alimento arrecadado é doado a instituições da região
          onde a peneira acontece.
        </p>

        <h3>Nossos números</h3>
        <ul>
          <li>Mais de 400 atletas avaliados desde 2023</li>
          <li>12 clubes parceiros em MG e SP</li>
          <li>Mais de 1,2 tonelada de alimentos arrecadada</li>
        </ul>
      </section>

      <section aria-labelledby="titulo-como-funciona">
        <h2 id="titulo-como-funciona">Como funciona</h2>
        <ol>
          <li>
            Escolha uma peneira aberta na página{' '}
            <Link to="/peneiras">Peneiras Perto de Mim</Link>.
          </li>
          <li>Preencha o formulário de inscrição com seus dados e sua posição.</li>
          <li>Receba a confirmação com data, horário e local da seleção.</li>
          <li>Compareça com chuteira, meião, caneleira e um quilo de alimento não perecível.</li>
          <li>Participe da avaliação de 30 a 60 minutos e receba o resultado no mesmo dia.</li>
        </ol>
      </section>

      <section aria-labelledby="titulo-ajudar">
        <h2 id="titulo-ajudar">Como ajudar</h2>
        <p>
          O projeto se mantém com trabalho voluntário e doações. Você pode
          contribuir doando material esportivo, cedendo um campo para as
          seleções ou atuando como avaliador nos dias de peneira. Entre em
          contato pelo e-mail no rodapé desta página.
        </p>
      </section>
    </>
  );
}

export default Home;