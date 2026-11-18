export function mascararTelefone(valor) {
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

export function calcularIdade(dataIso, hoje = new Date()) {
  const [ano, mes, dia] = dataIso.split('-').map(Number);

  let idade = hoje.getFullYear() - ano;
  const aniversarioJaPassou =
    hoje.getMonth() + 1 > mes ||
    (hoje.getMonth() + 1 === mes && hoje.getDate() >= dia);

  if (!aniversarioJaPassou) idade--;
  return idade;
}

function urlValida(texto) {
  try {
    const url = new URL(texto);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

// Devolve um objeto { campo: 'mensagem' }. Objeto vazio = tudo válido.
// A ordem em que as chaves são criadas segue a ordem dos campos na tela.
export function validar(dados, hoje = new Date()) {
  const erros = {};

  if (dados.nome.trim().length < 3) {
    erros.nome = 'Digite seu nome completo (mínimo 3 letras).';
  }

  if (!dados.nascimento) {
    erros.nascimento = 'Informe sua data de nascimento.';
  } else if (calcularIdade(dados.nascimento, hoje) < 6) {
    erros.nascimento = 'É necessário ter pelo menos 6 anos completos para se inscrever.';
  }

  if (dados.municipio.trim().length < 2) {
    erros.municipio = 'Informe o município onde você mora.';
  }

  if (!/^\S+@\S+\.\S+$/.test(dados.email)) {
    erros.email = 'Digite um e-mail válido.';
  }

  if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(dados.telefone)) {
    erros.telefone = 'Digite um telefone válido, com DDD.';
  }

  if (!dados.peDominante) {
    erros.peDominante = 'Selecione seu pé dominante.';
  }

  if (!dados.posicao) {
    erros.posicao = 'Selecione sua posição principal.';
  }

  if (dados.posicaoSecundaria && dados.posicaoSecundaria === dados.posicao) {
    erros.posicaoSecundaria = 'A posição secundária deve ser diferente da principal.';
  }

  const altura = Number(dados.altura);
  if (!Number.isInteger(altura) || altura < 100 || altura > 230) {
    erros.altura = 'Informe a altura em centímetros, entre 100 e 230.';
  }

  if (dados.video && !urlValida(dados.video)) {
    erros.video = 'Informe um link válido, começando com http:// ou https://.';
  }

  if (!dados.peneira) {
    erros.peneira = 'Selecione a peneira de interesse.';
  }

  if (!dados.termo) {
    erros.termo = 'É necessário concordar com as diretrizes para continuar.';
  }

  return erros;
}