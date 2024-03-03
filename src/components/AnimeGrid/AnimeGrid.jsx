import React from "react";
import s from "./animegrid.module.css";
import AnimeCard from "../AnimeCard/AnimeCard";

export default function AnimeGrid({ animes = [], children }) {
  return (
    <section className={s.root}>
      <div className={s.animeGrid}>
        {Boolean(animes.length) &&
          animes.map((anime) => (
            <AnimeCard key={anime._id} anime={anime}></AnimeCard>
          ))}
        {children}
      </div>
    </section>
  );
}
