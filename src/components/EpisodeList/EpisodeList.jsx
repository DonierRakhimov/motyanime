import React from "react";
import s from "./episodelist.module.css";
import EpisodeItem from "../EpisodeItem/EpisodeItem";
import isEmpty from "lodash.isempty";

export default function EpisodeList({
  episodeList = [],
  currentEpisode,
  onEpisodeClick = () => {
    return;
  },
}) {
  if (isEmpty(episodeList)) {
    return;
  }
  return (
    <ul className={s.episodeList}>
      {episodeList.map((episode) => (
        <li key={episode} className={s.episodeWrapper}>
          <EpisodeItem
            isActive={episode === currentEpisode}
            episodeName={`${episode} серия`}
            onEpisodeClick={() => onEpisodeClick(episode)}
          ></EpisodeItem>
        </li>
      ))}
    </ul>
  );
}
