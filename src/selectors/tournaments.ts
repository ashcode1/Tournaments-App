import { RootState } from '../store';

export const tournamentsSelector = (state: RootState) =>
  state.tournaments.tournaments;
export const tournamentsPageSelector = (state: RootState) =>
  state.tournaments.page;
export const moreTournamentsToFetchSelector = (state: RootState) =>
  state.tournaments.moreToFetch;
