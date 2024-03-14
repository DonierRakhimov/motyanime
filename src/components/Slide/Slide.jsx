import React from "react";
import s from "./slide.module.css";
import Button from "../Button/Button";
import { buttonColors } from "../../utils/buttonColors";
import isEmpty from "lodash.isempty";
import { Link, useNavigate } from "react-router-dom";
import { buttonSizes } from "../../utils/buttonSizes";

export default function Slide({ anime = {} }) {
  const [showBackgroundImg, setShowBackgroundImg] = React.useState(false);
  const [tagsBtnSize, setTagsBtnSize] = React.useState(buttonSizes.m);
  const [watchBtnSize, setwatchBtnSize] = React.useState(buttonSizes.xl);
  const navigate = useNavigate();

  function handleResize() {
    if (document.documentElement.clientWidth <= 992) {
      setShowBackgroundImg(true);
    } else {
      setShowBackgroundImg(false);
    }

    if (document.documentElement.clientWidth <= 576) {
      setTagsBtnSize(buttonSizes.s);
      setwatchBtnSize(buttonSizes.l);
    } else {
      setTagsBtnSize(buttonSizes.m);
      setwatchBtnSize(buttonSizes.xl);
    }
  }

  React.useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [anime]);

  if (isEmpty(anime)) {
    return;
  }

  const { _id, description, season, names, genres, type, status, posters } =
    anime;

  return (
    <div
      className={s.root}
      style={{
        backgroundImage: showBackgroundImg
          ? `url(${posters.original})`
          : "none",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className={s.sliderContainer}>
        <div className={s.infoContainer}>
          <h2 className={s.animeTitle}>{names?.ru}</h2>
          <div className={s.tags}>
            {type?.string && <Button size={tagsBtnSize}>{type?.string}</Button>}
            {status?.string && (
              <Button size={tagsBtnSize} color={buttonColors.grey}>
                {status?.string}
              </Button>
            )}
            {!isEmpty(genres) && (
              <Button size={tagsBtnSize} color={buttonColors.grey}>
                {genres[0]}
              </Button>
            )}
          </div>
          <p className={s.date}>{`${season?.year} год${
            season?.string ? ", " + season?.string : ""
          }`}</p>
          <p className={s.description}>{description}</p>
          <Button onClick={() => navigate(`/anime/${_id}`)} size={watchBtnSize}>
            СМОТРЕТЬ
          </Button>
        </div>
        {!showBackgroundImg && (
          <div className={s.imgWrapper}>
            <img className={s.img} src={posters.original} alt={names?.ru} />
          </div>
        )}
      </div>
    </div>
  );
}
