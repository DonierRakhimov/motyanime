import React from "react";
import s from "./main.module.css";
import Carousel from "../../components/Carousel/Carousel";
import { useDispatch, useSelector } from "react-redux";
import CardLoader from "../../components/CardLoader/CardLoader";
import { useInView } from "react-intersection-observer";
import Spiner from "../../components/Spiner/Spiner";
import { loadCurrentPage } from "../../redux/entities/Anime/thunks/loadCurrentPage";
import AnimeGrid from "../../components/AnimeGrid/AnimeGrid";
import { selectCurrentGenres } from "../../redux/UI/Genres/selectors";
import { selectCurrentSort } from "../../redux/UI/Sort/selectors";
import {
  selectAnimeRange,
  selectRandomAnimes,
  selectCurrentPage,
  selectIsMoreToLoad,
  selectStatusIsLoading,
} from "../../redux/entities/Anime/selectors";
import isEmpty from "lodash.isempty";

export default function Main() {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const isLoading = useSelector(selectStatusIsLoading);
  const firstAnimes = useSelector((state) => selectAnimeRange(state, 0, 8));
  const restAnimes = useSelector((state) => selectAnimeRange(state, 8));
  const randomAnimes = useSelector((state) => selectRandomAnimes(state, 4));
  const currentGenres = useSelector(selectCurrentGenres);
  const isMoreToLoad = useSelector(selectIsMoreToLoad);
  const currentSort = useSelector(selectCurrentSort);

  const { ref, inView } = useInView({
    threshold: 0.3,
  });

  React.useEffect(() => {
    const controller = new AbortController();

    if (currentPage === 1) {
      dispatch(loadCurrentPage(controller.signal));
    }

    return () => controller.abort();
  }, [currentGenres, currentSort, currentPage, dispatch]);

  React.useEffect(() => {
    const controller = new AbortController();

    if (inView && isMoreToLoad) {
      dispatch(loadCurrentPage(controller.signal));
    }

    return () => controller.abort();
  }, [inView, isMoreToLoad, dispatch]);

  return (
    <main className={s.main}>
      <h2 className={s.title}>АНИМЕ</h2>
      <AnimeGrid animes={firstAnimes}>
        {isLoading &&
          isEmpty(firstAnimes) &&
          [...Array(12)].map((_, index) => <CardLoader key={index} />)}
      </AnimeGrid>
      {randomAnimes.length && (
        <section className={s.animeCarousel}>
          <Carousel animes={randomAnimes}></Carousel>
        </section>
      )}
      <AnimeGrid animes={restAnimes}>
        {isMoreToLoad && (
          <>
            <Spiner isActive={inView}></Spiner>
            <div ref={ref}></div>
          </>
        )}
      </AnimeGrid>
    </main>
  );
}
