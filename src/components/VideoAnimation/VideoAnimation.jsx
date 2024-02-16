import React from 'react'
import s from './videoanimation.module.css';
import { ReactComponent as PlayIcon } from "../../assets/images/play.svg";
import { ReactComponent as PauseIcon } from "../../assets/images/pause.svg";
import { ReactComponent as BufferIcon } from "../../assets/images/buffer.svg";

export default function VideoAnimation({ buffering, playing, playPauseAnimationRef }) {
  return (
    buffering ? (
        <div className={s.bufferingAnimation}>
          <BufferIcon></BufferIcon>
        </div>
      ) : (
        <div ref={playPauseAnimationRef} className={s.playPauseAnimation}>
          {playing ? <PlayIcon></PlayIcon> : <PauseIcon></PauseIcon>}
        </div>
      )
  )
}
