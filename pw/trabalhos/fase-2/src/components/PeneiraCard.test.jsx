import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import PeneiraCard from './PeneiraCard';

const peneira = {
  id: 7,
  nome: 'Tupi',
  cidade: 'Juiz de Fora',
  uf: 'MG',
  faixaEtaria: 'Nascidos entre 2010 e 2012',
  posicoes: 'Zagueiros, Laterais e Meias',
  descricao: 'Treino de fundamentos.',
  status: 'Criada',
};

function renderizarCard() {
  return render(
    <MemoryRouter>
      <PeneiraCard peneira={peneira} />
    </MemoryRouter>
  );
}

describe('PeneiraCard', () => {
  it('mostra o nome, a cidade e o status da peneira', () => {
    renderizarCard();

    expect(screen.getByRole('heading', { name: 'Tupi' })).toBeInTheDocument();
    expect(screen.getByText(/Juiz de Fora/)).toBeInTheDocument();
    expect(screen.getByText('Criada')).toBeInTheDocument();
  });

  it('linka o nome para a página de detalhe da peneira', () => {
    renderizarCard();

    expect(screen.getByRole('link', { name: 'Tupi' })).toHaveAttribute(
      'href',
      '/peneiras/7'
    );
  });
});