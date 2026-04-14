export type Platform = 'macos' | 'windows' | 'linux' | 'unknown'

export function detectPlatform(): Platform {
  const p = navigator.platform || navigator.userAgent || ''
  if (/Mac/.test(p)) return 'macos'
  if (/Win/.test(p)) return 'windows'
  if (/Linux/.test(p)) return 'linux'
  return 'unknown'
}

export const platform = detectPlatform()
export const isMac = platform === 'macos'
export const isWindows = platform === 'windows'

export const platformStyles = {
  radius: isMac ? '10px' : '6px',
  radiusSm: isMac ? '8px' : '4px',
  radiusLg: isMac ? '14px' : '8px',
  shadowSm: isMac
    ? '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)'
    : '0 1px 2px rgba(0,0,0,0.12)',
  shadowMd: isMac
    ? '0 4px 12px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)'
    : '0 2px 8px rgba(0,0,0,0.15)',
  shadowLg: isMac
    ? '0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.08)'
    : '0 4px 16px rgba(0,0,0,0.2)',
  animationEase: isMac
    ? 'cubic-bezier(0.2, 0.9, 0.3, 1.0)'
    : 'cubic-bezier(0.1, 0.9, 0.2, 1.0)',
  animationDuration: isMac ? '350ms' : '250ms',
  animationFast: isMac ? '200ms' : '150ms',
}
