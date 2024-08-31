import { v4 as uuid } from 'uuid';

export default function generateKey() {
  return uuid();
}

export function formatMinutes(minutes: number) {
  return minutes < 10 ? `0${minutes}` : `${minutes}`;
}

export function formatSeconds(seconds: number) {
  return seconds < 10 ? `0${seconds}` : `${seconds}`;
}
