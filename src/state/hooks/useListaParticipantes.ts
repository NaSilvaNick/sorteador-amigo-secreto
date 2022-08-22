import { useRecoilValue } from "recoil"
import { listaParticipantesState } from "../atom"

export const useListaParticipantes = () =>
  useRecoilValue(listaParticipantesState);