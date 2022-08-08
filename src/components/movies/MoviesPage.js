import React from "react";
import { connect } from "react-redux";
import * as movieActions from "../../redux/actions/movieActions";
import * as ratingActions from "../../redux/actions/ratingActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import MovieList from "./MovieList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class MoviesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false,
  };

  componentDidMount() {
    const { movies, actions } = this.props;
    if (movies.length === 0) {
      actions.loadMovies().catch((error) => {
        alert("Loading movies failed" + error);
      });
    }
  }

  // handleDeleteCourse = async (course) => {
  //   toast.success("Course deleted");
  //   try {
  //     await this.props.actions.deleteCourse(course);
  //   } catch (error) {
  //     toast.error("Delete failed. " + error.message, { autoClose: false });
  //   }
  // };

  render() {
    return (
      <>
        {/* {this.state.redirectToAddCoursePage && <Redirect to="/movie" />} */}
        <h2>Movies</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <MovieList movies={this.props.movies} />
          </>
        )}
      </>
    );
  }
}

MoviesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    movies:
      state.movies.length === 0
        ? []
        : state.movies.map((movie) => {
            return {
              ...movie,
            };
          }),
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadMovies: bindActionCreators(movieActions.loadMovies, dispatch),
      loadRating: bindActionCreators(ratingActions.loadRating, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesPage);
