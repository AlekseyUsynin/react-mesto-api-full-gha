export const baseUrl = "https://api.mesto-usynin.nomoredomains.rocks";

const checkResponse = (res) =>
  res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);

export const register = (email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    // credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const authorize = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    // credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const checkToken = () => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};


