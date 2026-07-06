# neicon

A small icon library in a **neubrutalism** (neo-brutalism) style — bold offset
frames, hard edges, high contrast. Each icon comes in a **colored** and a
**black & white** variant.

- **68 icons** across 9 categories (general, files, communication, commerce,
  media, charts, arrows, letters, numbers).
- **Single source of truth:** [`data/icon-data.json`](./data/icon-data.json).
- **[`neicon`](https://www.npmjs.com/package/neicon):** framework-agnostic SVG
  data + `getIcon()` for vanilla JS.
- **[`neicon-react`](https://www.npmjs.com/package/neicon-react):**
  tree-shakeable React components.
- **Explorer app:** a Vite + React site (in [`src/`](./src)) to browse, search,
  and copy icons.

## Docs

- [React usage](./docs/react/usage.md) — `neicon-react`
- [Vanilla JS usage](./docs/javascript/usage.md) — `neicon`
- [Variants](./docs/shared/variants.md) · [Icon catalog](./docs/shared/icons.md)

## Repo layout

```
neicon/
├─ data/
│  └─ icon-data.json          ← source of truth (categories → icons → variants)
├─ docs/                      ← usage docs (react / javascript / shared)
├─ packages/
│  ├─ neicon/                 ← "neicon" — vanilla SVG data + getIcon()
│  └─ neicon-react/           ← "neicon-react" — React components
└─ src/                       ← the explorer web app (this Vite project)
```

Each package generates its sources from `data/icon-data.json` via its own
`scripts/generate.mjs`.

## Data shape

```jsonc
{
  "categories": {
    "general": {
      "icons": {
        "check": {
          "description": ["tick", "done", "confirm"],   // search tags (optional)
          "weights": {
            "B&W":     { "code": "<svg>…</svg>" },
            "Colored": { "code": "<svg>…</svg>" }
          }
        }
      }
    }
  }
}
```

The two `weights` entries are the two [variants](./docs/shared/variants.md).
`Colored` is the default; `B&W` is served via the React `monochrome` prop / the
vanilla `{ variant: 'B&W' }` option.

## Develop

```sh
bun install
bun run dev          # build the packages, then start the explorer app
bun run gen:icons    # regenerate both packages from data/icon-data.json
bun run build        # build packages + typecheck + build the explorer
bun run build:pkg    # build neicon + neicon-react to their dist/ (for publishing)
```

Editing icons: change `data/icon-data.json`, then run `bun run gen:icons`.

See [`packages/neicon`](./packages/neicon/README.md) and
[`packages/neicon-react`](./packages/neicon-react/README.md) for each package's API.
