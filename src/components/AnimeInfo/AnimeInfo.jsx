import React from "react";
import s from "./animeinfo.module.css";
import SaveButton from "../SaveButton/SaveButton";
import PictureOverlay from "../PictureOverlay/PictureOverlay";
import { createPortal } from "react-dom";
import Popup from "../Popup/Popup";
import { usePopup } from "../../hooks/usePopup";
import popupStyles from "../Popup/popup.module.css";
import DetailList from "../DetailList/DetailList";
import isEmpty from "lodash.isempty";

export default function AnimeInfo({ anime = {} }) {
  const [isTrailerOpen, setIsTrailerOpen] = usePopup(`.${popupStyles.modal}`);

  if (isEmpty(anime)) {
    return;
  }

  const {
    _id,
    names,
    description,
    type,
    season,
    status,
    genres,
    posters,
    youtube_id = "",
  } = anime;

  const detailList = [
    ["Тип:", type?.string],
    ["Дата премьеры:", `${season?.string}, ${season?.year}`],
    ["Жанры:", genres?.join(", ")],
    ["Статус:", status?.string],
  ];

  const handleTrailerClick = (evt) => {
    evt.preventDefault();
    setIsTrailerOpen(true);
  };

  return (
    <article className={s.root}>
      <div className={s.mainContainer}>
        <div className={s.trailerContent} onClick={handleTrailerClick}>
          <PictureOverlay
            src={posters.original}
            id={_id}
            name={names.ru}
            trailer={true}
          ></PictureOverlay>
        </div>
        <div className={s.trailerContent}>
          <h2 className={s.title}>{names?.ru}</h2>
          <h3 className={s.text}>
            Описание <SaveButton className={s.addBtn} anime={anime} />
          </h3>
          <p className={s.description}>{description}</p>
        </div>
        <div className={s.trailerContent}>
          <h3 className={s.text}>Детали</h3>
          <DetailList detailList={detailList}></DetailList>
        </div>
      </div>
      {createPortal(
        <Popup isOpen={isTrailerOpen}>
          <iframe
            title="trailer"
            width="460"
            height="360"
            src={"http://www.youtube.com/embed/" + youtube_id}
          >
            Не удалось загрузить трейлер
          </iframe>
        </Popup>,
        document.getElementById("root")
      )}
    </article>
  );
}
