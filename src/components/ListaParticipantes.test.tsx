import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import ListaParticipantes from './ListaParticipantes';
import { useListaParticipantes } from '../state/hooks/useListaParticipantes';

jest.mock('../state/hooks/useListaParticipantes', () => ({
  useListaParticipantes: jest.fn()
}))

describe('Uma lista vazio de participantes', () => {

  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue([])
  })

  test('Deve ser renderizada sem elementos', () => {

    render(
      <RecoilRoot>
        <ListaParticipantes />
      </RecoilRoot>
    )

    const itens = screen.queryAllByRole('listitem')
    expect(itens).toHaveLength(0)
  })
})

describe('Uma lista preenchida de participantes', () => {

  const participantes = ["Nickolas", "Gabrielle"]

  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue(participantes)
  })

  test('Deve ser renderizada com elementos', () => {

    render(
      <RecoilRoot>
        <ListaParticipantes />
      </RecoilRoot>
    )

    const itens = screen.queryAllByRole('listitem')
    expect(itens).toHaveLength(participantes.length)
  })
})