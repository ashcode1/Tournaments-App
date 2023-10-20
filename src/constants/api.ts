export const API_BASE_URL = 'http://localhost:4000';

export const API_TOURNAMENTS_URL = (
  page: number,
  limit: number,
  query: string = ''
) => `${API_BASE_URL}/tournaments?q=${query}&_page=${page}&_limit=${limit}`;
