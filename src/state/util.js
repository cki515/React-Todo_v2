export function dateToStr(date) {
  //   Sat May 13 2023 19:57:36
  //   2023-05-13 19:57:36
  const pad = (n) => {
    return n < 10 ? "0" + n : n;
  };
  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    " " +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes()) +
    ":" +
    pad(date.getSeconds())
  );
}
