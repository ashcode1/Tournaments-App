export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
};

function get(url: string): Promise<any> {
  const requestOptions: RequestInit = {
    method: 'GET',
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function post(url: string, body: any): Promise<any> {
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function put(url: string, body: any): Promise<any> {
  const requestOptions: RequestInit = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function _delete(url: string): Promise<any> {
  const requestOptions: RequestInit = {
    method: 'DELETE',
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function handleResponse(response: Response): Promise<any> {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.message) || response.statusText || 'Error';
      return Promise.reject(error);
    }

    return data;
  });
}
