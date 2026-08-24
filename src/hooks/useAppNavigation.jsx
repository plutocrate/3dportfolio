import { createContext, useCallback, useContext, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { normalizePath, parsePath, parentPath } from '@/lib/routes'
import { useSceneStore } from '@/hooks/useSceneStore'

let seededThisLoad = false

const NavContext = createContext({
  go: () => {},
  goHome: () => {},
  goParent: () => {},
})

export function useGo() {
  return useContext(NavContext)
}

export function NavigationProvider({ enabled, children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const applyRoute = useSceneStore((s) => s.applyRoute)
  const seeding = useRef(false)

  useEffect(() => {
    if (!enabled) return

    const path = normalizePath(location.pathname)

    // While inserting `/` under a deep link, ignore the intermediate home
    // location so the overlay doesn't flash closed then open again.
    if (seeding.current) {
      if (path === '/') return
      seeding.current = false
    }

    applyRoute(parsePath(path))

    // Deep links start with only that URL on the stack. Seed `/` underneath
    // once so Back from any content URL returns to the 3D home — not the
    // parent section, and not the previous website.
    if (!seededThisLoad && path !== '/') {
      seededThisLoad = true
      seeding.current = true
      const dest = path + (location.search || '')
      navigate('/', { replace: true })
      requestAnimationFrame(() => navigate(dest))
      return
    }
    seededThisLoad = true
  }, [enabled, location.pathname, location.search, applyRoute, navigate])

  const go = useCallback((path) => {
    const target = normalizePath(path)
    const current = normalizePath(location.pathname)
    if (target === current) return
    // From home, push so Back returns home. From any other content URL,
    // replace so Back still returns home instead of stacking overlays.
    if (current === '/') navigate(target)
    else navigate(target, { replace: true })
  }, [location.pathname, navigate])

  const goHome = useCallback(() => {
    if (normalizePath(location.pathname) === '/') return
    navigate('/')
  }, [location.pathname, navigate])

  const goParent = useCallback(() => {
    const parent = parentPath(location.pathname)
    const current = normalizePath(location.pathname)
    if (parent === current) {
      goHome()
      return
    }
    navigate(parent, { replace: current !== '/' })
  }, [location.pathname, navigate, goHome])

  return (
    <NavContext.Provider value={{ go, goHome, goParent }}>
      {children}
    </NavContext.Provider>
  )
}
