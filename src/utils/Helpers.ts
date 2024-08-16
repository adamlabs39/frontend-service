export function formatDate(date: Date) {
  if (date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  } else return "";
}

export function formatTime(date: Date) {
  if (date) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  } else return "";
}

export function getDateNow(type = "-") {
  let date = formatDate(new Date());
  if (type != "-") {
    date = date.replaceAll("-", type);
  }
  return date;
}
