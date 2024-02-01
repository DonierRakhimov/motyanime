export const formatTime = (seconds) => {
  const timeString = new Date(seconds * 1000).toISOString().slice(11, 19);

  if (timeString.startsWith("00:00:")) {
    return timeString.replace("00:00:", "0:");
  }

  if (timeString.startsWith("00:")) {
    return timeString.replace("00:", "");
  }

  return timeString;
};
