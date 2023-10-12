import React from "react";
import s from "./slide.module.css";
import Button from "../Button/Button";
import { buttonSizes } from "../../utils/buttonSizes";
import { buttonColors } from "../../utils/buttonColors";
import onepiece from "../../assets/images/onepiece.jpg";
import isEmpty from "lodash.isempty";
import { Link } from "react-router-dom";

/*
Впоследствии этот компонент будет получать данные о аниме через проп
Соотсветственно адрес картинки нужно задавать через проп style={backgroundImage}
*/

export default function Slide({ anime = {} }) {
  if (isEmpty(anime)) {
    return;
  }

  const { _id, description, season, names, genres, type, status } = anime;

  return (
    <div className={s.root} style={{ backgroundImage: `url(${onepiece})` }}>
      <div className={s.sliderContainer}>
        <div className={s.infoContainer}>
          <h2 className={s.animeTitle}>{names?.ru}</h2>
          <div className={s.tags}>
            {type?.string && (
              <Button size={buttonSizes.m}>{type?.string}</Button>
            )}
            {status?.string && (
              <Button size={buttonSizes.m} color={buttonColors.grey}>
                {status?.string}
              </Button>
            )}
            {!isEmpty(genres) && (
              <Button size={buttonSizes.m} color={buttonColors.grey}>
                {genres[0]}
              </Button>
            )}
          </div>
          <p className={s.date}>{`${season?.year} год${
            season?.string ? ", " + season?.string : ""
          }`}</p>
          <p className={s.description}>{description}</p>
          <Link to={`/${_id}`}>
            <Button size={buttonSizes.xl}>СМОТРЕТЬ</Button>
          </Link>
        </div>
        <div className={s.imgWrapper}>
          <img className={s.img} src={onepiece} alt={names?.ru} />
        </div>
      </div>
    </div>
  );
}
