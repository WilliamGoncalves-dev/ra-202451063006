import { Link, useParams } from 'react-router';
import { usePeneiras } from '../context/PeneirasContext';
import Carregando from '../components/Carregando';
import MensagemErro from '../components/MensagemErro';

function DetalhePeneira() {
  const { id } = useParams();
  const { peneiras, carregando, erro } = usePeneiras();

  if (carregando) {
    return <Carregando texto="Carregando peneira..." />;
  }

  if (erro) {
    return <MensagemErro mensagem={erro} />;
  }

  const peneira = peneiras.find((item) => String(item.id) === id);

  if (!peneira) {
    return (
      <section aria-labelledby="titulo-detalhe">
        <h1 id="titulo-detalhe">Peneira não encontrada</h1>
        <p>Não existe uma peneira com o código informado.</p>
        <p>
          <Link className="botao" to="/peneiras">Voltar para a lista</Link>
        </p>
      </section>
    );
  }

  return (
    <section aria-labelledby="titulo-detalhe">
      <h1 id="titulo-detalhe">{peneira.nome}</h1>
      <p className="selo">{peneira.status}</p>

      <dl className="detalhes">
        <dt>Local</dt>
        <dd>{peneira.cidade} / {peneira.uf}</dd>
        <dt>Faixa etária</dt>
        <dd>{peneira.faixaEtaria}</dd>
        <dt>Posições</dt>
        <dd>{peneira.posicoes}</dd>
        <dt>O que acontece</dt>
        <dd>{peneira.descricao}</dd>
      </dl>

      <p>
        <Link className="botao" to="/inscricao">Quero me inscrever</Link>
        <Link className="botao botao-secundario" to="/peneiras">
          Voltar para a lista
        </Link>
      </p>
    </section>
  );
}

export default DetalhePeneira;