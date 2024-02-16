import React from "react";
import s from "./customplayer.module.css";
import { formatTime } from "../../utils/formatTime";
import Slider from "rc-slider";
import { playPauseAnimation } from "../../utils/playPauseAnimation";
import { debounce } from "../../utils/debounce";
import { useSelector } from "react-redux";
import { selectSearchPopupIsOpen } from "../../redux/UI/SearchPopup/selectors";
import { selectCommentFormFocus } from "../../redux/UI/commentFormIsFocused/selectors";
import PlayButton from "../PlayButton/PlayButton";
import VolumeButton from "../VolumeButton/VolumeButton";
import SettingsButton from "../SettingsButton/SettingsButton";
import PipButton from "../PipButton/PipButton";
import FullScreenButton from "../FullScreenButton/FullScreenButton";
import VideoAnimation from "../VideoAnimation/VideoAnimation";
import {
  VIDEO_SLIDER_STYLES,
  VOLUME_SLIDER_STYLES,
} from "../../utils/sliderStyles";
import { useControls } from "../../hooks/useControls";

export default function CustomPlayer({
  episodeData,
  onQualityChange,
  currentUrl,
  duration,
  elapsedTime,
  setElapsedTime,
  videoRef,
  muted,
  setMuted,
  volume,
  setVolume,
  buffering,
  playing,
  setPlaying,
  fullscreen,
  onFullScreen,
  pip,
  setPip,
}) {
  const [fullScreen, setFullScreen] = React.useState(false);
  const [controlsVisible, setControlsVisible] = React.useState(true);
  const [seekTooltipValue, setSeekTooltipValue] = React.useState(0);
  const playPauseAnimationRef = React.useRef(null);
  const animationRef = React.useRef(null);
  const [pipAvailable, setPipAvailable] = React.useState(true);
  const [savedVolume, setSavedVolume] = React.useState(0.5);
  const searchPopupIsOpen = useSelector(selectSearchPopupIsOpen);
  const commentFormFocus = useSelector(selectCommentFormFocus);

  const handleProgressTooltip = (e) => {
    if (e.target.classList.contains("rc-slider-handle")) {
      return setSeekTooltipValue(elapsedTime);
    }

    const { left } = e.currentTarget.getBoundingClientRect();
    const { clientX } = e;
    const tooltipValue = Math.floor(
      ((clientX - left) / e.currentTarget.clientWidth) * duration
    );

    setSeekTooltipValue(tooltipValue);
  };

  const handlePlayPause = () => {
    setPlaying((prev) => !prev);
    animationRef.current.cancel();
    animationRef.current.play();
  };

  const handleVideoClick = (e) => {
    if (e.target.closest(`.${s.videoControls}`)) {
      return;
    }
    handlePlayPause();
  };

  const handleSeek = (value) => {
    setElapsedTime(value);
    setSeekTooltipValue(value);
    videoRef.current.seekTo(value, "seconds");
  };

  const handleVolumeChange = (value) => {
    if (muted) {
      setMuted(false);
    }

    if (value === 0) {
      setMuted(true);
      setSavedVolume(0.5);
    }

    setVolume(value);
  };

  const handleMute = React.useCallback(() => {
    if (muted) {
      setMuted(false);
      setVolume(savedVolume);
    } else {
      setMuted(true);
      setSavedVolume(volume);
      setVolume(0);
    }
    return;
  }, [muted, savedVolume, volume, setMuted, setVolume]);

  React.useEffect(() => {
    if (playPauseAnimationRef.current) {
      animationRef.current = playPauseAnimationRef.current.animate(
        playPauseAnimation,
        {
          duration: 500,
        }
      );
      animationRef.current.cancel();
    }
  }, []);

  const hideControlsDebounce = React.useCallback(
    debounce(() => setControlsVisible(false), 3000),
    []
  );

  React.useEffect(() => {
    const hideControlsOnMouseMove = () => {
      setControlsVisible(true);
      hideControlsDebounce();
    };

    const handleFullScreenChange = () => {
      if (document.fullscreenElement) {
        setFullScreen(true);
        hideControlsDebounce();
        document.addEventListener("mousemove", hideControlsOnMouseMove);
      } else if (document.webkitFullscreenElement) {
        setFullScreen(true);
        hideControlsDebounce();
        document.addEventListener("mousemove", hideControlsOnMouseMove);
      } else {
        setFullScreen(false);
        document.removeEventListener("mousemove", hideControlsOnMouseMove);
      }
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
  }, [hideControlsDebounce]);

  React.useEffect(() => {
    if (!document.pictureInPictureEnabled) {
      setPipAvailable(false);
    }
  }, []);

  const handlePipClick = () => {
    if (document.pictureInPictureElement) {
      setPip(false);
    } else setPip(true);
  };

  const controlsAvailable = !searchPopupIsOpen && !commentFormFocus;

  useControls({
    onPlay: handlePlayPause,
    onMute: handleMute,
    onFullScreen,
    pipAvailable,
    onPip: handlePipClick,
    onSeekLeft: () => handleSeek(elapsedTime - 5),
    onSeekRight: () => handleSeek(elapsedTime + 5),
    controlsAvailable,
  });

  return (
    <div
      className={s.customPlayer}
      onClick={handleVideoClick}
      onMouseMove={() => {
        setControlsVisible(true);
      }}
      onMouseLeave={() => {
        if (!playing) return;
        setControlsVisible(false);
      }}
    >
      <VideoAnimation
        buffering={buffering}
        playing={playing}
        playPauseAnimationRef={playPauseAnimationRef}
      />
      {controlsVisible && (
        <div className={s.videoControls}>
          <div
            className={s.progressWrapper}
            data-title={formatTime(seekTooltipValue)}
            onMouseMove={handleProgressTooltip}
          >
            <Slider
              className={s.videoProgress}
              value={elapsedTime}
              onChange={handleSeek}
              min={0}
              step={1}
              max={duration}
              railStyle={VIDEO_SLIDER_STYLES.railStyle}
              trackStyle={VIDEO_SLIDER_STYLES.trackStyle}
              handleStyle={VIDEO_SLIDER_STYLES.handleStyle}
            ></Slider>
          </div>
          <div className={s.bottomControls}>
            <div className={s.leftControls}>
              <PlayButton
                className={s.playPauseBtn}
                playing={playing}
                onPlay={handlePlayPause}
              ></PlayButton>
              <div className={s.volumeBtnWrapper}>
                <VolumeButton
                  onMute={handleMute}
                  muted={muted}
                  volume={volume}
                ></VolumeButton>
                <div className={s.volumeWrapper}>
                  <Slider
                    className={s.volumeRange}
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={handleVolumeChange}
                    railStyle={VOLUME_SLIDER_STYLES.railStyle}
                    trackStyle={VOLUME_SLIDER_STYLES.trackStyle}
                    handleStyle={VOLUME_SLIDER_STYLES.handleStyle}
                  ></Slider>
                </div>
              </div>
              <div className={s.timeContainer}>
                <span className={s.time}>{formatTime(elapsedTime)}</span>/
                <span className={s.time}>{formatTime(duration)}</span>
              </div>
            </div>
            <div className={s.rightControls}>
              <div className={s.settingsWrapper}>
                <SettingsButton
                  currentUrl={currentUrl}
                  episodeData={episodeData}
                  onQualityChange={onQualityChange}
                ></SettingsButton>
              </div>
              <PipButton
                onPipClick={handlePipClick}
                pipAvailable={pipAvailable}
              />
              <FullScreenButton
                className={s.fullScreenBtn}
                onFullScreen={onFullScreen}
                fullScreen={fullScreen}
              ></FullScreenButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
