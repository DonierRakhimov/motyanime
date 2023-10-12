import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import Slide from '../Slide/Slide';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import s from './carousel.module.css';
import isEmpty from 'lodash.isempty';

export default function Carousel({ animes }) {
  if (isEmpty(animes)) {
    return;
  }

  return (
    <Swiper
      className={s.swiper}
      modules={[Navigation, Autoplay, EffectFade]}
      navigation={{
        nextEl: `.${s.nextBtn}`,
        prevEl: `.${s.prevBtn}`,
      }}
      loop={true}
      autoplay={{
        disableOnInteraction: false,
      }}
      effect={'fade'}
      fadeEffect={{
        crossFade: true,
      }}
    >
      {animes.map((anime) => (
        <SwiperSlide key={anime._id}>
          <Slide anime={anime} />
        </SwiperSlide>
      ))}
      <button className={classNames(s.arrowBtn, s.nextBtn)}>
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
      <button className={classNames(s.arrowBtn, s.prevBtn)}>
        <FontAwesomeIcon icon={faAngleRight} rotation={180} />
      </button>
    </Swiper>
  );
}
