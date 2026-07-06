import { iconData } from './data.js'
import type { Variant } from './metadata.js'

export * from './metadata.js'
export { iconData } from './data.js'

export interface GetIconOptions {
  /** "Colored" (default) or "B&W". */
  variant?: Variant
  /** Override the SVG's width & height. A number is treated as pixels. */
  size?: number | string
}

/**
 * Get an icon's raw SVG markup — ready to inject into the DOM.
 *
 * ```js
 * import { getIcon } from 'neicon'
 * document.querySelector('#el').innerHTML = getIcon('check', { size: 32 })
 * ```
 *
 * @param name kebab-case icon id, e.g. "down-arrow"
 * @returns the SVG string, or `undefined` if the icon/variant doesn't exist
 */
export function getIcon(name: string, options: GetIconOptions = {}): string | undefined {
  const { variant = 'Colored', size } = options
  const svg = iconData[name]?.[variant]
  if (!svg || size == null) return svg
  const dim = typeof size === 'number' ? String(size) : size
  return svg
    .replace(/(<svg\b[^>]*?)\swidth="[^"]*"/, `$1 width="${dim}"`)
    .replace(/(<svg\b[^>]*?)\sheight="[^"]*"/, `$1 height="${dim}"`)
}
