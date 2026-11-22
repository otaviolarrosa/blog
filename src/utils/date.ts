const timeZone = 'UTC';

const railFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone,
});

const stampFormatter = new Intl.DateTimeFormat('pt-BR', {
  month: 'long',
  year: 'numeric',
  timeZone,
});

const bylineFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone,
});

const eyebrowFormatter = new Intl.DateTimeFormat('pt-BR', {
  month: 'long',
  year: 'numeric',
  timeZone,
});

export function formatDatePtBr(date: Date): string {
  return bylineFormatter.format(date);
}

/** Short rail date: `15 de set. de 2025` -> compact `15 set 2025`. */
export function formatRailDate(date: Date): string {
  return railFormatter.format(date).replace(/ de /g, ' ').replace(/\.$/, '').replace(/\./g, '');
}

/** Featured-card stamp: `setembro de 2025`. */
export function formatStampDate(date: Date): string {
  return stampFormatter.format(date);
}

/** Article byline date: `15 de setembro de 2025`. */
export function formatBylineDate(date: Date): string {
  return bylineFormatter.format(date);
}

/** Article eyebrow date: `setembro de 2025`. */
export function formatEyebrowDate(date: Date): string {
  return eyebrowFormatter.format(date);
}
