import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useRouteMatch, useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import useAuth from "../common/use-auth";
import { addRating, getRating } from "../../api/ratingApi";
import { addSeen } from "../../api/seenApi";
import ReactPlayer from "react-player";

const MovieDisplay = ({
  movie,
  errors = {},
  rating,
  onChange,
  onSave,
  saving = false,
}) => {
  let auth = useAuth();
  var playing = false;
  var dynamicRating = 1;
  var ratingId = "";
  let mounted = false;

  // const [rating, setRating] = useState(rating);
  useEffect(() => {
    console.log("rating display", rating.rating);
  }, []);

  const playVideo = () => {
    let data = {
      movieId: movie._id,
      userId: auth.user.id,
    };
    addSeen(data).then((res) => {
      console.log("addSeen", res);
    });
  };
  const ratingChanged = (newRating) => {
    console.log(auth.user.id);
    console.log(movie._id);
    let data = {};
    console.log("typeof rating1", typeof rating1);
    //if (1 == 1) {
    data = {
      rating: newRating,
      commentContent: "this is Awesome movie",
      commentTitle: "comment title",
      userId: auth.user.id,
      movieId: movie._id,
    };
    // } else {
    //   data = {
    //     _id: ratingId,
    //     rating: newRating,
    //     commentContent: "this is Awesome movie",
    //     commentTitle: "comment title",
    //     userId: auth.user.id,
    //     movieId: movie._id,
    //   };
    // }
    addRating(data)
      .then((response) => {
        console.log(response);
        // dynamicRating = response.rating;
      })
      .catch((response) => {
        console.log(response);
      });
  };
  return (
    <>
      <h1>Watch full Movie {movie.title} </h1>
      <h2>
        Release Date : {movie.releaseDate} &nbsp;&nbsp; Director :
        {movie.movieDirector}
        <br />
        Category:{movie.category}
      </h2>
      <div>
        <ReactPlayer
          url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          controls
          playing={playing}
          onStart={playVideo}
          width="500px"
          height="300px"
          // url="https://www.youtube.com/watch?v=1y0snTQwk5A"
          //light="https://en.wikipedia.org/wiki/File:Big_buck_bunny_poster_big.jpg"
        />
      </div>
      <div>
        {mounted ? (
          "Loading..."
        ) : (
          <>
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
              value={dynamicRating}
            />
          </>
        )}
      </div>
    </>
  );
};

MovieDisplay.propTypes = {
  movie: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  rating: PropTypes.object,
};

export default MovieDisplay;
