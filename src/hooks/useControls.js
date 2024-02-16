import React from "react";

export const useControls = ({
  onPlay,
  onMute,
  onFullScreen,
  onPip,
  pipAvailable,
  onSeekLeft,
  onSeekRight,
  controlsAvailable = false,
}) => {
  React.useEffect(() => {
    const keyboardShortcuts = (event) => {
      const { key } = event;
      switch (key) {
        case "k":
          onPlay();
          break;
        case " ": {
          event.preventDefault();
          onPlay();
          break;
        }
        case "m":
          onMute();
          break;
        case "f":
          onFullScreen();
          break;
        case "p":
          if (pipAvailable) onPip();
          break;
        case "ArrowLeft":
          onSeekLeft();
          break;
        case "ArrowRight":
          onSeekRight();
          break;
        default:
          return;
      }
    };

    if (controlsAvailable) {
      document.addEventListener("keydown", keyboardShortcuts);
    }

    return () => document.removeEventListener("keydown", keyboardShortcuts);
  }, [
    onPlay,
    onMute,
    onFullScreen,
    onPip,
    pipAvailable,
    onSeekLeft,
    onSeekRight,
    controlsAvailable,
  ]);
};
