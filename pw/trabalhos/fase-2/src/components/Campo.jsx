function Campo({ id, rotulo, erro, dica, largo = false, children }) {
  return (
    <div className={largo ? 'campo campo-largo' : 'campo'}>
      <label htmlFor={id}>{rotulo}</label>
      {children}
      {dica && (
        <p className="dica" id={`dica-${id}`}>
          {dica}
        </p>
      )}
      <p className="erro" id={`erro-${id}`} role="alert">
        {erro}
      </p>
    </div>
  );
}

export default Campo;