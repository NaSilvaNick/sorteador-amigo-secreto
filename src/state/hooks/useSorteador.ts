import { useRecoilValue, useSetRecoilState } from "recoil"
import { listaParticipantesState, resultadoAmigoSecretoState } from "../atom"
import realizarSorteio from "../helper/realizarSorteio";

export const useSorteador = () => {
  const participantes = useRecoilValue(listaParticipantesState);
  const setResultadoAmigoSecreto = useSetRecoilState(resultadoAmigoSecretoState)
  return () => {
    const resultado = realizarSorteio(participantes)
    setResultadoAmigoSecreto(resultado)
  }
}