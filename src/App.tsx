import { useMemo, useState, type CSSProperties } from 'react'
import { iconComponents, icons, categories } from 'neicon-react/all'
import './App.css'

const SIZES = [24, 32, 48] as const
const CATEGORY_LABELS: Record<string, string> = {
  general: 'General',
  files: 'Files',
  communication: 'Communication',
  commerce: 'Commerce',
  media: 'Media',
  charts: 'Charts',
  arrows: 'Arrows',
  letters: 'Letters',
  numbers: 'Numbers',
}

// Curated showcase for the hero sticker wall — recognizable icons spanning
// most categories. Tilt values are fixed per position so the wall is stable.
const HERO_STICKERS: { name: string; tilt: number }[] = [
  { name: 'check', tilt: -4 },
  { name: 'bookmark', tilt: 3 },
  { name: 'mail', tilt: -2 },
  { name: 'play', tilt: 4 },
  { name: 'folder', tilt: -3 },
  { name: 'pie-chart', tilt: 2 },
  { name: 'credit-card', tilt: -2 },
  { name: 'photo', tilt: 3 },
  { name: 'up-arrow', tilt: -4 },
  { name: 'message', tilt: 2 },
  { name: 'download', tilt: -3 },
  { name: 'hashtag', tilt: 4 },
]

const REACT_SNIPPET = `import { Check, DownArrow } from 'neicon-react'

<Check />              // colored (default)
<Check monochrome />   // black & white
<Check size={32} />    // any size`

const VANILLA_SNIPPET = `import { getIcon } from 'neicon'

el.innerHTML = getIcon('check', { size: 32 })
el.innerHTML = getIcon('check', { variant: 'B&W' })`

const CDN_SNIPPET = `<script type="module">
  import { getIcon } from
    'https://cdn.jsdelivr.net/npm/neicon/+esm'

  el.innerHTML = getIcon('check', { size: 48 })
</script>`

