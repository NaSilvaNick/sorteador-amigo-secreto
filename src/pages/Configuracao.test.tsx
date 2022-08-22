import { render } from "@testing-library/react";
import { RecoilRoot } from "recoil"
import Configuracao from './Configuracao'

const mockNavegacao = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavegacao
}))

describe('', () => {
  test('Deve ser renderizado corretamente', () => {
    const { container } = render(
      <RecoilRoot>
        <Configuracao />
      </RecoilRoot>
    )

    expect(container).toMatchSnapshot()
  })
})