import React from 'react';
import s from './animeCard.module.css';
import Button from '../Button/Button';
import { buttonSizes } from '../../utils/buttonSizes';
import { buttonColors } from '../../utils/buttonColors';
import ToggleButton from '../ToggleButton/ToggleButton';
import PictureOverlay from '../PictureOverlay/PictureOverlay';
import isEmpty from 'lodash.isempty';

export default function AnimeCard({ anime = {} }) {
  if (isEmpty(anime)) {
    return;
  }

  const { id, names, status, genres, posters } = anime;

  return (
    <figure className={s.root}>
      <PictureOverlay
        id={id}
        name={names.ru}
        src={posters.small.url}
      ></PictureOverlay>
      <figcaption className={s.caption}>
        <div className={s.infoContainer}>
          <div>
            <div className={s.btnWrapper}>
              <Button size={buttonSizes.s} color={buttonColors.grey}>
                {status.string}
              </Button>
            </div>
            <div className={s.btnWrapper}>
              <Button size={buttonSizes.s} color={buttonColors.grey}>
                {genres[0]}
              </Button>
            </div>
          </div>
          <ToggleButton anime={anime}/>
        </div>
        <p className={s.title}>{names.ru}</p>
      </figcaption>
    </figure>
  );
}
