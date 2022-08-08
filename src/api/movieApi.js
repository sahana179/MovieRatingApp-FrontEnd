import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/api/movie/";

export function getMovies() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
export function getMovieById(movieId) {
  console.log("getMovieById", movieId);
  return fetch(baseUrl + movieId)
    .then(handleResponse)
    .catch(handleError);
}

export function saveMovie(movie) {
  return fetch(baseUrl + (movie.id || ""), {
    method: movie.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(movie),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteMovie(movieId) {
  return fetch(baseUrl + movieId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
