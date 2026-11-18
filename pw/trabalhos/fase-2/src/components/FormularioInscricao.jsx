import { useState } from 'react';
import { usePeneiras } from '../context/PeneirasContext';
import { mascararTelefone, validar } from '../utils/inscricao';
import Campo from './Campo';

const POSICOES = ['Goleiro', 'Zagueiro', 'Lateral', 'Volante', 'Meia', 'Ala', 'Atacante'];
const PES = ['Direito', 'Esquerdo', 'Ambidestro'];

const valoresIniciais = {
  nome: '',
  nascimento: '',
  municipio: '',
  email: '',
  telefone: '',
  peDominante: '',
  posicao: '',
  posicaoSecundaria: '',
  altura: '',
  clubeAtual: '',
  video: '',
  peneira: '',
  termo: false,
};

function FormularioInscricao() {
  const { peneiras } = usePeneiras();
  const [dados, setDados] = useState(valoresIniciais);
  const [erros, setErros] = useState({});
  const [enviado, setEnviado] = useState(false);

  function atualizar(evento) {
    const { name, value, type, checked } = evento.target;
    let novoValor = type === 'checkbox' ? checked : value;

    if (name === 'telefone') {
      novoValor = mascararTelefone(value);
    }

    setDados({ ...dados, [name]: novoValor });
  }

  function enviar(evento) {
    evento.preventDefault();
    setEnviado(false);

    const novosErros = validar(dados);
    setErros(novosErros);

    const camposComErro = Object.keys(novosErros);
    if (camposComErro.length > 0) {
      document.getElementById(camposComErro[0]).focus();
      return;
    }

    // Simulação: ainda não há backend nesta fase.
    console.log('Inscrição enviada:', dados);
    setDados(valoresIniciais);
    setEnviado(true);
  }

  // Props que todo campo controlado repete: id, name, valor, onChange e acessibilidade.
  function propsDoCampo(nome, comDica = false) {
    return {
      id: nome,
      name: nome,
      value: dados[nome],
      onChange: atualizar,
      'aria-invalid': Boolean(erros[nome]),
      'aria-describedby': comDica ? `dica-${nome} erro-${nome}` : `erro-${nome}`,
    };
  }

  return (
    <>
      <form onSubmit={enviar} noValidate>
        <fieldset className="campos-grade">
          <legend>Dados pessoais</legend>

          <Campo id="nome" rotulo="Nome completo" erro={erros.nome} largo>
            <input type="text" autoComplete="name" required {...propsDoCampo('nome')} />
          </Campo>

          <Campo id="nascimento" rotulo="Data de nascimento" erro={erros.nascimento}>
            <input type="date" autoComplete="bday" required {...propsDoCampo('nascimento')} />
          </Campo>

          <Campo id="municipio" rotulo="Município de residência" erro={erros.municipio}>
            <input
              type="text"
              autoComplete="address-level2"
              required
              {...propsDoCampo('municipio')}
            />
          </Campo>

          <Campo
            id="email"
            rotulo="E-mail"
            dica="Usaremos para enviar a confirmação da peneira."
            erro={erros.email}
          >
            <input type="email" autoComplete="email" required {...propsDoCampo('email', true)} />
          </Campo>

          <Campo id="telefone" rotulo="Telefone (com DDD)" erro={erros.telefone}>
            <input
              type="tel"
              autoComplete="tel"
              placeholder="(31) 91234-5678"
              pattern="\(\d{2}\) \d{5}-\d{4}"
              required
              {...propsDoCampo('telefone')}
            />
          </Campo>
        </fieldset>

        <fieldset className="campos-grade">
          <legend>Perfil como atleta</legend>

          <Campo id="peDominante" rotulo="Pé dominante" erro={erros.peDominante}>
            <select required {...propsDoCampo('peDominante')}>
              <option value="">Selecione...</option>
              {PES.map((pe) => (
                <option key={pe} value={pe}>
                  {pe}
                </option>
              ))}
            </select>
          </Campo>

          <Campo id="posicao" rotulo="Posição principal" erro={erros.posicao}>
            <select required {...propsDoCampo('posicao')}>
              <option value="">Selecione...</option>
              {POSICOES.map((posicao) => (
                <option key={posicao} value={posicao}>
                  {posicao}
                </option>
              ))}
            </select>
          </Campo>

          <Campo
            id="posicaoSecundaria"
            rotulo="Posição secundária (opcional)"
            erro={erros.posicaoSecundaria}
          >
            <select {...propsDoCampo('posicaoSecundaria')}>
              <option value="">Nenhuma</option>
              {POSICOES.map((posicao) => (
                <option key={posicao} value={posicao}>
                  {posicao}
                </option>
              ))}
            </select>
          </Campo>

          <Campo
            id="altura"
            rotulo="Altura (cm)"
            dica="Em centímetros, por exemplo 172."
            erro={erros.altura}
          >
            <input
              type="number"
              inputMode="numeric"
              min="100"
              max="230"
              step="1"
              required
              {...propsDoCampo('altura', true)}
            />
          </Campo>

          <Campo
            id="clubeAtual"
            rotulo="Clube atual ou último clube (opcional)"
            erro={erros.clubeAtual}
            largo
          >
            <input type="text" {...propsDoCampo('clubeAtual')} />
          </Campo>

          <Campo
            id="video"
            rotulo="Link para vídeo de apresentação (opcional)"
            dica="YouTube, Google Drive ou similar, com acesso liberado para quem tiver o link."
            erro={erros.video}
            largo
          >
            <input type="url" placeholder="https://" {...propsDoCampo('video', true)} />
          </Campo>
        </fieldset>

        <fieldset className="campos-grade">
          <legend>Peneira de interesse</legend>

          <Campo
            id="peneira"
            rotulo="Qual peneira você quer participar?"
            erro={erros.peneira}
            largo
          >
            <select required {...propsDoCampo('peneira')}>
              <option value="">Selecione...</option>
              {peneiras.map((peneira) => (
                <option key={peneira.id} value={peneira.id}>
                  {peneira.nome} — {peneira.cidade}/{peneira.uf}
                </option>
              ))}
            </select>
          </Campo>

          <div className="campo campo-largo campo-checkbox">
            <label>
              <input
                id="termo"
                name="termo"
                type="checkbox"
                checked={dados.termo}
                onChange={atualizar}
                aria-invalid={Boolean(erros.termo)}
                aria-describedby="erro-termo"
                required
              />
              Li e estou de acordo com as diretrizes do Soccer Dream, incluindo a
              doação de um quilo de alimento não perecível no dia da peneira.
            </label>
            <p className="erro" id="erro-termo" role="alert">
              {erros.termo}
            </p>
          </div>
        </fieldset>

        <button type="submit">Enviar inscrição</button>
      </form>

      <p id="mensagem-envio" role="status" className={enviado ? 'sucesso' : ''}>
        {enviado &&
          'Inscrição enviada com sucesso! Em breve você recebe a confirmação por e-mail.'}
      </p>
    </>
  );
}

export default FormularioInscricao;