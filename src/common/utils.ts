export function validateHhMm(value: string): boolean {
  return /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(value);
}

const ten = (val: number): string => val > 9 ? val.toString() : `0${val}`;
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const formatDateTime = (date: string | null, time: string | null): string => {
  if (!date) return '';
  const dateObj = new Date(`${date} ${time}`);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const hour = dateObj.getHours();
  const min = dateObj.getMinutes();
  const sec = dateObj.getSeconds();
  return `${year}-${ten(month)}-${ten(day)}T${ten(hour)}:${ten(min)}:${ten(sec)}+00:00`;
}

export const formatDate = (dateObj: Date) => {
  const month = dateObj.getMonth();
  const date = dateObj.getDate();
  const day = dateObj.getDay();
  return `${months[month]} ${date},${days[day]}`
}

export const formatTime = (dateObj: Date) => {
  let hour = dateObj.getHours();
  let h = hour > 12 ? hour - 12 : hour;
  const min = dateObj.getMinutes();
  return `${ten(h)}:${ten(min)} ${hour > 12 ? 'PM' : 'AM'}`
}
