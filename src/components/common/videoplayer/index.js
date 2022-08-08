import React from "react";
import ReactDOM from "react-dom";
import ReactPlayer from "react-player";

import Controls from "./controls";
// import Controls2 from "./controls2";
import "./styles.css";

const App = () => {
  const [playing, setPlaying] = React.useState(false);
  // const refWrapper = React.useRef(undefined);

  return (
    <div className="wrapper">
      <ReactPlayer
        url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        controls
        playing={playing}
        width="100%"
        height="100%"
      />
      {/* <Controls2 playing={playing} setPlaying={setPlaying} /> */}
      {/* <Controls playing={playing} setPlaying={setPlaying} /> */}
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
