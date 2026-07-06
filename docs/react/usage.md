# neicon-react — Usage

Neubrutalism-inspired icons as tree-shakeable React components. Each icon ships
in two variants (see [Variants](../shared/variants.md)) and renders the
**colored** one by default.

> For the full list of icon names, see the [Icon catalog](../shared/icons.md).
> For vanilla JS / other frameworks, see [neicon usage](../javascript/usage.md).

## Install

```sh
npm i neicon-react
# or: bun add neicon-react / pnpm add neicon-react / yarn add neicon-react
```

`react >= 18` is a peer dependency.

## Basic usage

Import only the icons you use — everything else is tree-shaken out of your bundle.

```tsx
import { Check, DownArrow } from 'neicon-react'

export function Toolbar() {
  return (
    <div>
      <Check />              {/* colored, 24×24 */}
      <Check size={32} />    {/* custom size */}
      <Check monochrome />   {/* black & white variant */}
      <DownArrow className="nav-icon" onClick={next} />
    </div>
  )
}
```

Component names are the PascalCase form of the icon id: `down-arrow` →
`DownArrow`, `letter-a` → `LetterA`, `number-0` → `Number0`.

## Props

Every icon accepts all native `<svg>` props (`className`, `style`, `onClick`,
`aria-*`, `ref`, …), plus:

| Prop         | Type               | Default | Description                                |
| ------------ | ------------------ | ------- | ------------------------------------------ |
| `size`       | `number \| string` | `24`    | Sets width & height. A number is pixels.   |
| `monochrome` | `boolean`          | `false` | Render the b&w variant instead of colored. |

```tsx
<Check size="1.5rem" />
<Check style={{ verticalAlign: 'middle' }} aria-label="done" />
<Check ref={svgRef} />          {/* forwards to the <svg> element */}
```

## Choosing a variant

```tsx
<Basket />              {/* Colored — bold accent panel */}
<Basket monochrome />   {/* B&W — white panel */}
```

## Dynamic / runtime icon selection

When the icon is chosen at runtime (search UIs, CMS content), use the `/all`
subpath, which exposes a name→component registry plus metadata. Importing it
pulls the whole set, so prefer named imports in normal app code.

```tsx
import { iconComponents, icons, categories } from 'neicon-react/all'

function DynamicIcon({ name }: { name: string }) {
  const Icon = iconComponents[name] // e.g. iconComponents['down-arrow']
  return Icon ? <Icon size={32} /> : null
}

// `icons`      → IconMeta[]  { name, component, category, description, variants }
// `categories` → ordered category keys
```

## TypeScript

Types ship with the package. The shared prop type is exported as `NeiconProps`:

```tsx
import type { NeiconProps } from 'neicon-react'

const iconProps: NeiconProps = { size: 40, monochrome: true }
```

## Notes

- The package is side-effect free (`"sideEffects": false`) and ships as ESM, so
  modern bundlers tree-shake unused icons automatically.
- Colors are baked into each variant (colored = accent panel, b&w = white panel);
  `size` scales the icon but does not recolor it.
