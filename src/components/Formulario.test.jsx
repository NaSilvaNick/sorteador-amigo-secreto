import { fireEvent, render, screen } from "@testing-library/react";
import Formulario from "./Formulario";
import { RecoilRoot } from "recoil";
import { act } from "react-dom/test-utils";

// Jest

describe("O comportamento do Formulario.tsx", () => {
  test('Quando o input está vazio, novos participantes não podem ser adicionados', () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    )

    // encontrar no DOM o input
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes');

    // encontrar o botão
    const botao = screen.getByRole('button');

    // garantir que o input esteja no documento
    expect(input).toBeInTheDocument();

    // garantir que o botào esteja desabilitado
    expect(botao).toBeDisabled();
  });

  test('Adicionar um participante casa exista um nome preenchido', () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    )

    // encontrar no DOM o input
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes');

    // encontrar o botão
    const botao = screen.getByRole('button');

    // inserir um valor no input
    fireEvent.change(input, {
      target: {
        value: 'Nickolas Silva'
      }
    })

    // clicar no botão de submeter
    fireEvent.click(botao)

    // garantir que o input esteja com o foco ativo
    expect(input).toHaveFocus()

    // garantir que o input não tenha um valor
    expect(input).toHaveValue("")
  })

  test('Nomes duplicados não podem ser adicionados na lista', () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    )

    // encontrar no DOM o input
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes');

    // encontrar o botão
    const botao = screen.getByRole('button');

    // inserir um valor no input
    fireEvent.change(input, {
      target: {
        value: 'Nickolas Silva'
      }
    })

    // clicar no botão de submeter
    fireEvent.click(botao)

    // inserir novamente o mesmo valor no input
    fireEvent.change(input, {
      target: {
        value: 'Nickolas Silva'
      }
    })

    // clicar no botão de submeter
    fireEvent.click(botao)

    // buscar mensagem de erro
    const mensagemDeErro = screen.getByRole('alert')

    // garantir que a mensagem esteja aparecendo
    expect(mensagemDeErro.textContent).toBe('Nomes duplicados não são permitidos!')
  })

  test('A mensagem de erro deve sumir apos N segundos', () => {

    jest.useFakeTimers()

    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    )

    // encontrar no DOM o input
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes');

    // encontrar o botão
    const botao = screen.getByRole('button');

    // inserir um valor no input
    fireEvent.change(input, {
      target: {
        value: 'Nickolas Silva'
      }
    })

    // clicar no botão de submeter
    fireEvent.click(botao)

    // inserir novamente o mesmo valor no input
    fireEvent.change(input, {
      target: {
        value: 'Nickolas Silva'
      }
    })

    // clicar no botão de submeter
    fireEvent.click(botao)

    let mensagemDeErro

    // buscar a mensagem de erro
    mensagemDeErro = screen.queryByRole('alert')

    // garantir que a mensagem esteja aparecendo
    expect(mensagemDeErro.textContent).toBe('Nomes duplicados não são permitidos!')

    act(() => {
      // esperar N segundos
      jest.runAllTimers()
    })

    // tentar buscar a mensagem de erro novamente
    mensagemDeErro = screen.queryByRole('alert')
    // garantir que a mensagem de erro tenha sumido
    expect(mensagemDeErro).toBeNull()
  })

})