import { handleResponse, handleError } from "./apiUtils";
//const baseUrl = process.env.API_URL + "/api/movie/";
let baseUrl = "http://localhost:8080/api/";

export function addSeen(data) {
  return fetch(baseUrl + "seen-movies", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function seenByUser(userid) {
  return fetch(baseUrl + "last-seen-by-user/" + userid, {
    method: "GET",
    headers: { "content-type": "application/json" },
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getMostViewedMovies() {
  return fetch(baseUrl + "most-viewed", {
    method: "GET",
    headers: { "content-type": "application/json" },
  })
    .then(handleResponse)
    .catch(handleError);
}

export function seenListByUser(userid) {
  return fetch(baseUrl + "seen-movies?userId=" + userid, {
    method: "GET",
    headers: { "content-type": "application/json" },
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteMovie(movieId) {
  return fetch(baseUrl + movieId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
