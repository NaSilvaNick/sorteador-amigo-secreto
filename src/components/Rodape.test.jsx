import { fireEvent, render, screen } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import { useListaParticipantes } from "../state/hooks/useListaParticipantes"
import Rodape from "./Rodape"

jest.mock('../state/hooks/useListaParticipantes', () => ({
  useListaParticipantes: jest.fn()
}))

const mockNavegacao = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavegacao
}))

const mockSorteio = jest.fn();

jest.mock('../state/hooks/useSorteador', () => ({
  useSorteador: () => mockSorteio
}))

describe('Quando não existem participantes suficientes', () => {

  beforeEach(() => {
    useListaParticipantes.mockReturnValue(["Nickolas", 'Gabrielle'])
  })

  test('A brincadeira não pode ser iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    )

    const botao = screen.getByRole('button')

    expect(botao).toBeDisabled()
  })
})

describe('Quando existem participantes suficientes', () => {
  const participantes = ['Nickolas', 'Gabrielle', 'José', 'Carlão']

  beforeEach(() => {
    useListaParticipantes.mockReturnValue(participantes)
  })

  test('A brincadeira pode ser iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    )

    const botao = screen.getByRole('button')

    expect(botao).toBeEnabled()
  })

  test('A brincadeira foi iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    )

    const botao = screen.getByRole('button')
    fireEvent.click(botao)

    expect(mockNavegacao).toHaveBeenCalledTimes(1)
    expect(mockNavegacao).toHaveBeenCalledWith('/sorteio')
    expect(mockSorteio).toHaveBeenCalledTimes(1)
  })
})

describe('O Rodape com participantes suficientes', () => {
  beforeEach(() => {
    (useListaParticipantes).mockReturnValueOnce(['Ana', 'Catarina', 'Jorel'])
  })

  test('habilita o início da brincadeira', async () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    )
    const botao = screen.getByRole('button')
    expect(botao).toBeEnabled()
  })
})