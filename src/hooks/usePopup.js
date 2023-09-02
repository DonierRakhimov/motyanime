import React from 'react';

export const usePopup = (popupSelector) => {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    function closeEscHandler(evt) {
      if (evt.key === 'Escape') {
        setIsOpen(false);
      }
    }

    function closeClickHandler(evt) {
      if (!evt.target.closest(popupSelector)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', closeEscHandler);
      window.addEventListener('click', closeClickHandler, { capture: true });
    }

    return () => {
      window.removeEventListener('keydown', closeEscHandler);
      window.removeEventListener('click', closeClickHandler, { capture: true });
    };
  }, [isOpen, popupSelector]);

  return [isOpen, setIsOpen];
};
