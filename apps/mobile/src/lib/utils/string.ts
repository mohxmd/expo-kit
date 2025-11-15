/**
 * Truncates a string to a maximum length and adds an ellipsis
 */
export function truncate(text: string, maxLength: number, ellipsis = "..."): string {
  if (!text || text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength) + ellipsis;
}
