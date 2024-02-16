import React from "react";
import { ReactComponent as PipIcon } from "../../assets/images/pip.svg";

export default function PipButton({ className, pipAvailable, onPipClick }) {
  if (!pipAvailable) {
    return;
  }
  return (
    <button
      className={className}
      onClick={onPipClick}
      data-title={"Картинка в картинке (p)"}
    >
      <PipIcon></PipIcon>
    </button>
  );
}
