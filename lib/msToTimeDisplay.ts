export default function msToTimeDisplay(ms: number): string {
  const msPart = Math.floor((ms % 1000)/100)
  const seconds = Math.floor(ms / 1000)%60
  const minutes = Math.floor(ms / 60000)
  return minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0') + '.' + msPart
}