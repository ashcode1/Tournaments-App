import { ThunkAction } from 'redux-thunk';
import { fetchWrapper } from '../network';
import { AppDispatch, RootState } from '../store';
import { API_TOURNAMENTS_URL } from '../constants/api';
import { TournamentActions } from '../types/actionTypes/tournamentActionsTypes';

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
