import React from "react";

const play = ({ playing, setPlaying }) => {
  return (
    <svg
      className="btn btn--play"
      onClick={() => setPlaying(!playing)}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#ff0059"
    >
      <title>play_arrow</title>
      <path d="M8.016 5.016l10.969 6.984-10.969 6.984v-13.969z" />
    </svg>
  );
};

export default play;
