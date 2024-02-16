import React from "react";
import { ReactComponent as ExpandIcon } from "../../assets/images/expand.svg";
import { ReactComponent as NarrowIcon } from "../../assets/images/narrow.svg";

export default function FullScreenButton({
  className,
  onFullScreen,
  fullScreen = false,
}) {
  return (
    <button
      onClick={onFullScreen}
      className={className}
      data-title={
        fullScreen ? "Выйти из полноэкранного режима (f)" : "Во весь экран (f)"
      }
    >
      {fullScreen ? <NarrowIcon></NarrowIcon> : <ExpandIcon></ExpandIcon>}
    </button>
  );
}
