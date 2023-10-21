import { Tournament } from '../../reducers/tournaments';
import {
  CREATE_TOURNAMENT_FAILURE,
  CREATE_TOURNAMENT_REQUEST,
  CREATE_TOURNAMENT_SUCCESS,
  DELETE_TOURNAMENT,
  EDIT_TOURNAMENT,
  GET_TOURNAMENTS_FAILURE,
  GET_TOURNAMENTS_REQUEST,
  GET_TOURNAMENTS_SUCCESS,
  SET_MODAL_ITEM,
  UNDO_DELETE,
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

interface DeleteTournament {
  type: typeof DELETE_TOURNAMENT;
  payload: { id: string };
}

interface UndoEdit {
  type: typeof UNDO_EDIT;
  payload: { id: string };
}

interface UndoDelete {
  type: typeof UNDO_DELETE;
}

interface CreateTournamentRequest {
  type: typeof CREATE_TOURNAMENT_REQUEST;
}

interface CreateTournamentSuccess {
  type: typeof CREATE_TOURNAMENT_SUCCESS;
  payload: { data: Tournament };
}

interface CreateTournamentFailure {
  type: typeof CREATE_TOURNAMENT_FAILURE;
  payload: { error: string };
}

export type TournamentActions =
  | GetTournamentsRequest
  | GetTournamentsSuccess
  | GetTournamentsFailure
  | SetModalItem
  | EditTournament
  | DeleteTournament
  | UndoEdit
  | UndoDelete
  | CreateTournamentRequest
  | CreateTournamentSuccess
  | CreateTournamentFailure;
