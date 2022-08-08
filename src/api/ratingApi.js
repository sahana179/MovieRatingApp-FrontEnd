import { handleResponse, handleError } from "./apiUtils";
//const baseUrl = process.env.API_URL + "/api/movie/";
const baseUrl = "http://localhost:8082/api/rating";

export function addRating(data) {
  console.log("data._id", data._id);

  let _method = "PUT";
  if (data.hasOwnProperty("_id")) {
    _method = "PUT";
  } else {
    _method = "POST";
  }
  console.log("rating api data", data);
  return fetch(baseUrl, {
    method: _method,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getRating(movieid, userid) {
  console.log("getRating ", movieid, userid);
  return fetch(baseUrl + "/" + movieid + "/" + userid, {
    method: "GET",
    headers: { "content-type": "application/json" },
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteRating(ratingId) {
  return fetch(baseUrl + ratingId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
