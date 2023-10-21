import { TournamentActions } from '../types/actionTypes/tournamentActionsTypes';
import {
  CREATE_TOURNAMENT_SUCCESS,
  DELETE_TOURNAMENT,
  EDIT_TOURNAMENT,
  GET_TOURNAMENTS_SUCCESS,
  SET_MODAL_ITEM,
  UNDO_DELETE,
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

type DeleteItem = Tournament & { index: number };

type TournamentsState = {
  tournaments: Array<Tournament> | null;
  page: number;
  moreToFetch: boolean;
  modalItem: Tournament;
  deleteItem: DeleteItem;
};

const initalItem = {
  game: '',
  id: '',
  name: '',
  organizer: '',
  participants: { current: 0, max: 0 },
  startDate: '',
  index: -1,
};

const initialState = {
  tournaments: null,
  page: 1,
  moreToFetch: true,
  modalItem: initalItem,
  deleteItem: initalItem,
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
            deleteItem: { ...initalItem },
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
          state.tournaments as Array<Tournament>,
          action.payload.id,
          action.payload.value
        ),
      };
    case UNDO_EDIT:
      return {
        ...state,
        tournaments: insertItemById(
          state.tournaments as Array<Tournament>,
          action.payload.id,
          state.modalItem
        ),
        modalItem: { ...initalItem },
      };
    case DELETE_TOURNAMENT:
      return {
        ...state,
        tournaments: deleteItemById(
          state.tournaments as Array<Tournament>,
          action.payload.id
        ),
        deleteItem: {
          ...state.modalItem,
          index: getIndexById(
            state.tournaments as Array<Tournament>,
            action.payload.id
          ),
        },
        modalItem: { ...initalItem },
      };
    case UNDO_DELETE:
      return {
        ...state,
        tournaments: insertItemByIndex(
          state.tournaments as Array<Tournament>,
          state.deleteItem.index,
          state.deleteItem
        ),
        deleteItem: { ...initalItem },
      };
    case CREATE_TOURNAMENT_SUCCESS:
      return isEmptyArray(state.tournaments) || state.tournaments === null
        ? {
            ...state,
            tournaments: [action.payload.data],
          }
        : {
            ...state,
            tournaments: [action.payload.data, ...state.tournaments],
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

function insertItemByIndex(
  array: Array<Tournament>,
  index: number,
  originalItem: DeleteItem
) {
  let newArray = array.map((item) => item);
  newArray.splice(index, 0, { ...originalItem });
  return newArray;
}

function deleteItemById(array: Array<Tournament>, id: string) {
  const filteredArray = array.filter((item) => item.id !== id);
  return filteredArray;
}

function getIndexById(array: Array<Tournament>, id: string) {
  const index = array.findIndex((item) => item.id === id);
  return index;
}
