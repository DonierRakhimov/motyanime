import React from 'react';
import s from './animegrid.module.css';
import AnimeCard from '../AnimeCard/AnimeCard';

export default function AnimeGrid({ titles = [], children }) {
  return (
    <section className={s.animeGallery}>
      <div className={s.animeGrid}>
        {Boolean(titles.length) && titles.map((title) => (
          <AnimeCard key={title.id} title={title}></AnimeCard>
        ))}
        {children}
      </div>
    </section>
  );
}
