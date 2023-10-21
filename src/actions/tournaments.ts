import { ThunkAction } from 'redux-thunk';
import { fetchWrapper } from '../network';
import { AppDispatch, RootState } from '../store';
import { CREATE_TOURNAMENT_URL, GET_TOURNAMENTS_URL } from '../constants/api';
import { TournamentActions } from '../types/actionTypes/tournamentActionsTypes';
import { Tournament } from '../reducers/tournaments';
import { CreateBody } from '../types/requestTypes/createBody';

// Append to any actions with network requests
const _REQUEST = '_REQUEST';
const _SUCCESS = '_SUCCESS';
const _FAILURE = '_FAILURE';

export const GET_TOURNAMENTS = 'GET_TOURNAMENTS';
export const GET_TOURNAMENTS_REQUEST = `${GET_TOURNAMENTS}${_REQUEST}`;
export const GET_TOURNAMENTS_SUCCESS = `${GET_TOURNAMENTS}${_SUCCESS}`;
export const GET_TOURNAMENTS_FAILURE = `${GET_TOURNAMENTS}${_FAILURE}`;

export const getTournaments =
  (
    page: number,
    limit: number,
    query?: string
  ): ThunkAction<void, RootState, unknown, TournamentActions> =>
  async (appDispatch: AppDispatch) => {
    const millisecs: number = 1000;
    appDispatch({
      type: GET_TOURNAMENTS_REQUEST,
      meta: { throttle: millisecs },
    });
    fetchWrapper
      .get(GET_TOURNAMENTS_URL(page, limit, query))
      .then((data) => {
        appDispatch({
          type: GET_TOURNAMENTS_SUCCESS,
          payload: { data, page },
          meta: { throttle: millisecs },
        });
      })
      .catch((error) => {
        appDispatch({
          type: GET_TOURNAMENTS_FAILURE,
          payload: { error },
          meta: { throttle: millisecs },
        });
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

export const DELETE_TOURNAMENT = 'DELETE_TOURNAMENT';

export const deleteTournament = (id: string) => (appDispatch: AppDispatch) => {
  appDispatch({ type: DELETE_TOURNAMENT, payload: { id } });
};

export const UNDO_DELETE = 'UNDO_DELETE';

export const undoDelete = () => (appDispatch: AppDispatch) => {
  appDispatch({ type: UNDO_DELETE });
};

export const CREATE_TOURNAMENT = 'CREATE_TOURNAMENT';
export const CREATE_TOURNAMENT_REQUEST = `${CREATE_TOURNAMENT}${_REQUEST}`;
export const CREATE_TOURNAMENT_SUCCESS = `${CREATE_TOURNAMENT}${_SUCCESS}`;
export const CREATE_TOURNAMENT_FAILURE = `${CREATE_TOURNAMENT}${_FAILURE}`;

export const createTournament =
  (name: string) => (appDispatch: AppDispatch) => {
    const body: CreateBody = { name };
    // appDispatch({
    //   type: CREATE_TOURNAMENT_REQUEST,
    // });
    fetchWrapper
      .post(CREATE_TOURNAMENT_URL, body)
      .then((data) => {
        appDispatch({ type: CREATE_TOURNAMENT_SUCCESS, payload: { data } });
      })
      .catch((error) => {
        appDispatch({
          type: CREATE_TOURNAMENT_FAILURE,
          payload: { error },
        });
      });
  };
