export function formatPrice(price: number){
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(price);
};

export function formatDate(date: Date, reverse: boolean = false) {
  if (date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    if (reverse) return `${year}-${month}-${day}`;
    else return `${day}-${month}-${year}`;
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

// Helper function to format date to dd-mm-yyyy hh:mm:ss
export function formatDateTime(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

export function dateToEpoch(dateString: Date) {
  const date = new Date(dateString);
  return Math.floor(date.getTime() / 1000);
}

export function epochToDate(
  epochTime: number,
  format: "none" | "dateTime" | "date" | "time" = "none"
) {
  const date = new Date(epochTime * 1000);

  if (format === "dateTime") {
    return formatDateTime(date);
  } else if (format === "date") {
    return formatDate(date);
  } else if (format === "time") {
    return formatTime(date);
  }

  return date;
}

// Function to set the desired time for startDate and endDate
export function setTimeForDate(
  date: Date,
  hours: number,
  minutes: number,
  seconds: number
) {
  const newDate = new Date(date); // Clone the date to avoid mutation
  newDate.setHours(hours, minutes, seconds, 0);
  return newDate;
}

export function setTimeToDate(time: string) {
  let date = new Date();
  const [hours, minutes, seconds] = time.split(":").map(Number);

  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds);
  return date;
}

export function setDateToTime(date: Date) {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

export function countAge(date: Date) {
  const now = new Date();
  let tahun = now.getFullYear() - date.getFullYear();
  let bulan = now.getMonth() - date.getMonth();
  let hari = now.getDate() - date.getDate();

  // Jika bulan kurang dari 0, kurangi satu tahun
  if (bulan < 0) {
    tahun--;
    bulan += 12;
  }

  // Jika hari kurang dari 0, kurangi satu bulan
  if (hari < 0) {
    bulan--;
    // Ambil jumlah hari dari bulan sebelumnya
    const bulanSebelumnya = new Date(now.getFullYear(), now.getMonth(), 0);
    hari += bulanSebelumnya.getDate();
  }

  return { tahun, bulan, hari };
}


