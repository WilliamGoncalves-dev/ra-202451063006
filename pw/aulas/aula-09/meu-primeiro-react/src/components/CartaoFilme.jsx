  function CartaoFilme({ filme }) {
    let curtidas = 0;
  
    function curtir() {
      curtidas = curtidas + 1;
      console.log(filme.titulo, curtidas);
    }
  
    return (
      <article className="cartao">
        <h2>{filme.titulo}</h2>
        <p>{filme.ano} · {filme.genero} · {filme.duracao} min</p>
        <button onClick={curtir}>Curtir ({curtidas})</button>
      </article>
    );
  }
  
  export default CartaoFilme;

