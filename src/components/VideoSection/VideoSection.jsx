import React from "react";
import s from "./videosection.module.css";
import CustomPlayer from "../CustomPlayer/CustomPlayer";
import EpisodeList from "../EpisodeList/EpisodeList";
import isEmpty from "lodash.isempty";

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
    // тут вообще следовало бы отразить какой-то UI который бы сказал что серий нету
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
          <CustomPlayer episodeData={episodeData}></CustomPlayer>
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
