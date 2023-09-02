import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import s from './pictureoverlay.module.css';
import classNames from 'classnames';
import naruto from '../../assets/images/naruto.jpg';
import { Link } from 'react-router-dom';

export default function PictureOverlay({ id, name, src, trailer = false }) {
  return (
    <div className={s.imgContainer}>
      <img
        src={naruto}
        alt={name}
        className={classNames(s.animePic, trailer ? s.trailerPic : '')}
      />
      <Link
        to={`/${id}`}
        className={classNames(s.watchLink, trailer ? s.trailerLink : '')}
        onClick={() => window.scrollTo(0, 0)}
      >
        <FontAwesomeIcon icon={faCirclePlay} />
        <span className={s.playText}>
          {trailer ? 'Смотреть трейлер' : 'Смотреть'}
        </span>
      </Link>
    </div>
  );
}
