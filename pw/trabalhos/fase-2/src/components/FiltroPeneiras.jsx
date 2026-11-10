function FiltroPeneiras({ filtros, onChange }) {
  return (
    <form
      className="filtro-peneiras"
      role="search"
      onSubmit={(evento) => evento.preventDefault()}
    >
      <div className="campo">
        <label htmlFor="busca">Buscar por nome ou cidade</label>
        <input
          id="busca"
          name="busca"
          type="search"
          value={filtros.busca}
          onChange={onChange}
        />
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
    </form>
  );
}

export default FiltroPeneiras;