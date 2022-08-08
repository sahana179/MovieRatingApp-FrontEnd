import { handleResponse, handleError } from "./apiUtils";
//const baseUrl = process.env.API_URL + "/api/movie/";
const baseUrl = "http://localhost:8080/api/authenticate";

export function authenticateUser(data) {
  return fetch(baseUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteMovie(movieId) {
  return fetch(baseUrl + movieId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
