export const debounce = (func, ms) => {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      func.call(this, ...args);
    }, ms);
  };
};
