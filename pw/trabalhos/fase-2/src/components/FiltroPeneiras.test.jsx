import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FiltroPeneiras from './FiltroPeneiras';
import { usePeneiras } from '../context/PeneirasContext';

vi.mock('../context/PeneirasContext', () => ({
  usePeneiras: vi.fn(),
}));

const filtros = { busca: '', status: '', cidade: '', peDominante: '' };

describe('FiltroPeneiras', () => {
  it('lista cada município uma única vez e em ordem alfabética', () => {
    usePeneiras.mockReturnValue({
      peneiras: [
        { id: 1, cidade: 'Nova Lima' },
        { id: 2, cidade: 'Campinas' },
        { id: 3, cidade: 'Nova Lima' },
      ],
    });
    render(<FiltroPeneiras filtros={filtros} onChange={() => {}} />);

    const opcoes = screen.getAllByRole('option', { name: /Campinas|Nova Lima/ });
    expect(opcoes.map((opcao) => opcao.textContent)).toEqual([
      'Campinas',
      'Nova Lima',
    ]);
  });

  it('avisa o componente pai quando um filtro muda', () => {
    usePeneiras.mockReturnValue({ peneiras: [] });
    const aoMudar = vi.fn();
    render(<FiltroPeneiras filtros={filtros} onChange={aoMudar} />);

    fireEvent.change(screen.getByLabelText('Status'), {
      target: { value: 'Criada' },
    });

    expect(aoMudar).toHaveBeenCalledTimes(1);
  });
});