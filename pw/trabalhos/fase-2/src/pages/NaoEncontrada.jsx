import { Link } from 'react-router';

function NaoEncontrada() {
  return (
    <section aria-labelledby="titulo-nao-encontrada">
      <h1 id="titulo-nao-encontrada">Página não encontrada</h1>
      <p>O endereço que você acessou não existe no Soccer Dream.</p>
      <p>
        <Link className="botao" to="/">Voltar para o início</Link>
      </p>
    </section>
  );
}

export default NaoEncontrada;