export function encodeId(id: string | number): string {
  return encodeURIComponent(String(id));
}
