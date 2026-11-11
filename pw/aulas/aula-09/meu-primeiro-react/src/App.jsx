import { useState, useEffect } from "react";
   
   import CartaoFilme from "./components/CartaoFilme";
   
   function App() {
     const [busca, setBusca] = useState("");
     const [filmes, setFilmes] = useState([]);
     const [carregando, setCarregando] = useState(true);
     const [erro, setErro] = useState("");

     console.log("desenhou a tela");
  
     useEffect(() => {
        fetch("/filmes.json")
          .then((resposta) => {
            if (!resposta.ok) throw new Error("HTTP " + resposta.status);
            return resposta.json();
          })
          .then((dados) => setFilmes(dados))
          .catch((e) => setErro("Erro ao carregar os filmes."))
          .finally(() => setCarregando(false));
     }, []);

     const filtrados = filmes.filter((f) =>
       f.titulo.toLowerCase().includes(busca.toLowerCase())
     );

     if (carregando) return <p>Carregando…</p>;
  
     return (
       <>
         <h1 className="titulo">Catálogo de filmes</h1>
   
         <input
           placeholder="Buscar pelo título..."
           value={busca}
           onChange={(evento) => setBusca(evento.target.value)}
         />
         <p>{filtrados.length} de {filmes.length} filmes</p>
 
         {filtrados.length === 0 && <p>Nenhum filme encontrado.</p>}
   
         <div className="lista">
           {filtrados.map((filme) => (
             <CartaoFilme key={filme.id} filme={filme} />
           ))}
         </div>
       </>
     );
   }
   
  export default App;
