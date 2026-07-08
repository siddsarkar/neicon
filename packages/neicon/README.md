# neicon

Neubrutalism-inspired icons — bold offset frames, hard edges, high contrast —
each in a **colored** default and a **black & white** variant, as
framework-agnostic SVG data. Use it in vanilla JS, or as the data layer behind a
framework wrapper. For React components, see
[`neicon-react`](https://www.npmjs.com/package/neicon-react).

📖 Full docs: [vanilla usage](https://github.com/siddsarkar/neicon/blob/main/docs/javascript/usage.md)
· [variants](https://github.com/siddsarkar/neicon/blob/main/docs/shared/variants.md)
· [icon catalog](https://github.com/siddsarkar/neicon/blob/main/docs/shared/icons.md)

- **68 icons** across 9 categories, in a neubrutalist / neo-brutalism style.
- Ships raw SVG strings + searchable metadata. No dependencies.

## Install

```sh
npm i neicon
```

Or straight from a CDN — no build step:

```html
<script type="module">
  import { getIcon } from 'https://cdn.jsdelivr.net/npm/neicon@0.1.0/+esm'
  document.body.innerHTML = getIcon('check', { size: 48 })
</script>
```

## Usage

```js
import { getIcon } from 'neicon'

// Inject an icon into the DOM
document.querySelector('#logo').innerHTML = getIcon('check', { size: 32 })

// Black & white variant
element.innerHTML = getIcon('down-arrow', { variant: 'B&W', size: 24 })
```

### API

```ts
getIcon(name, options?): string | undefined
//   name: kebab-case id, e.g. "down-arrow"
//   options.variant: "Colored" (default) | "B&W"
//   options.size:    number (px) | string — overrides width & height

iconData: Record<string, Record<Variant, string>>  // raw SVG by name → variant
icons:      IconMeta[]                              // { name, component, category, description, variants }
categories: readonly string[]                       // ordered category keys
```

## Browse

All icons, searchable, in the [explorer app](../../README.md).
