import { GET_TOURNAMENTS_SUCCESS } from '../actions/tournaments';
import { TournamentActions } from '../types/actionTypes/tournamentActionsTypes';

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
};

const initialState = {
  tournaments: null,
  page: 1,
  moreToFetch: true,
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
