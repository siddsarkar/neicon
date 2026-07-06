# neicon

A small icon library in a **neubrutalism** (neo-brutalism) style — bold offset
frames, hard edges, high contrast. Each icon comes in a **colored** and a
**black & white** variant.

- **68 icons** across 9 categories (general, files, communication, commerce,
  media, charts, arrows, letters, numbers).
- **Single source of truth:** [`data/icon-data.json`](./data/icon-data.json).
- **`@neicon/react`:** tree-shakeable React components generated from that data.
- **Explorer app:** a Vite + React site (in [`src/`](./src)) to browse, search,
  and copy icons.

## Repo layout

```
neicon/
├─ data/
│  └─ icon-data.json        ← source of truth (categories → icons → variants)
├─ packages/
│  └─ react/                ← @neicon/react (generated components + metadata)
└─ src/                     ← the explorer web app (this Vite project)
```

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

The two `weights` entries are the two variants. `Colored` is the default the
React components render; `B&W` is served via the `monochrome` prop.

## Develop

```sh
bun install
bun run dev          # start the explorer app
bun run gen:icons    # regenerate @neicon/react components from data/icon-data.json
bun run build        # typecheck + build the explorer
bun run build:pkg    # build @neicon/react to packages/react/dist (for publishing)
```

Editing icons: change `data/icon-data.json`, then run `bun run gen:icons`.

See [`packages/react/README.md`](./packages/react/README.md) for the component API.
