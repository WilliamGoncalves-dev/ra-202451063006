import { usePeneiras } from '../context/PeneirasContext';
import PeneiraCard from './PeneiraCard';
import Carregando from './Carregando';
import MensagemErro from './MensagemErro';

function PeneirasEmDestaque() {
  const { peneiras, carregando, erro } = usePeneiras();

  if (carregando) {
    return <Carregando texto="Carregando peneiras em destaque..." />;
  }

  if (erro) {
    return <MensagemErro mensagem={erro} />;
  }

  const destaques = peneiras
    .filter((peneira) => peneira.status !== 'Finalizada')
    .slice(0, 3);

  if (destaques.length === 0) {
    return <p role="status">Nenhuma peneira aberta no momento.</p>;
  }

  return (
    <div className="grade-cards">
      {destaques.map((peneira) => (
        <PeneiraCard key={peneira.id} peneira={peneira} />
      ))}
    </div>
  );
}

export default PeneirasEmDestaque;