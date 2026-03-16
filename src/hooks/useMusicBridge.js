// Global bridge so any component can pause/resume ambient music
// without prop drilling. Set by App.jsx on mount.
let _pauseForVideo    = () => {}
let _resumeAfterVideo = () => {}

export function setMusicBridge(pauseFn, resumeFn) {
  _pauseForVideo    = pauseFn
  _resumeAfterVideo = resumeFn
}

export function pauseMusicForVideo()   { _pauseForVideo() }
export function resumeMusicAfterVideo() { _resumeAfterVideo() }
