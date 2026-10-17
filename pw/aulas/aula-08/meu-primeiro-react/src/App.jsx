function Saudacao(props) {
  return <p> Olá, {props.nome}! Seja bem vindo(a).</p>;
}

function App() {

     return (
       <>
         <h1 className="titulo">Meu primeiro React!</h1>
         <Saudacao nome="Patrick" />
         <Saudacao nome="Beatriz risada de galinha de borracha" />
         <Saudacao nome="Carla" />
      </>
     );
   }
   
  export default App;

