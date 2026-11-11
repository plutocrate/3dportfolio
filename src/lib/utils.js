import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function withBase(path) {
  if (!path) return ''
  if (/^(?:https?:)?\/\//i.test(path) || path.startsWith('data:') || path.startsWith('blob:')) {
    return path
  }
  const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '')
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  if (base && (cleanPath === base || cleanPath.startsWith(`${base}/`))) {
    return cleanPath
  }
  return `${base}${cleanPath}`
}
