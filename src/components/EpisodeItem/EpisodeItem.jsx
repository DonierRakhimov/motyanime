import React from 'react';
import s from './episodeitem.module.css';
import classNames from 'classnames';

export default function EpisodeItem({ isActive, episodeName, onEpisodeClick }) {
  return <button onClick={onEpisodeClick} className={classNames(s.episodeItem, isActive ? s.active : '')}>{episodeName}</button>;
}
