import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../common/use-auth";
import ReactPlayer from "react-player";
import {
  seenByUser,
  seenListByUser,
  getMostViewedMovies,
} from "../../api/seenApi";
import { getMovieById, getMovies } from "../../api/movieApi";
export const ShowMovie = ({ movie }) => {
  return (
    <div className="card cardmargin">
      <div className="card-header">
        <h3>Last Seen Movie</h3>
      </div>
      <div className="card-body">
        {movie.hasOwnProperty("title") ? (
          <h3>
            {movie.title}
            {"  "}
            <Link to={"/movie/" + movie._id} className="btn btn-success">
              Watch
            </Link>
          </h3>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export const ShowMovies = ({ movies, header }) => {
  return (
    <div className="card cardmargin">
      <div className="card-header">
        <h3>{header}</h3>
      </div>
      <div className="card-body">
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
                    <Link
                      to={"/movie/" + movie._id}
                      className="btn btn-success"
                    >
                      Watch
                    </Link>
                  </td>
                  <td>{movie.title}</td>
                  <td>{movie.category}</td>
                  <td>{movie.movieDirector}</td>
                  <td>{movie.releaseDate}</td>
                  <td>{movie.averageRating}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const MostPopularMovies = ({ movies }) => {
  return (
    <div className="card cardmargin">
      <div className="card-header">
        <h3>10 most popular movies</h3>
      </div>
      <div className="card-body">
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
                    <Link
                      to={"/movie/" + movie._id}
                      className="btn btn-success"
                    >
                      Watch
                    </Link>
                  </td>
                  <td>{movie.title}</td>
                  <td>{movie.category}</td>
                  <td>{movie.movieDirector}</td>
                  <td>{movie.releaseDate}</td>
                  <td>{movie.averageRating}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const HomePage = () => {
  let auth = useAuth();
  var playing = false;
  const [lastSeen, setlastSeen] = useState({});
  const [PopularMovies, setPopularMovies] = useState([]);
  const [ViewedMovies, setViewedMovies] = useState([]);
  const [UnViewedMovies, setUnViewedMovies] = useState([]);
  const [recommendateMovies, setRecommendateMovies] = useState([]);
  useEffect(() => {
    //Start Last Seen Movie
    seenByUser(auth.user.id).then((res) => {
      getMovieById(res.movieId).then((movieRes) => {
        console.log("home page movie by id ", movieRes);
        setlastSeen(movieRes);

        console.log("movieRes", movieRes);
        getMovies().then((list) => {
          let recomList = list.filter(
            (fil) =>
              fil.category === movieRes.category && fil._id !== movieRes._id
          );
          console.log("recomList", recomList);
          setRecommendateMovies(recomList);
        });
      });
    });
    //End Last Seen Movie
    getMovies().then((res) => {
      console.log("getMovies", res);

      //Start PopularMovies
      let vFulldata = [...res];
      let data = res.sort(function (a, b) {
        return parseFloat(b.averageRating) - parseFloat(a.averageRating);
      });
      const slicedArray = data.slice(0, 9);
      setPopularMovies(slicedArray);
      //End PopularMovies

      //start set viewed movies
      let vFilteredList = [];
      // var vdata = [
      //   { movieId: "62d405c3caf82f1ef0360670", totalCount: 12 },
      //   { movieId: "62d6430f1307ab34147487c4", totalCount: 4 },
      // ];
      getMostViewedMovies().then((vdata) => {
        for (const iterator of vdata) {
          vFilteredList.push(
            vFulldata.filter((fil) => fil._id == iterator.movieId)[0]
          );
        }
        console.log("vFilteredList", vFilteredList);
        setViewedMovies(vFilteredList);
      });

      //End set viewed movies

      //Start Unseen Movies
      let unseenFilteredList = [];
      seenListByUser(auth.user.id).then((seenMovies) => {
        console.log("seenMovies", seenMovies);
        console.log("res", res);
        for (const movie of res) {
          var v = seenMovies.filter((fil) => fil.movieId == movie._id);
          console.log(
            "seenMovies.filter((fil) => fil.movieId == movie.movieId",
            v
          );
          if (!seenMovies.filter((fil) => fil.movieId == movie._id)[0]) {
            unseenFilteredList.push(movie);
          }
        }
        console.log("unseenFilteredList", unseenFilteredList);
        setUnViewedMovies(unseenFilteredList);
      });
      //End Unseen Movies
    });
  }, []);
  return (
    <div className="jumbotron">
      {/* <p className="fs-5 col-md-8">welcome to {auth.user.username}</p> */}
      <div className="display-4">Watch Latest Movies</div>
      <p>
        Join Prime to watch the latest movies, TV shows and award-winning Amazon
        Originals
      </p>
      <ShowMovie movie={lastSeen} />
      <ShowMovies movies={UnViewedMovies} header="New Movies" />
      <ShowMovies movies={recommendateMovies} header="Recommendation Movies" />
      <ShowMovies movies={PopularMovies} header="10 most popular movies" />
      <ShowMovies movies={ViewedMovies} header="10 most viewed movies" />

      <ReactPlayer
        //url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        controls
        playing={playing}
        width="600px"
        height="60%"
        //light="https://en.wikipedia.org/wiki/File:Big_buck_bunny_poster_big.jpg"
      />
      <div>
        <a href="#" className="btn btn-primary btn-lg">
          Learn more
        </a>
      </div>
    </div>
  );
};

export default HomePage;
