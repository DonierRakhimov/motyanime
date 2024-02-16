import React from "react";
import { ReactComponent as PlayIcon } from "../../assets/images/play.svg";
import { ReactComponent as PauseIcon } from "../../assets/images/pause.svg";

export default function PlayButton({ className, playing, onPlay }) {
  return (
    <button
      onClick={onPlay}
      data-title={playing ? "Пауза (k)" : "Смотреть (k)"}
      className={className}
    >
      {playing ? <PauseIcon></PauseIcon> : <PlayIcon></PlayIcon>}
    </button>
  );
}
