// Global bridge so any component can pause/resume ambient music
// without prop drilling. Set by App.jsx on mount.
let _pauseForVideo    = () => {}
let _resumeAfterVideo = () => {}

export function setMusicBridge(pauseFn, resumeFn) {
  _pauseForVideo    = pauseFn
  _resumeAfterVideo = resumeFn
}

export function pauseAllVideos() {
  // imported lazily to avoid circular deps
  import('@/components/sections/BlogSection.jsx')
    // can't import directly — use the DOM instead
  document.querySelectorAll('video').forEach(v => {
    if (!v.paused) { v.pause(); v.currentTime = 0 }
  })
  resumeMusicAfterVideo()
}

export function pauseMusicForVideo()   { _pauseForVideo() }
export function resumeMusicAfterVideo() { _resumeAfterVideo() }
