import React from "react";
import s from "./videosection.module.css";
import EpisodeList from "../EpisodeList/EpisodeList";
import isEmpty from "lodash.isempty";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

export default function VideoSection({ episodesList = {} }) {
  const episodesArray = React.useMemo(
    () => Object.keys(episodesList),
    [episodesList]
  );

  const [currentEpisode, setCurrentEpisode] = React.useState(episodesArray[0]);

  React.useEffect(() => {
    if (!isEmpty(episodesArray)) {
      setCurrentEpisode(episodesArray[0]);
    }
  }, [episodesArray]);

  if (isEmpty(episodesArray)) {
    return;
  }

  const { hls: episodeData } = episodesList[currentEpisode];

  const handleEpisodeChange = (episodeIndex) => {
    setCurrentEpisode(episodeIndex);
  };

  return (
    <div>
      <div className={s.sectionContainer}>
        <div className={s.playerWrapper}>
          <VideoPlayer episodeData={episodeData}></VideoPlayer>
        </div>
        <div className={s.listWrapper}>
          <EpisodeList
            onEpisodeClick={handleEpisodeChange}
            episodeList={episodesArray}
            currentEpisode={currentEpisode}
          ></EpisodeList>
        </div>
      </div>
    </div>
  );
}
