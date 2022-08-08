import React from "react";
import Pause from "./pause";
import Play from "./play";

let animTimeout = undefined;
// let isNotCompleted = true;
const Controls2 = ({ playing, setPlaying }) => {
  const [animated, setAnimated] = React.useState(false);

  const btnToggleAnimate = () => {
    // console.log(animTimeout);
    // console.log(isNotCompleted);
    // if (animTimeout && isNotCompleted) {
    //   setAnimated(playing);
    //   isNotCompleted = true;
    //   console.log("kk");
    //   clearTimeout(animTimeout);
    //   animTimeout = undefined;
    // }

    const btntest = document.querySelector(".btn");

    btntest.classList.forEach(item => {
      if (item === "btn--play") {
        btntest.classList.add("btn--animated-zoomOut");
      } else if (item === "btn--pause") {
        btntest.classList.add("btn--animated-zoom");
      }
    });

    setPlaying(!playing);

    animTimeout = setTimeout(() => {
      setAnimated(!playing);
      // isNotCompleted = false;
      // setAnimated(!playing);
    }, 1000);
    // animTimeout;
  };

  // console.log("Redner");
  return (
    <div className="controls" onClick={btnToggleAnimate}>
      {animated ? (
        <Pause playing={playing} setPlaying={setPlaying} />
      ) : (
        <Play playing={playing} setPlaying={setPlaying} />
      )}
    </div>
  );
};

export default Controls2;