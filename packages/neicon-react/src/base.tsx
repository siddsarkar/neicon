import type { ReactNode, SVGProps } from 'react'

export interface NeiconProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  /** Width & height of the icon. A number is treated as pixels. @default 24 */
  size?: number | string
  /** Render the black & white variant instead of the colored default. */
  monochrome?: boolean
}

/** The two rendered variants an icon carries. Internal. */
export interface NeiconVariants {
  colored: ReactNode
  bw: ReactNode
}

/**
 * Shared `<svg>` wrapper used by every generated icon. Picks the variant from
 * the `monochrome` prop and forwards everything else to the underlying element.
 */
export function NeiconBase({
  variants,
  size = 24,
  monochrome = false,
  ...rest
}: NeiconProps & { variants: NeiconVariants }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      {monochrome ? variants.bw : variants.colored}
    </svg>
  )
}
