export const FormatDuration = (durationInMinutes) => {
  const totalSeconds = Math.round(durationInMinutes * 60);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [
    hours > 0 ? `${hours}h` : "",
    minutes > 0 ? `${minutes}min` : "",
    seconds > 0 ? `${seconds}s` : "",
  ]
    .filter(Boolean)
    .join(" ");
};