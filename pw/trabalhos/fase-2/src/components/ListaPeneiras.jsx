import { useEffect, useState } from 'react';
import PeneiraCard from './PeneiraCard';

function ListaPeneiras() {
  const [peneiras, setPeneiras] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetch('/peneiras.json')
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error('Resposta inválida do servidor');
        }
        return resposta.json();
      })
      .then((dados) => setPeneiras(dados))
      .catch(() => setErro('Não foi possível carregar as peneiras. Tente novamente mais tarde.'))
      .finally(() => setCarregando(false));
  }, []);

  if (carregando) {
    return <p role="status">Carregando peneiras...</p>;
  }

  if (erro) {
    return <p role="alert" className="erro">{erro}</p>;
  }

  return (
    <div className="grade-cards">
      {peneiras.map((peneira) => (
        <PeneiraCard key={peneira.id} peneira={peneira} />
      ))}
    </div>
  );
}

export default ListaPeneiras;