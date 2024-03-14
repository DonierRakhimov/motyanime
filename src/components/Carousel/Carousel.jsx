import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import Slide from '../Slide/Slide';
import classNames from 'classnames';
import s from './carousel.module.css';
import isEmpty from 'lodash.isempty';
import { ReactComponent as LeftArrow } from '../../assets/images/leftArrow.svg';
import { ReactComponent as RightArrow } from '../../assets/images/rightArrow.svg';

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
      autoplay={true}
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
        <RightArrow />
      </button>
      <button className={classNames(s.arrowBtn, s.prevBtn)}>
        <LeftArrow />
      </button>
    </Swiper>
  );
}
