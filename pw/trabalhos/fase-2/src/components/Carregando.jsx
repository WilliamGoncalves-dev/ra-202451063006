function Carregando({ texto = 'Carregando...' }) {
  return (
    <p className="carregando" role="status">
      {texto}
    </p>
  );
}

export default Carregando;