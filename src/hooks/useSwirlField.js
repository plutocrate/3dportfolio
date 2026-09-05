import { createSwirlField } from '@/lib/balatroEngine'

// Created once, shared by every mounted swirl surface (background, buttons,
// character aura) so they're all sampling the same instant of the same
// field — that's what makes them look like one continuous thing instead of
// several independent animations.
let singleton = null

export function getSwirlField() {
  if (!singleton) singleton = createSwirlField()
  return singleton
}
