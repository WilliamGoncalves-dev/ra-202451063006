function PeneiraCard({ peneira }) {
  return (
    <article>
      <h2>{peneira.nome}</h2>
      <h3>
        {peneira.posicoes} · {peneira.faixaEtaria} · {peneira.cidade} · {peneira.uf}
      </h3>
      <p>{peneira.descricao}</p>
      <p className="selo">{peneira.status}</p>
    </article>
  );
}

export default PeneiraCard;