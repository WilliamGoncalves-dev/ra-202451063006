import Header from './components/Header';
import Footer from './components/Footer';
import Peneiras from './pages/Peneiras';

function App() {
  return (
    <>
      <Header />
      <main id="conteudo-principal">
        <Peneiras />
      </main>
      <Footer />
    </>
  );
}

export default App;