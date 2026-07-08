# neicon — Usage (Vanilla JS)

Neubrutalism-inspired icons as framework-agnostic SVG data. `neicon` has **zero
dependencies** and works anywhere: plain DOM, web components, server-side string
building, or as the data layer behind your own framework wrapper.

> For the full list of icon names, see the [Icon catalog](../shared/icons.md).
> For React components, see [neicon-react usage](../react/usage.md).

## Install

```sh
npm i neicon
# or: bun add neicon / pnpm add neicon / yarn add neicon
```

## Use from a CDN (no build step)

Published versions are mirrored to the JS CDNs. For browser ESM, jsDelivr's
`+esm` endpoint returns a single bundled module — no bundler required:

```html
<div id="icon"></div>
<script type="module">
  import { getIcon } from 'https://cdn.jsdelivr.net/npm/neicon@0.1.0/+esm'
  document.getElementById('icon').innerHTML = getIcon('check', { size: 48 })
</script>
```

esm.sh and unpkg work too:

```js
import { getIcon } from 'https://esm.sh/neicon@0.1.0'
import { getIcon } from 'https://unpkg.com/neicon@0.1.0/dist/index.js'
```

Pin a version (`@0.1.0`) in production; omit it to always get the latest.

## Get an icon's SVG

`getIcon(name, options?)` returns the raw SVG markup string (or `undefined` if
the name/variant doesn't exist).

```js
import { getIcon } from 'neicon'

// Inject into the DOM
document.querySelector('#logo').innerHTML = getIcon('check')

// With a size (overrides the SVG's width & height)
element.innerHTML = getIcon('down-arrow', { size: 32 })

// Black & white variant (see ../shared/variants.md)
element.innerHTML = getIcon('basket', { variant: 'B&W', size: 24 })
```

### `getIcon(name, options)`

| Argument          | Type               | Default     | Description                                 |
| ----------------- | ------------------ | ----------- | ------------------------------------------- |
| `name`            | `string`           | —           | kebab-case icon id, e.g. `"down-arrow"`     |
| `options.variant` | `"Colored"｜"B&W"` | `"Colored"` | which variant to return                     |
| `options.size`    | `number \| string` | —           | overrides the SVG width & height when given |

Returns: `string | undefined`.

## Raw data & metadata

```js
import { iconData, icons, categories } from 'neicon'

// iconData: every icon's SVG keyed by name, then variant
iconData['check']['Colored'] // "<svg …>…</svg>"
iconData['check']['B&W']     // "<svg …>…</svg>"

// icons: searchable metadata
icons // [{ name, component, category, description, variants }, …]

// categories: ordered category keys
categories // ["general", "files", "communication", …]
```

## Building a simple picker

```js
import { icons, getIcon } from 'neicon'

const q = 'arrow'
const matches = icons.filter(
  (i) => i.name.includes(q) || i.description.some((t) => t.includes(q)),
)

grid.innerHTML = matches
  .map((i) => `<button data-name="${i.name}">${getIcon(i.name, { size: 32 })}</button>`)
  .join('')
```

## TypeScript

Types ship with the package:

```ts
import { getIcon, type Variant, type IconMeta } from 'neicon'

const variant: Variant = 'B&W'
const svg: string | undefined = getIcon('check', { variant })
```

## Notes

- Each variant carries its own colors (colored = accent panel, b&w = white
  panel). `size` scales the icon but does not recolor it.
- The returned string is a complete `<svg>` element with a `0 0 96 96` viewBox.
