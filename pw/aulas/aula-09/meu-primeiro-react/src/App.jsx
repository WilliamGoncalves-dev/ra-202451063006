import filmes from "./dados/filmes";
import CartaoFilme from "./components/CartaoFilme";


  
  function App() {
    return (
      <>
        <h1 className="titulo">Catálogo de filmes</h1>
        <p>Temos {filmes.length} filmes.</p>
        <div className="lista">
          {filmes.map((filme) => (
            <CartaoFilme key={filme.id} filme={filme} />
          ))}
        </div>
      </>
    );
  }
  
  export default App;

