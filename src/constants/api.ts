export const API_BASE_URL = 'http://localhost:4000';

export const API_TOURNAMENTS_URL = (page: number, limit: number) =>
  `${API_BASE_URL}/tournaments?_page=${page}&_limit=${limit}`;
