export const API_BASE_URL = 'http://localhost:4000';

export const API_TOURNAMENTS_URL = `${API_BASE_URL}/tournaments`;

export const GET_TOURNAMENTS_URL = (
  page: number,
  limit: number,
  query: string = ''
) => `${API_TOURNAMENTS_URL}?q=${query}&_page=${page}&_limit=${limit}`;

export const CREATE_TOURNAMENT_URL = `${API_TOURNAMENTS_URL}`;
