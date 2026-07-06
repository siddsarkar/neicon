# Variants

Every neicon icon ships in **two variants**. They share the same neubrutalist
frame (bold offset border, hard edges) — only the inner panel differs.

| Variant     | Inner panel        | Use when…                                             |
| ----------- | ------------------ | ----------------------------------------------------- |
| `Colored`   | bright accent fill | the default — adds a pop of color, great on light UIs |
| `B&W`       | white fill         | you want a neutral, monochrome look                   |

The frame and glyph are black in both variants; only the panel behind the glyph
changes (a bright accent color vs. white). Neither variant follows `currentColor`
— the colors are intentional and baked in.

## Selecting a variant

**React** ([neicon-react](../react/usage.md)) — the `monochrome` prop:

```tsx
<Check />              // Colored (default)
<Check monochrome />   // B&W
```

**Vanilla** ([neicon](../javascript/usage.md)) — the `variant` option:

```js
getIcon('check')                        // Colored (default)
getIcon('check', { variant: 'B&W' })    // B&W
```

## In the data

In `icon-data.json` (and the published `iconData`), the variants live under each
icon's `weights` map:

```jsonc
"check": {
  "description": ["tick", "done", "confirm"],
  "weights": {
    "B&W":     { "code": "<svg>…</svg>" },
    "Colored": { "code": "<svg>…</svg>" }
  }
}
```
