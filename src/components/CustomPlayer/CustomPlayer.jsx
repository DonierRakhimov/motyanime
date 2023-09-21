import React from 'react';
import ReactPlayer from 'react-player';
import s from './customplayer.module.css';
import { ReactComponent as PlayIcon } from '../../assets/images/play.svg';
import { ReactComponent as PauseIcon } from '../../assets/images/pause.svg';
import { ReactComponent as MuteIcon } from '../../assets/images/no-volume.svg';
import { ReactComponent as LowVolumeIcon } from '../../assets/images/low-volume.svg';
import { ReactComponent as HighVolumeIcon } from '../../assets/images/high-volume.svg';
import { ReactComponent as PipIcon } from '../../assets/images/pip.svg';
import { ReactComponent as ExpandIcon } from '../../assets/images/expand.svg';
import { ReactComponent as NarrowIcon } from '../../assets/images/narrow.svg';
import { ReactComponent as SettingsIcon } from '../../assets/images/settings.svg';
import { ReactComponent as BufferIcon } from '../../assets/images/buffer.svg';
import { formatTime } from '../../utils/formatTime';
import Slider from 'rc-slider';
import { playPauseAnimation } from '../../utils/playPauseAnimation';
import debounce from 'lodash.debounce';
import isEmpty from 'lodash.isempty';
import DropDown from '../Dropdown/Dropdown';
import { anilibriaCache } from '../../utils/baseUrls';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { selectSearchPopupIsOpen } from '../../redux/UI/SearchPopup/selectors';
import { selectCommentFormFocus } from '../../redux/UI/commentFormFocus/selectors';

const getFirstWorkingLink = (episodeData) => {
  let firstWorkingLink;
  for (let quality in episodeData) {
    const qualityLink = episodeData[quality];
    if (qualityLink) {
      firstWorkingLink = anilibriaCache + qualityLink;
      break;
    }
  }
  return firstWorkingLink;
};

