import shuffle from "just-shuffle";

const realizarSorteio = (participantes: string[]) => {
  const totalDeParticipantes = participantes.length;
  const embaralhado = shuffle(participantes)

  const resultado = new Map<string, string>()

  for (let index = 0; index < participantes.length; index++) {
    const indexFriend = index === (totalDeParticipantes - 1) ? 0 : index + 1;
    resultado.set(embaralhado[index], embaralhado[indexFriend])
  }

  return resultado;
}

export default realizarSorteio