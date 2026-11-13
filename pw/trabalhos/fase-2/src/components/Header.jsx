import { NavLink } from 'react-router';

function Header() {
  return (
    <>
      <a className="pular-conteudo" href="#conteudo-principal">
        Pular para o conteúdo
      </a>

      <header>
        <p className="site-nome">Soccer Dream</p>
        <p className="subtitulo-site">
          O sonho do futebol para aqueles que ousaram sonhar
        </p>
      </header>

      <nav aria-label="Menu principal">
        <ul>
          <li><NavLink to="/" end>Início</NavLink></li>
          <li><NavLink to="/peneiras">Peneiras Perto de Mim</NavLink></li>
          <li><NavLink to="/inscricao">Inscrição do Atleta</NavLink></li>
          <li><a href="#contato">Contato</a></li>
        </ul>
      </nav>
    </>
  );
}

export default Header;