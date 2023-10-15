import { Tournament } from '../../reducers/tournaments';
import {
  GET_TOURNAMENTS_FAILURE,
  GET_TOURNAMENTS_REQUEST,
  GET_TOURNAMENTS_SUCCESS,
} from '../../actions/tournaments';

interface GetTournamentsRequest {
  type: typeof GET_TOURNAMENTS_REQUEST;
}

interface GetTournamentsSuccess {
  type: typeof GET_TOURNAMENTS_SUCCESS;
  payload: { data: Array<Tournament>; page: number };
}

export interface GetTournamentsFailure {
  type: typeof GET_TOURNAMENTS_FAILURE;
  payload: { error: string };
}

export type TournamentActions =
  | GetTournamentsRequest
  | GetTournamentsSuccess
  | GetTournamentsFailure;
