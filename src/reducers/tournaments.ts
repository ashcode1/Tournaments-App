import { TournamentActions } from '../types/actionTypes/tournamentActionsTypes';
import {
  EDIT_TOURNAMENT,
  GET_TOURNAMENTS_SUCCESS,
  SET_MODAL_ITEM,
  UNDO_EDIT,
} from '../actions/tournaments';

export interface Tournament {
  game: string;
  id: string;
  name: string;
  organizer: string;
  participants: { current: number; max: number };
  startDate: string;
}

type TournamentsState = {
  tournaments: Array<Tournament>;
  page: number;
  moreToFetch: boolean;
  modalItem: Tournament;
};

const initalModalItem = {
  game: '',
  id: '',
  name: '',
  organizer: '',
  participants: { current: 0, max: 0 },
  startDate: '',
};

const initialState = {
  tournaments: null,
  page: 1,
  moreToFetch: true,
  modalItem: initalModalItem,
};

export default function tournaments(
  state: TournamentsState = initialState,
  action: TournamentActions
) {
  switch (action.type) {
    case GET_TOURNAMENTS_SUCCESS:
      return isEmptyArray(action.payload.data)
        ? {
            ...state,
            moreToFetch: false,
          }
        : {
            ...state,
            page: action.payload.page + 1,
            moreToFetch: true,
            tournaments:
              action.payload.page === 1
                ? action.payload.data
                : state.tournaments?.concat(action.payload.data),
          };
    case SET_MODAL_ITEM:
      return {
        ...state,
        modalItem: action.payload.modalItem,
      };
    case EDIT_TOURNAMENT:
      return {
        ...state,
        tournaments: updateTournamentsById(
          state.tournaments,
          action.payload.id,
          action.payload.value
        ),
      };
    case UNDO_EDIT:
      return {
        ...state,
        tournaments: insertItemById(
          state.tournaments,
          action.payload.id,
          state.modalItem
        ),
        modalItem: initalModalItem,
      };
    default:
      return state;
  }
}

function isEmptyArray(val: any): boolean {
  if (Array.isArray(val) && val.length === 0) {
    return true;
  }
  return false;
}

function updateTournamentsById(
  array: Array<Tournament>,
  id: string,
  value: string
) {
  const newArray = array.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        name: value,
      };
    }
    return item;
  });
  return newArray;
}

function getItemById(array: Array<Tournament>, id: string) {
  const foundItem = array.find((item) => item.id === id);
  return foundItem;
}

function insertItemById(
  array: Array<Tournament>,
  id: string,
  originalItem: Tournament
) {
  const newArray = array.map((item) => {
    return item.id === id ? { ...originalItem } : item;
  });

  return newArray;
}
