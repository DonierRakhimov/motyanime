import React from 'react';
import AnimeInfo from '../../components/AnimeInfo/AnimeInfo';
import s from './animepage.module.css';
import CommentsList from '../../components/CommentsList/CommentsList';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../utils/axiosOptions';
import { youtubeBase } from '../../utils/baseUrls';
import VideoSection from '../../components/VideoSection/VideoSection';
import VideoLoader from '../../components/VideoLoader/VideoLoader';
import isEmpty from 'lodash.isempty';

export default function AnimePage() {
  const { animeId } = useParams();
  const [title, setTitle] = React.useState({});
  const [loadingStatus, setLoadingStatus] = React.useState('idle');

  let episodesList = {};

  if (!isEmpty(title)) {
    const {
      player: { list },
    } = title;
    episodesList = list;
  }

  React.useEffect(() => {
    const controller = new AbortController();
    setLoadingStatus('pending');
    setTitle({});
    axiosInstance
      .get('/title', {
        params: {
          id: animeId,
          remove: 'torrents,franchises,announce',
        },
        signal: controller.signal
      })
      .then((response) => {
        const { data: loadedTitle } = response;
        setTitle(loadedTitle);
        setLoadingStatus('success');
        return loadedTitle;
      })
      .then((loadedTitle) =>
        axiosInstance.get(youtubeBase, {
          params: {
            part: 'id',
            maxResults: 1,
            q: loadedTitle.names.en + 'trailer',
            safeSearch: 'none',
            type: 'video',
            videoCaption: 'any',
            videoDuration: 'short',
            videoEmbeddable: true,
            key: 'AIzaSyCOvIRAxZStV6HEBeiS7gxy7HFwmrjPP0I',
          },
        })
      )
      .then((response) => {
        const { data } = response;
        if (data.items.length) {
          setTitle((prev) => ({
            ...prev,
            trailerId: data.items[0].id.videoId,
          }));
        }
      })
      .catch((err) => {
        // в данный момент статус запроса выставляется на неудачно выполненный в случае если тайтл бы загружен но не ютуб,
        // что не верно ИСПРАВИТЬ!!!
        console.log(err);
      });

      return () => controller.abort();
  }, [animeId]);

  return (
    <div className={s.root}>
      {loadingStatus === 'pending' && <VideoLoader></VideoLoader>}
      {loadingStatus === 'success' && !isEmpty(title) && (
        <>
          <section className={s.animeInfoWrapper}>
            <AnimeInfo title={title}></AnimeInfo>
          </section>
          <section className={s.videoSectionWrapper}>
            <VideoSection episodesList={episodesList}></VideoSection>
          </section>
          <section className={s.commentSection}>
            <div className={s.commentGrid}>
              <CommentsList></CommentsList>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
