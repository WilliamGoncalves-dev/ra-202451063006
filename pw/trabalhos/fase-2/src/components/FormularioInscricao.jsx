import { useState } from 'react';

const valoresIniciais = {
  nome: '',
  nascimento: '',
  email: '',
  telefone: '',
  posicao: '',
  experiencia: '',
  peneira: '',
  termo: false,
};

function FormularioInscricao() {
  const [dados, setDados] = useState(valoresIniciais);
  const [erros] = useState({});

  function atualizar(evento) {
    const { name, value, type, checked } = evento.target;
    setDados({ ...dados, [name]: type === 'checkbox' ? checked : value });
  }

  function enviar(evento) {
    evento.preventDefault();
    console.log(dados); // provisório: só para ver o estado funcionando
  }

  return (
    <form onSubmit={enviar} noValidate>
      <fieldset className="campos-grade">
        <legend>Dados do atleta</legend>

        <div className="campo campo-largo">
          <label htmlFor="nome">Nome completo</label>
          <input
            id="nome"
            name="nome"
            type="text"
            autoComplete="name"
            value={dados.nome}
            onChange={atualizar}
            aria-invalid={Boolean(erros.nome)}
            aria-describedby="erro-nome"
            required
          />
          <p className="erro" id="erro-nome" role="alert">{erros.nome}</p>
        </div>

        <div className="campo">
          <label htmlFor="nascimento">Data de nascimento</label>
          <input
            id="nascimento"
            name="nascimento"
            type="date"
            autoComplete="bday"
            value={dados.nascimento}
            onChange={atualizar}
            aria-invalid={Boolean(erros.nascimento)}
            aria-describedby="erro-nascimento"
            required
          />
          <p className="erro" id="erro-nascimento" role="alert">{erros.nascimento}</p>
        </div>

        <div className="campo">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={dados.email}
            onChange={atualizar}
            aria-invalid={Boolean(erros.email)}
            aria-describedby="dica-email erro-email"
            required
          />
          <p className="dica" id="dica-email">Usaremos para enviar a confirmação da peneira.</p>
          <p className="erro" id="erro-email" role="alert">{erros.email}</p>
        </div>

        <div className="campo">
          <label htmlFor="telefone">Telefone (com DDD)</label>
          <input
            id="telefone"
            name="telefone"
            type="tel"
            autoComplete="tel"
            placeholder="(31) 91234-5678"
            value={dados.telefone}
            onChange={atualizar}
            aria-invalid={Boolean(erros.telefone)}
            aria-describedby="erro-telefone"
            required
          />
          <p className="erro" id="erro-telefone" role="alert">{erros.telefone}</p>
        </div>
      </fieldset>

      <fieldset>
        <legend>Perfil como atleta</legend>

        <div className="campo">
          <label htmlFor="posicao">Posição principal</label>
          <select
            id="posicao"
            name="posicao"
            value={dados.posicao}
            onChange={atualizar}
            aria-invalid={Boolean(erros.posicao)}
            aria-describedby="erro-posicao"
            required
          >
            <option value="">Selecione...</option>
            <option value="goleiro">Goleiro</option>
            <option value="zagueiro">Zagueiro</option>
            <option value="lateral">Lateral</option>
            <option value="volante">Volante</option>
            <option value="meia">Meia</option>
            <option value="ala">Ala</option>
            <option value="atacante">Atacante</option>
          </select>
          <p className="erro" id="erro-posicao" role="alert">{erros.posicao}</p>
        </div>

        <fieldset className="campo" aria-describedby="erro-experiencia">
          <legend>Já jogou em alguma categoria de base de clube?</legend>
          <label className="opcao-radio">
            <input
              id="experiencia"
              name="experiencia"
              type="radio"
              value="sim"
              checked={dados.experiencia === 'sim'}
              onChange={atualizar}
              required
            />{' '}
            Sim
          </label>
          <label className="opcao-radio">
            <input
              name="experiencia"
              type="radio"
              value="nao"
              checked={dados.experiencia === 'nao'}
              onChange={atualizar}
            />{' '}
            Não
          </label>
          <p className="erro" id="erro-experiencia" role="alert">{erros.experiencia}</p>
        </fieldset>
      </fieldset>

      <fieldset>
        <legend>Peneira de interesse</legend>

        <div className="campo">
          <label htmlFor="peneira">Qual peneira você quer participar?</label>
          <select
            id="peneira"
            name="peneira"
            value={dados.peneira}
            onChange={atualizar}
            aria-invalid={Boolean(erros.peneira)}
            aria-describedby="erro-peneira"
            required
          >
            <option value="">Selecione...</option>
            {/* PROVISÓRIO: lista repetida à mão. Sai daqui quando o Context existir. */}
            <option value="1">Vila Nova FC — Nova Lima/MG</option>
            <option value="2">Tupi — Juiz de Fora/MG</option>
            <option value="3">Palmeiras — Campinas/SP</option>
          </select>
          <p className="erro" id="erro-peneira" role="alert">{erros.peneira}</p>
        </div>

        <div className="campo campo-checkbox">
          <label>
            <input
              id="termo"
              name="termo"
              type="checkbox"
              checked={dados.termo}
              onChange={atualizar}
              aria-describedby="erro-termo"
              required
            />
            Li e estou de acordo com as diretrizes do Soccer Dream, incluindo a
            doação de um quilo de alimento não perecível no dia da peneira.
          </label>
          <p className="erro" id="erro-termo" role="alert">{erros.termo}</p>
        </div>
      </fieldset>

      <button type="submit">Enviar inscrição</button>
    </form>
  );
}

export default FormularioInscricao;