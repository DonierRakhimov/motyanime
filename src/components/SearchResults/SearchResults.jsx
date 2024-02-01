import React from "react";
import AnimeResult from "../AnimeResult/AnimeResult";
import s from "./search.module.css";

export default function SearchResults({
  searchResults,
  message,
  onAnimeClick,
  onAnimeDelete,
}) {
  return (
    <>
      <p className={s.message}>{message}</p>
      <ul className={s.searchList}>
        {searchResults.map((searchedAnime) => (
          <li key={searchedAnime._id}>
            <AnimeResult
              animeResult={searchedAnime}
              onClick={() => onAnimeClick(searchedAnime)}
              onDelete={() => onAnimeDelete(searchedAnime)}
            ></AnimeResult>
          </li>
        ))}
      </ul>
    </>
  );
}
