import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import ListaPeneiras from './ListaPeneiras';
import { usePeneiras } from '../context/PeneirasContext';

vi.mock('../context/PeneirasContext', () => ({
  usePeneiras: vi.fn(),
}));

const peneiras = [
  {
    id: 1,
    nome: 'Vila Nova FC',
    cidade: 'Nova Lima',
    uf: 'MG',
    faixaEtaria: 'Nascidos entre 2008 e 2014',
    posicoes: 'Todas as posições',
    descricao: 'Treino de força.',
    status: 'Em andamento',
  },
  {
    id: 2,
    nome: 'Tupi',
    cidade: 'Juiz de Fora',
    uf: 'MG',
    faixaEtaria: 'Nascidos entre 2010 e 2012',
    posicoes: 'Zagueiros, Laterais e Meias',
    descricao: 'Treino de fundamentos.',
    status: 'Criada',
  },
];

const semFiltro = { busca: '', status: '' };

function renderizarLista(filtros = semFiltro) {
  return render(
    <MemoryRouter>
      <ListaPeneiras filtros={filtros} />
    </MemoryRouter>
  );
}

describe('ListaPeneiras', () => {
  it('mostra o aviso de carregando enquanto os dados não chegam', () => {
    usePeneiras.mockReturnValue({ peneiras: [], carregando: true, erro: null });
    renderizarLista();

    expect(screen.getByRole('status')).toHaveTextContent('Carregando peneiras...');
  });

  it('mostra a mensagem de erro e o botão de tentar de novo', () => {
    usePeneiras.mockReturnValue({
      peneiras: [],
      carregando: false,
      erro: 'Falha ao carregar',
    });
    renderizarLista();

    expect(screen.getByRole('alert')).toHaveTextContent('Falha ao carregar');
    expect(screen.getByRole('button', { name: 'Tentar de novo' })).toBeInTheDocument();
  });

  it('mostra todos os cards quando não há filtro', () => {
    usePeneiras.mockReturnValue({ peneiras, carregando: false, erro: null });
    renderizarLista();

    expect(screen.getAllByRole('article')).toHaveLength(2);
  });

  it('filtra os cards pela busca no nome', () => {
    usePeneiras.mockReturnValue({ peneiras, carregando: false, erro: null });
    renderizarLista({ busca: 'tupi', status: '' });

    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(screen.getByRole('heading', { name: 'Tupi' })).toBeInTheDocument();
  });

  it('filtra os cards pelo status', () => {
    usePeneiras.mockReturnValue({ peneiras, carregando: false, erro: null });
    renderizarLista({ busca: '', status: 'Em andamento' });

    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(screen.getByRole('heading', { name: 'Vila Nova FC' })).toBeInTheDocument();
  });

  it('avisa quando nenhum filtro encontra resultado', () => {
    usePeneiras.mockReturnValue({ peneiras, carregando: false, erro: null });
    renderizarLista({ busca: 'xyz', status: '' });

    expect(
      screen.getByText('Nenhuma peneira encontrada com esses filtros.')
    ).toBeInTheDocument();
  });
});