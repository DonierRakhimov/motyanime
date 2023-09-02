import React from 'react';
import s from './main.module.css';
import Carousel from '../../components/Carousel/Carousel';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentPage,
  selectIsMoreToLoad,
  selectRandomTitles,
  selectStatusIsLoading,
  selectTitleRange,
} from '../../redux/entities/Title/selectors';
import CardLoader from '../../components/CardLoader/CardLoader';
import { useInView } from 'react-intersection-observer';
import Spiner from '../../components/Spiner/Spiner';
import { loadCurrentPage } from '../../redux/entities/Title/thunks/loadCurrentPage';
import AnimeGrid from '../../components/AnimeGrid/AnimeGrid';
import { selectCurrentGenres } from '../../redux/UI/Genres/selectors';
import { selectCurrentSort } from '../../redux/UI/Sort/selectors';

export default function Main() {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const isLoading = useSelector(selectStatusIsLoading);
  const firstTitles = useSelector((state) => selectTitleRange(state, 0, 8));
  const restTitles = useSelector((state) => selectTitleRange(state, 8));
  const randomTitles = useSelector((state) => selectRandomTitles(state, 4));
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
      <AnimeGrid titles={firstTitles}>
        {isLoading &&
          [...Array(12)].map((_, index) => <CardLoader key={index} />)}
      </AnimeGrid>
      {randomTitles.length && (
        <section className={s.animeCarousel}>
          <Carousel titles={randomTitles}></Carousel>
        </section>
      )}
      <AnimeGrid titles={restTitles}>
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
