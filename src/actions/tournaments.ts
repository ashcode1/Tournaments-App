import { ThunkAction } from 'redux-thunk';
import { fetchWrapper } from '../network';
import { AppDispatch, RootState } from '../store';
import { API_TOURNAMENTS_URL } from '../constants/api';
import { TournamentActions } from '../types/actionTypes/tournamentActionsTypes';
import { Tournament } from '../reducers/tournaments';

export const GET_TOURNAMENTS = 'GET_TOURNAMENTS';
export const GET_TOURNAMENTS_REQUEST = 'GET_TOURNAMENTS_REQUEST';
export const GET_TOURNAMENTS_SUCCESS = 'GET_TOURNAMENTS_SUCCESS';
export const GET_TOURNAMENTS_FAILURE = 'GET_TOURNAMENTS_FAILURE';

export const getTournaments =
  (
    page: number,
    limit: number
  ): ThunkAction<void, RootState, unknown, TournamentActions> =>
  async (appDispatch: AppDispatch) => {
    appDispatch({ type: GET_TOURNAMENTS_REQUEST });
    fetchWrapper
      .get(API_TOURNAMENTS_URL(page, limit))
      .then((data) => {
        appDispatch({ type: GET_TOURNAMENTS_SUCCESS, payload: { data, page } });
      })
      .catch((error) => {
        appDispatch({ type: GET_TOURNAMENTS_FAILURE, payload: { error } });
      });
  };

export const SET_MODAL_ITEM = 'SET_MODAL_ITEM';

export const setModalItem =
  (modalItem: Tournament) => (appDispatch: AppDispatch) => {
    appDispatch({ type: SET_MODAL_ITEM, payload: { modalItem } });
  };

export const EDIT_TOURNAMENT = 'EDIT_TOURNAMENT';

export const editTournament =
  (id: string, value: string) => (appDispatch: AppDispatch) => {
    appDispatch({ type: EDIT_TOURNAMENT, payload: { id, value } });
  };

export const UNDO_EDIT = 'UNDO_EDIT';

export const undoEdit = (id: string) => (appDispatch: AppDispatch) => {
  appDispatch({ type: UNDO_EDIT, payload: { id } });
};
