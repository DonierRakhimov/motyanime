import React from "react";
import ReactPlayer from "react-player";
import s from "./videoplayer.module.css";
import isEmpty from "lodash.isempty";
import CustomPlayer from "../CustomPlayer/CustomPlayer";

const getFirstWorkingLink = (episodeData) => {
  let firstWorkingLink;
  for (let quality in episodeData) {
    const qualityLink = episodeData[quality];
    if (qualityLink) {
      firstWorkingLink = qualityLink;
      break;
    }
  }
  return firstWorkingLink;
};

export default function VideoPlayer({ episodeData = {} }) {
  const [playing, setPlaying] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [elapsedTime, setElapsedTime] = React.useState(0);
  const [muted, setMuted] = React.useState(true);
  const [volume, setVolume] = React.useState(0);
  const [pip, setPip] = React.useState(false);
  const [buffering, setBuffering] = React.useState(false);
  const [currentUrl, setCurrentUrl] = React.useState("");
  const videoRef = React.useRef(null);
  const playerContainerRef = React.useRef(null);

  const setDurationFunc = (duration) => {
    setDuration(Math.floor(duration));
  };

  const updateTimeFunc = ({ playedSeconds }) => {
    setElapsedTime(Math.floor(playedSeconds));
  };

  const handleFullScreenClick = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (document.webkitFullscreenElement) {
      document.webkitExitFullscreen();
    } else if (playerContainerRef.current.requestFullscreen) {
      playerContainerRef.current.requestFullscreen();
    } else if (playerContainerRef.current.webkitRequestFullscreen) {
      playerContainerRef.current.webkitRequestFullscreen();
    } else {
      alert("Ваш браузер не поддерживает полноэкранный режим...");
    }
  };

  const handleQualityChange = (qualityLink) => {
    setCurrentUrl(qualityLink);
  };

  React.useLayoutEffect(() => {
    if (!isEmpty(episodeData)) {
      setCurrentUrl(getFirstWorkingLink(episodeData));
    }
  }, [episodeData]);

  if (isEmpty(episodeData)) {
    return;
  }

  return (
    <div className={s.playerContainer} ref={playerContainerRef}>
      <ReactPlayer
        ref={videoRef}
        playing={playing}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onDuration={setDurationFunc}
        onProgress={updateTimeFunc}
        onBuffer={() => setBuffering(true)}
        onBufferEnd={() => setBuffering(false)}
        muted={muted}
        volume={volume}
        url={currentUrl}
        width="100%"
        height="100%"
        pip={pip}
        onDisablePIP={() => {
          setPip(false);
          setPlaying(false);
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      ></ReactPlayer>
      <CustomPlayer
        pip={pip}
        currentUrl={currentUrl}
        episodeData={episodeData}
        onQualityChange={handleQualityChange}
        setElapsedTime={setElapsedTime}
        videoRef={videoRef}
        duration={duration}
        muted={muted}
        setMuted={setMuted}
        volume={volume}
        setVolume={setVolume}
        buffering={buffering}
        elapsedTime={elapsedTime}
        playing={playing}
        setPlaying={setPlaying}
        setPip={setPip}
        onFullScreen={handleFullScreenClick}
      ></CustomPlayer>
    </div>
  );
}
