import { useState } from 'react';
import FiltroPeneiras from '../components/FiltroPeneiras';
import ListaPeneiras from '../components/ListaPeneiras';

function Peneiras() {
  const [filtros, setFiltros] = useState({ busca: '', status: '' });

  function atualizarFiltro(evento) {
    const { name, value } = evento.target;
    setFiltros({ ...filtros, [name]: value });
  }

  return (
    <section id="peneiras-perto-de-mim" aria-labelledby="titulo-peneiras">
      <h1 id="titulo-peneiras">Peneiras Perto de Mim</h1>
      <p>
        Encontre oportunidades de peneiras de futebol próximas a você. Todas são
        gratuitas — a única exigência é um quilo de alimento não perecível no dia
        da seleção.
      </p>
      <FiltroPeneiras filtros={filtros} onChange={atualizarFiltro} />
      <ListaPeneiras filtros={filtros} />
    </section>
  );
}

export default Peneiras;