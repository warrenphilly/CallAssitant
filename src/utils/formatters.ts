export const formatDurationMMSS = (seconds: number): string => {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const roundedSeconds = Math.round(seconds);
  const minutes = Math.floor(roundedSeconds / 60);
  const remainingSeconds = roundedSeconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};
