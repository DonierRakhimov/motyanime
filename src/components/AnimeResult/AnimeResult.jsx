import React from 'react';
import profile from '../../assets/images/profile.png';
import s from './animeresult.module.css';
import Button from '../Button/Button';
import { buttonSizes } from '../../utils/buttonSizes';
import { buttonColors } from '../../utils/buttonColors';
import { Link } from 'react-router-dom';
import isEmpty from 'lodash.isempty';

export default function AnimeResult({
  animeResult = {},
  onClick = () => {
    return;
  },
}) {
  if (isEmpty(animeResult)) {
    return;
  }

  const { id, names, status, genres, type } = animeResult;

  return (
    <Link
      to={`/${id}`}
      onClick={onClick}
      style={{
        textDecoration: 'none',
      }}
    >
      <div className={s.root}>
        <img src={profile} alt={names?.ru} className={s.animePic} />
        <div className={s.infoContainer}>
          <p className={s.title}>{names?.ru}</p>
          <div className={s.tags}>
            <div>
              <div className={s.btnWrapper}>
                <Button size={buttonSizes.s} color={buttonColors.grey}>
                  {status?.string}
                </Button>
              </div>
              <Button size={buttonSizes.s} color={buttonColors.grey}>
                {genres[0]}
              </Button>
            </div>
            <span className={s.type}>{type?.string}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
