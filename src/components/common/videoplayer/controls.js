import React from "react";
import Pause from "./pause";
import Play from "./play";

const Controls = ({ playing, setPlaying }) => {
  const [animated, setAnimated] = React.useState(false);
  // const
  let animTimeout = undefined;

  const btnToggleAnimate = () => {
    console.log(!playing);
    console.log(animated);
    console.log("");

    if (animTimeout) {
      clearTimeout(animTimeout);
      animTimeout = undefined;
    }

    const btn = document.querySelector(".btn");
    btn.classList.add("btn--animated-zoom");

    setPlaying(!playing);

    animTimeout = setTimeout(() => {
      setAnimated(!playing);
    }, 500);
  };

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

export default Controls;
