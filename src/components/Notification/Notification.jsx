import React from 'react';
import s from './notification.module.css';
import { useSelector } from 'react-redux';
import { selectNotificationSlice } from '../../redux/UI/Notification/selectors';

export default function Notification() {
  const { isShown, color, message } = useSelector(selectNotificationSlice);
  const didMountRef = React.useRef(false);
  const noitifactionRef = React.useRef(null);
  const animationRef = React.useRef(null);

  React.useLayoutEffect(() => {
    animationRef.current = noitifactionRef.current.animate(
      [
        {
          top: '-200px',
          visibility: 'visible',
          offset: '0'
        },
        {
          top: '30px',
          offset: '0.1',
        },
        {
          visibility: 'hidden',
          offset: '1.0',
        },
      ],
      {
        duration: 5000,
      }
    );
    animationRef.current.cancel();
  }, []);

  React.useEffect(() => {
    if (didMountRef.current) {
      animationRef.current.cancel();
      animationRef.current.play();
    }
    didMountRef.current = true;
  }, [isShown]);

  return (
    <div
      ref={noitifactionRef}
      className={s.root}
      style={{
        backgroundColor: color,
      }}
    >
      <p className={s.message}>{message}</p>
    </div>
  );
}
