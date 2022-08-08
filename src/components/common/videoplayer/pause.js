import React from "react";

const pause = ({ playing, setPlaying }) => (
  <svg
    className="btn btn--pause"
    onClick={() => setPlaying(!playing)}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="#ff0059"
  >
    <title>pause</title>
    <path d="M14.016 5.016h3.984v13.969h-3.984v-13.969zM6 18.984v-13.969h3.984v13.969h-3.984z" />
  </svg>
);

export default pause;
