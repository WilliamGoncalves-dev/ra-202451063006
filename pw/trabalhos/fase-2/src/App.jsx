import Header from './components/Header';
import Footer from './components/Footer';
import Peneiras from './pages/Peneiras';
import Inscricao from './pages/Inscricao';

function App() {
  return (
    <>
      <Header />
      <main id="conteudo-principal">
        <Peneiras />
        <Inscricao />
      </main>
      <Footer />
    </>
  );
}

export default App;