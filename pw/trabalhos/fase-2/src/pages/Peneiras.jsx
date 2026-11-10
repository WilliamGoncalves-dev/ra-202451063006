import ListaPeneiras from '../components/ListaPeneiras';

function Peneiras() {
  return (
    <section id="peneiras-perto-de-mim" aria-labelledby="titulo-peneiras">
      <h1 id="titulo-peneiras">Peneiras Perto de Mim</h1>
      <p>
        Encontre oportunidades de peneiras de futebol próximas a você. Todas são
        gratuitas — a única exigência é um quilo de alimento não perecível no dia
        da seleção.
      </p>
      <ListaPeneiras />
    </section>
  );
}
export default Peneiras;