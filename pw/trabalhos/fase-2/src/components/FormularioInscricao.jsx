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

function mascararTelefone(valor) {
  const numeros = valor.replace(/\D/g, '').slice(0, 11);

  if (numeros.length > 6) {
    return numeros.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  }
  if (numeros.length > 2) {
    return numeros.replace(/(\d{2})(\d{0,5})/, '($1) $2');
  }
  if (numeros.length > 0) {
    return numeros.replace(/(\d{0,2})/, '($1');
  }
  return '';
}

function calcularIdade(dataIso) {
  const [ano, mes, dia] = dataIso.split('-').map(Number);
  const hoje = new Date();

  let idade = hoje.getFullYear() - ano;
  const aniversarioJaPassou =
    hoje.getMonth() + 1 > mes ||
    (hoje.getMonth() + 1 === mes && hoje.getDate() >= dia);

  if (!aniversarioJaPassou) idade--;
  return idade;
}

function validar(dados) {
  const erros = {};

  if (dados.nome.trim().length < 3) {
    erros.nome = 'Digite seu nome completo (mínimo 3 letras).';
  }
  if (!dados.nascimento) {
    erros.nascimento = 'Informe sua data de nascimento.';
  } else if (calcularIdade(dados.nascimento) < 6) {
    erros.nascimento = 'É necessário ter pelo menos 6 anos completos para se inscrever.';
  }
  if (!/^\S+@\S+\.\S+$/.test(dados.email)) {
    erros.email = 'Digite um e-mail válido.';
  }
  if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(dados.telefone)) {
    erros.telefone = 'Digite um telefone válido, com DDD.';
  }
  if (!dados.posicao) {
    erros.posicao = 'Selecione sua posição principal.';
  }
  if (!dados.experiencia) {
    erros.experiencia = 'Selecione uma opção.';
  }
  if (!dados.peneira) {
    erros.peneira = 'Selecione a peneira de interesse.';
  }
  if (!dados.termo) {
    erros.termo = 'É necessário concordar com as diretrizes para continuar.';
  }

  return erros;
}

function FormularioInscricao() {
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
    setEnviado(false)

    const novosErros = validar(dados);
    setErros(novosErros);

    const camposComErro = Object.keys(novosErros);
    if (camposComErro.lenght > 0) {
      document.getElementById(camposComErro[0]).focus();
      return;
    }
    console.log('Inscrição enviada:',dados); // provisório: só para ver o estado funcionando
    setDados(valoresIniciais);
    setEnviado(true);
  }

  return (
    <>
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
            <option value="2">Atlético Mineiro — Belo Horizonte/MG</option>
            <option value="3">Cruzeiro — Belo Horizonte/MG</option>
            <option value="4">América Mineiro — Contagem/MG</option>
            <option value="5">Vasco da Gama — Rio de Janeiro/RJ</option>
            <option value="6">Botafogo — Rio de Janeiro/RJ</option>
            <option value="7">Fluminense — Duque de Caxias/RJ</option>
            <option value="8">Palmeiras — Guarulhos/SP</option>
            <option value="9">Corinthians — São Paulo/SP</option>
            <option value="10">Santos FC — Santos/SP</option>
            <option value="11">São Paulo FC — São Paulo/SP</option>
            <option value="12">Tupi — Juiz de Fora/MG</option>
            <option value="13">Palmeiras — Campinas/SP</option>
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

          <p id="mensagem-envio" role="status" className={enviado ? 'sucesso' : ''}>
            {enviado && 'Inscrição enviada com sucesso! Em breve você recebe a confirmação por e-mail.'}
          </p>
        </>
      );
}

export default FormularioInscricao;