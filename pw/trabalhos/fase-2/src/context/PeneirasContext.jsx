import { createContext, useContext, useEffect, useState } from 'react';

const PeneirasContext = createContext(null);

export function PeneirasProvider({ children }) {
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

  return (
    <PeneirasContext.Provider value={{ peneiras, carregando, erro }}>
      {children}
    </PeneirasContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePeneiras() {
  const contexto = useContext(PeneirasContext);

  if (contexto === null) {
    throw new Error('usePeneiras precisa ser usado dentro de um PeneirasProvider');
  }

  return contexto;
}