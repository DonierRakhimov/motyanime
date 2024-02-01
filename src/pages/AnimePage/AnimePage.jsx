import React from "react";
import AnimeInfo from "../../components/AnimeInfo/AnimeInfo";
import s from "./animepage.module.css";
import CommentsList from "../../components/CommentsList/CommentsList";
import { useParams } from "react-router-dom";
import VideoSection from "../../components/VideoSection/VideoSection";
import VideoLoader from "../../components/VideoLoader/VideoLoader";
import isEmpty from "lodash.isempty";
import { useDispatch, useSelector } from "react-redux";
import { loadCurrentAnime } from "../../redux/entities/CurrentAnime/thunks/loadCurrentAnime";
import {
  selectCurrentAnime,
  selectCurrentAnimeStatus,
} from "../../redux/entities/CurrentAnime/selectors";
import { REQUEST_STATUSES } from "../../utils/requestStatuses";

export default function AnimePage() {
  const { animeId } = useParams();
  const currentAnime = useSelector(selectCurrentAnime);
  const loadingStatus = useSelector(selectCurrentAnimeStatus);
  const dispatch = useDispatch();

  let episodesList = {};

  if (!isEmpty(currentAnime)) {
    const {
      player: { list },
    } = currentAnime;
    episodesList = list;
  }

  React.useEffect(() => {
    const controller = new AbortController();

    dispatch(loadCurrentAnime({ signal: controller.signal, animeId }));

    return () => controller.abort();
  }, [dispatch, animeId]);

  return (
    <div className={s.root}>
      {loadingStatus === REQUEST_STATUSES.pending && (
        <VideoLoader></VideoLoader>
      )}
      {loadingStatus === REQUEST_STATUSES.success && !isEmpty(currentAnime) && (
        <>
          <section className={s.animeInfoWrapper}>
            <AnimeInfo anime={currentAnime}></AnimeInfo>
          </section>
          <section className={s.videoSectionWrapper}>
            <VideoSection episodesList={episodesList}></VideoSection>
          </section>
          <section className={s.commentSection}>
            <div className={s.commentGrid}>
              <CommentsList animeId={currentAnime?._id}></CommentsList>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
