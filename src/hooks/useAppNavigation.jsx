import { createContext, useCallback, useContext, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { normalizePath, parsePath, getAncestors } from '@/lib/routes'
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

    // Deep links start with only that URL on the stack. Seed ancestors underneath
    // once so Back from any content URL returns through the correct parent steps
    // back to the 3D home.
    if (!seededThisLoad && path !== '/') {
      seededThisLoad = true
      seeding.current = true
      const ancestors = getAncestors(path)
      if (ancestors.length > 0) {
        window.history.replaceState(null, '', ancestors[0])
        for (let i = 1; i < ancestors.length; i++) {
          window.history.pushState(null, '', ancestors[i])
        }
        navigate(path + (location.search || ''), { replace: false })
      }
      return
    }
    seededThisLoad = true
  }, [enabled, location.pathname, location.search, applyRoute, navigate])

  const go = useCallback((path) => {
    const target = normalizePath(path)
    const current = normalizePath(location.pathname)
    if (target === current) return

    const ancestors = getAncestors(target)
    if (ancestors.length > 0) {
      window.history.replaceState(null, '', ancestors[0])
      for (let i = 1; i < ancestors.length; i++) {
        window.history.pushState(null, '', ancestors[i])
      }
    }
    navigate(target + (location.search || ''), { replace: false })
  }, [location.pathname, location.search, navigate])

  const goHome = useCallback(() => {
    if (normalizePath(location.pathname) === '/') return
    navigate(-1)
  }, [location.pathname, navigate])

  const goParent = useCallback(() => {
    navigate(-1)
  }, [navigate])

  return (
    <NavContext.Provider value={{ go, goHome, goParent }}>
      {children}
    </NavContext.Provider>
  )
}

