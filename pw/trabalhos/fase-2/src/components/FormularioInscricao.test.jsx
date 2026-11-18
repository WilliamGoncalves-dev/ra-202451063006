import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FormularioInscricao from './FormularioInscricao';
import { usePeneiras } from '../context/PeneirasContext';

vi.mock('../context/PeneirasContext', () => ({
  usePeneiras: vi.fn(),
}));

const peneiras = [
  { id: 1, nome: 'Vila Nova FC', cidade: 'Nova Lima', uf: 'MG' },
  { id: 2, nome: 'Tupi', cidade: 'Juiz de Fora', uf: 'MG' },
];

function renderizarFormulario() {
  usePeneiras.mockReturnValue({ peneiras, carregando: false, erro: null });
  return render(<FormularioInscricao />);
}

function preencher(rotulo, valor) {
  fireEvent.change(screen.getByLabelText(rotulo), { target: { value: valor } });
}

describe('FormularioInscricao', () => {
  it('mostra os erros e foca o primeiro campo inválido ao enviar vazio', () => {
    renderizarFormulario();

    fireEvent.click(screen.getByRole('button', { name: 'Enviar inscrição' }));

    expect(screen.getByText('Digite seu nome completo (mínimo 3 letras).')).toBeInTheDocument();
    expect(screen.getByText('Selecione a peneira de interesse.')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome completo')).toHaveFocus();
    expect(screen.getByLabelText('Nome completo')).toHaveAttribute('aria-invalid', 'true');
  });

  it('aplica a máscara enquanto o telefone é digitado', () => {
    renderizarFormulario();

    preencher('Telefone (com DDD)', '31912345678');

    expect(screen.getByLabelText('Telefone (com DDD)')).toHaveValue('(31) 91234-5678');
  });

  it('oferece as peneiras do Context no campo de peneira', () => {
    renderizarFormulario();

    expect(screen.getByRole('option', { name: 'Vila Nova FC — Nova Lima/MG' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Tupi — Juiz de Fora/MG' })).toBeInTheDocument();
  });

  it('confirma o envio e limpa o formulário quando tudo está correto', () => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    renderizarFormulario();

    preencher('Nome completo', 'João da Silva');
    preencher('Data de nascimento', '2012-05-10');
    preencher('Município de residência', 'Nova Lima');
    preencher('E-mail', 'joao@email.com');
    preencher('Telefone (com DDD)', '31912345678');
    preencher('Pé dominante', 'Direito');
    preencher('Posição principal', 'Meia');
    preencher('Altura (cm)', '165');
    preencher('Qual peneira você quer participar?', '1');
    fireEvent.click(screen.getByRole('checkbox'));

    fireEvent.click(screen.getByRole('button', { name: 'Enviar inscrição' }));

    expect(screen.getByRole('status')).toHaveTextContent('Inscrição enviada com sucesso!');
    expect(screen.getByLabelText('Nome completo')).toHaveValue('');
  });
});