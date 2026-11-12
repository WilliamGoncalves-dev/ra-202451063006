function MensagemErro({ mensagem }) {
  return (
    <div className="mensagem-erro" role="alert">
      <p>{mensagem}</p>
      <button type="button" onClick={() => window.location.reload()}>
        Tentar de novo
      </button>
    </div>
  );
}

export default MensagemErro;