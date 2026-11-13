import { Routes, Route } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Peneiras from './pages/Peneiras';
import Inscricao from './pages/Inscricao';
import NaoEncontrada from './pages/NaoEncontrada';

function App() {
  return (
    <>
      <Header />
      <main id="conteudo-principal">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/peneiras" element={<Peneiras />} />
          <Route path="/inscricao" element={<Inscricao />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;