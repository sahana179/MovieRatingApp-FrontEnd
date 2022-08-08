import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const MovieList = ({ movies }) => {
  useEffect(() => {
    console.log("movies", movies);
  });
  return (
    <table className="table">
      <thead>
        <tr>
          <th />
          <th>Title</th>
          <th>Category</th>
          <th>Movie Director</th>
          <th>Release Date</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => {
          return (
            <tr key={movie._id}>
              <td>
                <Link to={"/movie/" + movie._id} className="btn btn-success">
                  Watch
                </Link>
              </td>
              <td>{movie.title}</td>
              <td>{movie.category}</td>
              <td>{movie.movieDirector}</td>
              <td>{movie.releaseDate}</td>
              <td>
                <ReactStars
                  count={5}
                  size={24}
                  activeColor="#ffd700"
                  value={movie.averageRating}
                  edit={false}
                  isHalf={true}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

MovieList.propTypes = {
  // movies: PropTypes.array.isRequired,
  // onDeleteClick: PropTypes.func.isRequired,
};

export default MovieList;
