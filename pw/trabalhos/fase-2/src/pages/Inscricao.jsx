import FormularioInscricao from '../components/FormularioInscricao';

function Inscricao() {
  return (
    <section aria-labelledby="titulo-inscricao">
      <h1 id="titulo-inscricao">Inscrição do Atleta</h1>
      <p>
        Todas as peneiras do Soccer Dream são gratuitas — a única exigência é um
        quilo de alimento não perecível no dia da seleção. Leve seu próprio
        material: chuteira, meião, caneleira e roupa apropriada. Os coletes são
        distribuídos no local.
      </p>
      <FormularioInscricao />
    </section>
  );
}

export default Inscricao;