import { describe, it, expect } from 'vitest';
import { calcularIdade, mascararTelefone, validar } from './inscricao';

const hoje = new Date(2026, 10, 18); // 18/11/2026 (mês começa em 0)

const dadosValidos = {
  nome: 'João da Silva',
  nascimento: '2012-05-10',
  municipio: 'Nova Lima',
  email: 'joao@email.com',
  telefone: '(31) 91234-5678',
  peDominante: 'Direito',
  posicao: 'Meia',
  posicaoSecundaria: 'Ala',
  altura: '165',
  clubeAtual: '',
  video: '',
  peneira: '1',
  termo: true,
};

describe('mascararTelefone', () => {
  it('formata 11 dígitos como (DD) 9XXXX-XXXX', () => {
    expect(mascararTelefone('31912345678')).toBe('(31) 91234-5678');
  });

  it('forma a máscara aos poucos, conforme a pessoa digita', () => {
    expect(mascararTelefone('3')).toBe('(3');
    expect(mascararTelefone('31')).toBe('(31');
    expect(mascararTelefone('319123')).toBe('(31) 9123');
  });

  it('ignora letras e limita a 11 dígitos', () => {
    expect(mascararTelefone('abc')).toBe('');
    expect(mascararTelefone('3191234567899999')).toBe('(31) 91234-5678');
  });
});

describe('calcularIdade', () => {
  it('conta o aniversário de hoje como completo', () => {
    expect(calcularIdade('2020-11-18', hoje)).toBe(6);
  });

  it('ainda não completou se o aniversário é amanhã', () => {
    expect(calcularIdade('2020-11-19', hoje)).toBe(5);
  });
});

describe('validar', () => {
  it('aceita um cadastro completo e correto', () => {
    expect(validar(dadosValidos, hoje)).toEqual({});
  });

  it('aceita os campos opcionais vazios', () => {
    const dados = { ...dadosValidos, posicaoSecundaria: '', clubeAtual: '', video: '' };
    expect(validar(dados, hoje)).toEqual({});
  });

  it('recusa atleta com menos de 6 anos completos', () => {
    const erros = validar({ ...dadosValidos, nascimento: '2020-11-19' }, hoje);
    expect(erros.nascimento).toMatch(/6 anos/);
  });

  it('recusa posição secundária igual à principal', () => {
    const erros = validar({ ...dadosValidos, posicaoSecundaria: 'Meia' }, hoje);
    expect(erros.posicaoSecundaria).toBeDefined();
  });

  it('recusa altura fora do intervalo ou não inteira', () => {
    expect(validar({ ...dadosValidos, altura: '99' }, hoje).altura).toBeDefined();
    expect(validar({ ...dadosValidos, altura: '231' }, hoje).altura).toBeDefined();
    expect(validar({ ...dadosValidos, altura: '170.5' }, hoje).altura).toBeDefined();
    expect(validar({ ...dadosValidos, altura: '' }, hoje).altura).toBeDefined();
  });

  it('aceita vídeo vazio ou com link http(s) e recusa o resto', () => {
    expect(validar({ ...dadosValidos, video: 'https://youtu.be/abc' }, hoje).video).toBeUndefined();
    expect(validar({ ...dadosValidos, video: 'meu video' }, hoje).video).toBeDefined();
    expect(validar({ ...dadosValidos, video: 'ftp://servidor/video' }, hoje).video).toBeDefined();
  });

  it('recusa e-mail e telefone inválidos', () => {
    expect(validar({ ...dadosValidos, email: 'teste@outlook' }, hoje).email).toBeDefined();
    expect(validar({ ...dadosValidos, telefone: '(31) 1234' }, hoje).telefone).toBeDefined();
  });

  it('lista os erros na mesma ordem dos campos na tela', () => {
    const vazio = {
      ...dadosValidos,
      nome: '',
      municipio: '',
      posicao: '',
      termo: false,
    };
    expect(Object.keys(validar(vazio, hoje))).toEqual([
      'nome',
      'municipio',
      'posicao',
      'termo',
    ]);
  });
});