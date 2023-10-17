import { Tournament } from '../../reducers/tournaments';
import {
  EDIT_TOURNAMENT,
  GET_TOURNAMENTS_FAILURE,
  GET_TOURNAMENTS_REQUEST,
  GET_TOURNAMENTS_SUCCESS,
  SET_MODAL_ITEM,
  UNDO_EDIT,
} from '../../actions/tournaments';

interface GetTournamentsRequest {
  type: typeof GET_TOURNAMENTS_REQUEST;
}

interface GetTournamentsSuccess {
  type: typeof GET_TOURNAMENTS_SUCCESS;
  payload: { data: Array<Tournament>; page: number };
}

interface GetTournamentsFailure {
  type: typeof GET_TOURNAMENTS_FAILURE;
  payload: { error: string };
}

interface SetModalItem {
  type: typeof SET_MODAL_ITEM;
  payload: { modalItem: Tournament };
}

interface EditTournament {
  type: typeof EDIT_TOURNAMENT;
  payload: { id: string; value: string };
}

interface UndoEdit {
  type: typeof UNDO_EDIT;
  payload: { id: string };
}

export type TournamentActions =
  | GetTournamentsRequest
  | GetTournamentsSuccess
  | GetTournamentsFailure
  | SetModalItem
  | EditTournament
  | UndoEdit;
