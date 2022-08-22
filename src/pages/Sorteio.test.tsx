import { fireEvent, render, screen } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import { useListaParticipantes } from "../state/hooks/useListaParticipantes"
import { useResultadoSorteio } from "../state/hooks/useResultadoSorteio"
import Sorteio from "./Sorteio"

jest.mock('../state/hooks/useListaParticipantes', () => ({
  useListaParticipantes: jest.fn()
}))

jest.mock('../state/hooks/useResultadoSorteio', () => ({
  useResultadoSorteio: jest.fn()
}))

describe('Na página de sorteio', () => {

  const participantes = ["Nickolas", "Gabrielle", "Caio Felipe"]
  const resultado = new Map([
    ['Nickolas', 'Gabrielle'],
    ['Gabrielle', 'Caio Felipe'],
    ['Caio Felipe', 'Nickolas']
  ])

  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue(participantes)
  })

  beforeEach(() => {
    (useResultadoSorteio as jest.Mock).mockReturnValue(resultado)
  })

  test('Todos os participantes podem exibir o seu amigo secreto', () => {
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    )

    const opcoes = screen.queryAllByRole('option')
    expect(opcoes).toHaveLength(participantes.length + 1) // 1 option default
  })

  test('O amigo secreto é exibido quando solicitado', () => {
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    )

    const select = screen.getByPlaceholderText('Selecione o seu nome')

    fireEvent.change(select, {
      target: { value: participantes[0] }
    })

    const botao = screen.getByRole('button')

    fireEvent.click(botao)

    const amigoSecreto = screen.getByRole("alert")

    expect(amigoSecreto).toBeInTheDocument()
  })
})