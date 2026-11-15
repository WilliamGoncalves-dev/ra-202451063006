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

  const encerrada = peneira.status === 'Finalizada';

  return (
    <section aria-labelledby="titulo-detalhe">
      <h1 id="titulo-detalhe">{peneira.nome}</h1>
      <p className="selo">{peneira.status}</p>

      <dl className="detalhes">
        <dt>Organização</dt>
        <dd>{peneira.organizacao}</dd>
        <dt>Data</dt>
        <dd>{peneira.data}</dd>
        <dt>Local</dt>
        <dd>{peneira.local} — {peneira.cidade}/{peneira.uf}</dd>
        <dt>Categoria</dt>
        <dd>{peneira.faixaEtaria}</dd>
        <dt>Posições procuradas</dt>
        <dd>{peneira.posicoes}</dd>
        <dt>Pé dominante aceito</dt>
        <dd>{peneira.peDominante}</dd>
        <dt>Vagas</dt>
        <dd>{peneira.vagas}</dd>
        <dt>O que acontece</dt>
        <dd>{peneira.descricao}</dd>
      </dl>

      <h2>Requisitos e inscrição</h2>
      <p>{peneira.requisitos}</p>

      {encerrada ? (
        <p role="status">As inscrições desta peneira estão encerradas.</p>
      ) : (
        <p>
          A inscrição é gratuita e feita pelo formulário do site.{' '}
          <Link className="botao" to="/inscricao">Quero me inscrever</Link>
        </p>
      )}

      <p>
        <Link className="botao botao-secundario" to="/peneiras">
          Voltar para a lista
        </Link>
      </p>
    </section>
  );
}

export default DetalhePeneira;