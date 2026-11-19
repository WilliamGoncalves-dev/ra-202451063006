import { usePeneiras } from '../context/PeneirasContext';

function FiltroPeneiras({ filtros, onChange }) {
  const { peneiras } = usePeneiras();

  const cidades = [...new Set(peneiras.map((peneira) => peneira.cidade))].sort(
    (a, b) => a.localeCompare(b, 'pt-BR')
  );

  return (
    <form
      className="filtro-peneiras"
      role="search"
      aria-label="Filtrar peneiras"
      onSubmit={(evento) => evento.preventDefault()}
    >
      <div className="campo">
        <label htmlFor="busca">Buscar por nome, posição ou cidade</label>
        <input
          id="busca"
          name="busca"
          type="search"
          value={filtros.busca}
          onChange={onChange}
        />
      </div>

      <div className="campo">
        <label htmlFor="cidade">Município</label>
        <select
          id="cidade"
          name="cidade"
          value={filtros.cidade}
          onChange={onChange}
        >
          <option value="">Todos</option>
          {cidades.map((cidade) => (
            <option key={cidade} value={cidade}>
              {cidade}
            </option>
          ))}
        </select>
      </div>

      <div className="campo">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={filtros.status}
          onChange={onChange}
        >
          <option value="">Todos</option>
          <option value="Criada">Criada</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Finalizada">Finalizada</option>
        </select>
      </div>

      <div className="campo">
        <label htmlFor="peDominante">Pé dominante do atleta</label>
        <select
          id="peDominante"
          name="peDominante"
          value={filtros.peDominante}
          onChange={onChange}
        >
          <option value="">Todos</option>
          <option value="Direito">Direito</option>
          <option value="Esquerdo">Esquerdo</option>
        </select>
      </div>
    </form>
  );
}

export default FiltroPeneiras;