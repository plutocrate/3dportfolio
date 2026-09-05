// Any track whose filename (ignoring query strings/extensions casing) ends
// in "-b" before its extension turns the swirl on — e.g. "balatro-b.mp3",
// "Some Song-B.MP3", "chill-b.wav" all match. Anything else doesn't.
export function isSwirlTrack(urlOrFilename) {
  if (!urlOrFilename) return false;
  const clean = urlOrFilename.split('?')[0].split('/').pop();
  return /-b\.[a-z0-9]+$/i.test(clean);
}
