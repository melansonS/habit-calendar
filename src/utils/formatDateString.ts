export default function formatDateString(date:number | Date | string) {
  if (typeof date === 'string') return date.slice(0, 15);
  return new Date(date).toString().slice(0, 15);
}
