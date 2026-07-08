# neicon-react

Neubrutalism-inspired icons — bold offset frames, hard edges, high contrast — as
tree-shakeable React components. Every icon ships in two variants — a **colored**
default and a **black & white** version — driven by a single `monochrome` prop.
For vanilla JS / raw SVG data, see [`neicon`](https://www.npmjs.com/package/neicon).

📖 Full docs: [react usage](https://github.com/siddsarkar/neicon/blob/main/docs/react/usage.md)
· [variants](https://github.com/siddsarkar/neicon/blob/main/docs/shared/variants.md)
· [icon catalog](https://github.com/siddsarkar/neicon/blob/main/docs/shared/icons.md)

## Install

```sh
npm i neicon-react
```

Requires `react >= 18` as a peer dependency.

Or straight from a CDN — no build step (esm.sh shares one React instance via `?deps`):

```html
<div id="app"></div>
<script type="module">
  import { createElement } from 'https://esm.sh/react@19'
  import { createRoot } from 'https://esm.sh/react-dom@19/client'
  import { Check } from 'https://esm.sh/neicon-react@0.1.0?deps=react@19'
  createRoot(document.getElementById('app')).render(createElement(Check, { size: 48 }))
</script>
```

## Usage

Import only the icons you use — the rest are tree-shaken away.

```tsx
import { Check, DownArrow } from 'neicon-react'

export function Example() {
  return (
    <>
      <Check />                      {/* colored, 24px */}
      <Check size={32} />            {/* custom size */}
      <Check monochrome />           {/* black & white variant */}
      <DownArrow className="nav" onClick={...} />
    </>
  )
}
```

### Props

Every icon accepts all native `<svg>` props, plus:

| Prop         | Type               | Default | Description                                  |
| ------------ | ------------------ | ------- | -------------------------------------------- |
| `size`       | `number \| string` | `24`    | Width & height. A number is pixels.          |
| `monochrome` | `boolean`          | `false` | Render the b&w variant instead of colored.   |

## Dynamic use / building tooling

For cases where the icon is chosen at runtime (search UIs, CMS-driven content),
import the registry and metadata from the `/all` subpath. Note this pulls the
whole set into your bundle, so prefer named imports for app code.

```tsx
import { iconComponents, icons, categories } from 'neicon-react/all'

const Icon = iconComponents['down-arrow']
<Icon size={40} monochrome />

// `icons` is an array of { name, component, category, description, variants }
// `categories` is the ordered list of category keys
```

## How it's built

Components are generated from the repo's single source of truth,
`data/icon-data.json`, by `scripts/generate.mjs`. To regenerate after the data
changes:

```sh
bun run gen:icons   # from the repo root
```