export default function CustomPlayer({ episodeData = {} }) {
  const [playing, setPlaying] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [elapsedTime, setElapsedTime] = React.useState(0);
  const [seekTooltipValue, setSeekTooltipValue] = React.useState(0);
  const [muted, setMuted] = React.useState(true);
  const [volume, setVolume] = React.useState(0);
  const [savedVolume, setSavedVolume] = React.useState(0.5);
  const [fullScreen, setFullScreen] = React.useState(false);
  const [pipAvailable, setPipAvailable] = React.useState(true);
  const [pip, setPip] = React.useState(false);
  const [controlsVisible, setControlsVisible] = React.useState(true);
  const [buffering, setBuffering] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [currentUrl, setCurrentUrl] = React.useState('');
  const videoRef = React.useRef(null);
  const playPauseAnimationRef = React.useRef(null);
  const animationRef = React.useRef(null);
  const playerContainerRef = React.useRef(null);
  const searchPopupIsOpen = useSelector(selectSearchPopupIsOpen);
  const commentFormFocus = useSelector(selectCommentFormFocus);

  const handlePlayPause = () => {
    setPlaying((prev) => !prev);
    animationRef.current.cancel();
    animationRef.current.play();
  };

  const setDurationFunc = (duration) => {
    setDuration(Math.floor(duration));
  };

  const updateTimeFunc = ({ playedSeconds }) => {
    setElapsedTime(Math.floor(playedSeconds));
  };

  const handleSeek = (value) => {
    setElapsedTime(value);
    setSeekTooltipValue(value);
    videoRef.current.seekTo(value, 'seconds');
  };

  const handleProgressTooltip = (e) => {
    if (e.target.classList.contains('rc-slider-handle')) {
      return setSeekTooltipValue(elapsedTime);
    }
    const { left } = e.currentTarget.getBoundingClientRect();
    const { clientX } = e;
    const tooltipValue = Math.floor(
      ((clientX - left) / e.currentTarget.clientWidth) * duration
    );
    setSeekTooltipValue(tooltipValue);
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
  }, [muted, savedVolume, volume]);

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

  const handleVideoClick = (e) => {
    if (e.target.closest(`.${s.videoControls}`)) {
      return;
    }
    handlePlayPause();
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
      alert('Ваш браузер не поддерживает полноэкранный режим...');
    }
  };

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
        document.addEventListener('mousemove', hideControlsOnMouseMove);
      } else if (document.webkitFullscreenElement) {
        setFullScreen(true);
        hideControlsDebounce();
        document.addEventListener('mousemove', hideControlsOnMouseMove);
      } else {
        setFullScreen(false);
        document.removeEventListener('mousemove', hideControlsOnMouseMove);
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () =>
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
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

  React.useEffect(() => {
    const keyboardShortcuts = (event) => {
      const { key } = event;
      switch (key) {
        case 'k':
          handlePlayPause();
          break;
        case ' ': {
          event.preventDefault();
          handlePlayPause();
          break;
        }
        case 'm':
          handleMute();
          break;
        case 'f':
          handleFullScreenClick();
          break;
        case 'p':
          if (pipAvailable) handlePipClick();
          break;
        case 'ArrowLeft':
          handleSeek(elapsedTime - 5);
          break;
        case 'ArrowRight':
          handleSeek(elapsedTime + 5);
          break;
        default:
          return;
      }
    };

    if (!searchPopupIsOpen && !commentFormFocus) {
      document.addEventListener('keydown', keyboardShortcuts);
    }

    return () => document.removeEventListener('keydown', keyboardShortcuts);
  }, [elapsedTime, searchPopupIsOpen, pipAvailable, handleMute, commentFormFocus]);

  const handleSettingsClick = () => {
    setSettingsOpen((prev) => !prev);
  };

  const handleQualityChange = (qualityLink) => {
    setCurrentUrl(anilibriaCache + qualityLink);
    setSettingsOpen(false);
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
    <div
      className={s.playerContainer}
      ref={playerContainerRef}
      onMouseMove={() => {
        setControlsVisible(true);
      }}
      onMouseLeave={() => {
        if (!playing) return;
        setControlsVisible(false);
      }}
    >
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
        width='100%'
        height='100%'
        pip={pip}
        onDisablePIP={() => {
          setPip(false);
          setPlaying(false);
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      ></ReactPlayer>
      <div className={s.customPlayer} onClick={handleVideoClick}>
        {buffering ? (
          <div className={s.bufferingAnimation}>
            <BufferIcon></BufferIcon>
          </div>
        ) : (
          <div ref={playPauseAnimationRef} className={s.playPauseAnimation}>
            {playing ? <PlayIcon></PlayIcon> : <PauseIcon></PauseIcon>}
          </div>
        )}
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
                railStyle={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#d4d4d4',
                  borderRadius: '10px',
                }}
                trackStyle={{
                  position: 'relative',
                  zIndex: 2,
                  height: '100%',
                  backgroundColor: '#a958a5',
                  borderRadius: '10px',
                }}
                handleStyle={{
                  position: 'absolute',
                  zIndex: 3,
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#a958a5',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '50%',
                }}
              ></Slider>
            </div>
            <div className={s.bottomControls}>
              <div className={s.leftControls}>
                <button
                  data-title={playing ? 'Пауза (k)' : 'Смотреть (k)'}
                  className={s.playPauseBtn}
                  onClick={handlePlayPause}
                >
                  {playing ? <PauseIcon></PauseIcon> : <PlayIcon></PlayIcon>}
                </button>
                <div className={s.volumeContainer}>
                  <button
                    onClick={handleMute}
                    className={s.volumeBtn}
                    data-title={
                      muted || volume === 0
                        ? 'Включить звук (m)'
                        : 'Отключить звук (m)'
                    }
                  >
                    {muted || volume === 0 ? (
                      <MuteIcon></MuteIcon>
                    ) : volume <= 0.5 ? (
                      <LowVolumeIcon></LowVolumeIcon>
                    ) : (
                      <HighVolumeIcon></HighVolumeIcon>
                    )}
                  </button>
                  <div className={s.volumeWrapper}>
                    <Slider
                      className={s.volumeRange}
                      min={0}
                      max={1}
                      step={0.01}
                      value={volume}
                      onChange={handleVolumeChange}
                      railStyle={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#d4d4d4',
                        borderRadius: '10px',
                      }}
                      trackStyle={{
                        position: 'relative',
                        zIndex: 2,
                        height: '100%',
                        backgroundColor: '#a958a5',
                        borderRadius: '10px',
                      }}
                      handleStyle={{
                        position: 'absolute',
                        zIndex: 3,
                        width: '15px',
                        height: '15px',
                        backgroundColor: '#a958a5',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '50%',
                      }}
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
                  <DropDown className={s.settingsPopup} isOpen={settingsOpen}>
                    {Object.keys(episodeData).map((quality, index) => {
                      let qualityString;
                      if (episodeData[quality]) {
                        if (quality === 'fhd') qualityString = '1080p';
                        if (quality === 'hd') qualityString = '720p';
                        if (quality === 'sd') qualityString = '480p';
                      }
                      return (
                        qualityString && (
                          <button
                            key={index}
                            className={classNames(
                              s.qualityBtn,
                              currentUrl.includes(episodeData[quality]) &&
                                s.active
                            )}
                            onClick={() =>
                              handleQualityChange(episodeData[quality])
                            }
                          >
                            {qualityString}
                          </button>
                        )
                      );
                    })}
                  </DropDown>
                  <button
                    className={s.settingsBtn}
                    onClick={handleSettingsClick}
                  >
                    <SettingsIcon></SettingsIcon>
                  </button>
                </div>
                {pipAvailable && (
                  <button
                    className={s.pipBtn}
                    onClick={handlePipClick}
                    data-title={'Картинка в картинке (p)'}
                  >
                    <PipIcon></PipIcon>
                  </button>
                )}
                <button
                  className={s.fullScreenBtn}
                  onClick={handleFullScreenClick}
                  data-title={
                    fullScreen
                      ? 'Выйти из полноэкранного режима (f)'
                      : 'Во весь экран (f)'
                  }
                >
                  {fullScreen ? (
                    <NarrowIcon></NarrowIcon>
                  ) : (
                    <ExpandIcon></ExpandIcon>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
