import React from "react";
import { ReactComponent as SettingsIcon } from "../../assets/images/settings.svg";
import classNames from "classnames";
import s from './settingsbutton.module.css';
import DropDown from "../Dropdown/Dropdown";

export default function SettingsButton({ currentUrl, episodeData, onQualityChange }) {
  const [settingsOpen, setSettingsOpen] = React.useState(false);

  const handleSettingsClick = () => {
    setSettingsOpen((prev) => !prev);
  };

  return (
    <>
      <DropDown className={s.settingsPopup} isOpen={settingsOpen}>
        {Object.keys(episodeData).map((quality, index) => {
          let qualityString;
          if (episodeData[quality]) {
            if (quality === "fhd") qualityString = "1080p";
            if (quality === "hd") qualityString = "720p";
            if (quality === "sd") qualityString = "480p";
          }
          return (
            qualityString && (
              <button
                key={index}
                className={classNames(
                  s.qualityBtn,
                  currentUrl.includes(episodeData[quality]) && s.active
                )}
                onClick={() => {
                  setSettingsOpen(false);
                  onQualityChange(episodeData[quality])
                }}
              >
                {qualityString}
              </button>
            )
          );
        })}
      </DropDown>
      <button className={s.settingsBtn} onClick={handleSettingsClick}>
        <SettingsIcon></SettingsIcon>
      </button>
    </>
  );
}