function App() {
  const [query, setQuery] = useState('')
  const [mono, setMono] = useState(false)
  const [size, setSize] = useState<number>(48)
  const [copied, setCopied] = useState<string | null>(null)

  const q = query.trim().toLowerCase()
  const BrandIcon = iconComponents['apps']

  const grouped = useMemo(() => {
    const match = icons.filter((icon) => {
      if (!q) return true
      const haystack = [
        icon.name,
        icon.component,
        icon.category,
        ...icon.description,
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
    return categories
      .map((cat) => ({
        category: cat,
        label: CATEGORY_LABELS[cat] ?? cat,
        items: match.filter((i) => i.category === cat),
      }))
      .filter((g) => g.items.length > 0)
  }, [q])

  const total = grouped.reduce((n, g) => n + g.items.length, 0)

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      window.setTimeout(() => setCopied((c) => (c === key ? null : c)), 1400)
    } catch {
      setCopied(null)
    }
  }

  return (
    <div className="app" id="top">
      <nav className="nav">
        <a className="wordmark" href="#top">
          <span className="wordmark-mark" aria-hidden="true">
            <BrandIcon size={24} monochrome />
          </span>
          neicon
        </a>
        <div className="nav-links">
          <a
            className="pill-link"
            href="https://github.com/siddsarkar/neicon"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
          <a
            className="pill-link"
            href="https://www.npmjs.com/package/neicon-react"
            target="_blank"
            rel="noreferrer"
          >
            npm ↗
          </a>
          <a className="pill-link pill-link--solid" href="#browse">
            Browse icons ↓
          </a>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            {icons.length} icons · React · Vanilla · CDN · MIT
          </p>
          <h1 className="hero-title">
            Grab an icon.
            <br />
            Ship it.
          </h1>
          <p className="hero-sub">
            neicon is {icons.length} neubrutalism-styled icons for React, vanilla
            JS, or a CDN one-liner. Search below, click any tile, and the import
            lands on your clipboard.
          </p>
          <div className="hero-actions">
            <button
              type="button"
              className="cmd"
              onClick={() => copy('npm i neicon-react', 'hero-npm')}
              title="Copy install command"
            >
              <span className="cmd-prompt">$</span>
              <span className="cmd-text">
                {copied === 'hero-npm' ? 'copied to clipboard' : 'npm i neicon-react'}
              </span>
            </button>
            <a className="btn-ghost" href="#browse">
              Browse all {icons.length}
            </a>
          </div>
        </div>

        <div className="hero-stickers" aria-hidden="true">
          {HERO_STICKERS.map(({ name, tilt }) => {
            const Sticker = iconComponents[name]
            if (!Sticker) return null
            return (
              <span
                key={name}
                className="sticker"
                style={{ '--tilt': `${tilt}deg` } as CSSProperties}
              >
                <Sticker size={40} />
              </span>
            )
          })}
        </div>
      </header>

      <section className="usage" aria-label="Install and usage">
        {[
          { lang: 'React', pill: 'npm i neicon-react', pillCopy: 'npm i neicon-react', snippet: REACT_SNIPPET, key: 'react' },
          { lang: 'Vanilla JS', pill: 'npm i neicon', pillCopy: 'npm i neicon', snippet: VANILLA_SNIPPET, key: 'vanilla' },
          { lang: 'CDN · no build', pill: 'jsdelivr +esm', pillCopy: 'https://cdn.jsdelivr.net/npm/neicon/+esm', snippet: CDN_SNIPPET, key: 'cdn' },
        ].map(({ lang, pill, pillCopy, snippet, key }) => (
          <article key={key} className="usage-card">
            <header className="usage-head">
              <span className="usage-lang">{lang}</span>
              <button
                type="button"
                className="install"
                onClick={() => copy(pillCopy, `i-${key}`)}
                title={`Copy: ${pillCopy}`}
              >
                {copied === `i-${key}` ? '✓ copied' : pill}
              </button>
            </header>
            <pre className="snippet">
              <button
                type="button"
                className="copy-code"
                onClick={() => copy(snippet, `u-${key}`)}
              >
                {copied === `u-${key}` ? 'Copied!' : 'Copy'}
              </button>
              <code>{snippet}</code>
            </pre>
          </article>
        ))}
      </section>

      <div className="toolbar" id="browse">
        <div className="searchbar">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 68 icons — try “arrow”, “chart”, “letter a”…"
            aria-label="Search icons"
          />
          <span className="count">
            {total} {total === 1 ? 'result' : 'results'}
          </span>
        </div>

        <div className="controls">
          <div className="segmented" role="group" aria-label="Variant">
            <button
              type="button"
              className={!mono ? 'active' : ''}
              onClick={() => setMono(false)}
            >
              Colored
            </button>
            <button
              type="button"
              className={mono ? 'active' : ''}
              onClick={() => setMono(true)}
            >
              B&amp;W
            </button>
          </div>
          <div className="segmented" role="group" aria-label="Size">
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                className={size === s ? 'active' : ''}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="results">
        {grouped.length === 0 && (
          <div className="empty">
            <p>No icons match “{query}”.</p>
            <button type="button" onClick={() => setQuery('')}>
              Clear search
            </button>
          </div>
        )}

        {grouped.map((group) => (
          <section key={group.category} className="group">
            <h2>
              <span className="group-label">{group.label}</span>
              <span className="group-count">{group.items.length}</span>
            </h2>
            <div className="grid">
              {group.items.map((icon) => {
                const Icon = iconComponents[icon.name]
                const isCopied = copied === icon.component
                return (
                  <button
                    key={icon.name}
                    type="button"
                    className={`tile${isCopied ? ' copied' : ''}`}
                    onClick={() =>
                      copy(`import { ${icon.component} } from 'neicon-react'`, icon.component)
                    }
                    title={`Click to copy: import { ${icon.component} } from 'neicon-react'`}
                    aria-label={`${icon.component} icon. Click to copy import.`}
                  >
                    <span className="tile-icon">
                      <Icon size={size} monochrome={mono} />
                    </span>
                    <span className="tile-name">
                      {isCopied ? 'Copied!' : icon.name}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>
        ))}
      </main>

      <footer className="foot">
        <span className="foot-mark" aria-hidden="true">
          <BrandIcon size={20} monochrome />
        </span>
        <code>import {'{ '}Check, DownArrow{' }'} from 'neicon-react'</code>
        <span className="foot-meta">MIT · v0.1.0</span>
      </footer>
    </div>
  )
}

export default App
