import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadMovies, saveMovie } from "../../redux/actions/movieActions";
import { loadRating, saveRating } from "../../redux/actions/ratingActions";
import PropTypes from "prop-types";
import MovieDisplay from "./MovieDisplay";
import { newMovie } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import useAuth from "../common/use-auth";

function ManageMoviePage({
  movies,
  authors,
  loadMovies,
  loadRating,
  saveMovie,
  history,
  ...props
}) {
  const [rating, setRating] = useState({ ...props.rating });
  const [movie, setMovie] = useState({ ...props.movie });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  let auth = useAuth();
  useEffect(() => {
    if (movies.length === 0) {
      loadMovies().catch((error) => {
        alert("Loading movies failed" + error);
      });
    } else {
      setMovie({ ...props.movie });
    }

    console.log("rating page", rating);

    if (!rating.hasOwnProperty("_id")) {
      console.log("movie._id, auth.user.id", movie._id, auth.user.id);
      loadRating(movie._id, auth.user.id).catch((error) => {
        alert("loadRating failed" + error);
      });
    } else {
      setRating({ ...props.rating });
    }
  }, [props.movie]);

  function handleChange(event) {
    const { name, value } = event.target;
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  }

  function formIsValid() {
    const { title, authorId, category } = movie;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveMovie(movie)
      .then(() => {
        toast.success("Movie saved.");
        history.push("/movies");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return movies.length === 0 ? (
    <Spinner />
  ) : (
    <MovieDisplay
      movie={movie}
      errors={errors}
      rating={rating}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageMoviePage.propTypes = {
  movie: PropTypes.object.isRequired,
  movies: PropTypes.array.isRequired,
  loadMovies: PropTypes.func.isRequired,
  saveMovie: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getMovieById(movies, id) {
  return movies.find((movie) => movie._id === id) || null;
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  const movie =
    id && state.movies.length > 0 ? getMovieById(state.movies, id) : newMovie;
  return {
    movie,
    movies: state.movies,
    rating: state.rating.length > 0 ? state.rating[0] : {},
  };
}

const mapDispatchToProps = {
  loadMovies,
  loadRating,
  saveMovie,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageMoviePage);
