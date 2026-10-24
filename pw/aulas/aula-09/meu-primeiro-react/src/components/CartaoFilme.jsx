function CartaoFilme({ filme }) {
     return (
       <article className="cartao">
         <h2>{filme.titulo}</h2>
         <p>{filme.ano} · {filme.genero} · {filme.duracao} min</p>
       </article>
     );
   }
   
   export default CartaoFilme;
