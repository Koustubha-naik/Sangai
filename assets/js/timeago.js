document.addEventListener("DOMContentLoaded", () => {
  const DAY = 86400000;
  const MONTH = DAY * 30;
  const YEAR = DAY * 365;

  const plural = (n, word) => n === 1 ? `1 ${word}` : `${n} ${word}s`;

  document.querySelectorAll(".time-ago").forEach(el => {
    const ts = Number(el.dataset.timestamp) * 1000;
    if (!ts) return;

    const diff = Date.now() - ts;
    let text;

    if (diff < 0) {
      const future = Math.abs(diff);
      if (future < DAY) text = "Today";
      else if (future < MONTH) text = `In ${plural(Math.ceil(future / DAY), "day")}`;
      else if (future < YEAR) text = `In ${plural(Math.ceil(future / MONTH), "month")}`;
      else text = `In ${plural(Math.ceil(future / YEAR), "year")}`;
    } else {
      if (diff < DAY) text = "Today";
      else if (diff < MONTH) text = `${plural(Math.floor(diff / DAY), "day")} ago`;
      else if (diff < YEAR) text = `${plural(Math.floor(diff / MONTH), "month")} ago`;
      else text = `${plural(Math.floor(diff / YEAR), "year")} ago`;
    }

    el.textContent = text;
  });
});
