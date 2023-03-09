export function validateHhMm(value: string): boolean {
  return /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(value);
}

const ten = (val: number): string => val > 9 ? val.toString() : `0${val}`;

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
