export function getReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const cleanText = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/[#>*_`[\]()-]/g, ' ')
    .trim();
  const words = cleanText ? cleanText.split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  return `${minutes} min de leitura`;
}
