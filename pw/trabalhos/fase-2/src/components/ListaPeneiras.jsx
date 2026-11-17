import PeneiraCard from './PeneiraCard';
import Carregando from './Carregando';
import MensagemErro from './MensagemErro';
import { usePeneiras } from '../context/PeneirasContext';

function ListaPeneiras({ filtros }) {
  const { peneiras, carregando, erro } = usePeneiras();

  if (carregando) {
    return <Carregando texto="Carregando peneiras..." />;
  }

  if (erro) {
    return <MensagemErro mensagem={erro} />;
  }

  if (peneiras.length === 0) {
    return <p role="status">Nenhuma peneira cadastrada no momento.</p>;
  }

  const termo = filtros.busca.trim().toLowerCase();

  const filtradas = peneiras.filter((peneira) => {
    const bateBusca =
      peneira.nome.toLowerCase().includes(termo) ||
      peneira.cidade.toLowerCase().includes(termo);
    const bateStatus = !filtros.status || peneira.status === filtros.status;
    const bateCidade = !filtros.cidade || peneira.cidade === filtros.cidade;
    const batePe =
      !filtros.peDominante ||
      peneira.peDominante === 'Livre' ||
      peneira.peDominante === filtros.peDominante;

    return bateBusca && bateStatus && bateCidade && batePe;
  });

  if (filtradas.length === 0) {
    return <p role="status">Nenhuma peneira encontrada com esses filtros.</p>;
  }

  return (
    <div className="grade-cards">
      {filtradas.map((peneira) => (
        <PeneiraCard key={peneira.id} peneira={peneira} />
      ))}
    </div>
  );
}

export default ListaPeneiras;