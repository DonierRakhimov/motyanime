import React from 'react';
import s from './pictureoverlay.module.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { ReactComponent as PlayIcon } from '../../assets/images/play.svg';

export default function PictureOverlay({ id, name, src, trailer = false }) {
  return (
    <div className={s.imgContainer}>
      <img
        src={src}
        alt={name}
        className={classNames(s.animePic, trailer ? s.trailerPic : '')}
      />
      <Link
        to={`/anime/${id}`}
        className={classNames(s.watchLink, trailer ? s.trailerLink : '')}
        onClick={() => window.scrollTo(0, 0)}
      >
        <PlayIcon />
        <span className={s.playText}>
          {trailer ? 'Смотреть трейлер' : 'Смотреть'}
        </span>
      </Link>
    </div>
  );
}
