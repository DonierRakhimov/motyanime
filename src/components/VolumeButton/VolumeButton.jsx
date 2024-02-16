import React from "react";
import { ReactComponent as MuteIcon } from '../../assets/images/no-volume.svg'
import { ReactComponent as LowVolumeIcon } from '../../assets/images/low-volume.svg'
import { ReactComponent as HighVolumeIcon } from '../../assets/images/high-volume.svg'

export default function VolumeButton({ className, muted, volume, onMute }) {
  return (
    <button
      onClick={onMute}
      className={className}
      data-title={
        muted || volume === 0 ? "Включить звук (m)" : "Отключить звук (m)"
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
  );
}
