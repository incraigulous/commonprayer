import React from 'react';

export default {
  title: 'Foundations/Colors',
  parameters: {
    docs: { description: { component: 'The complete Common Prayer color palette — raw scales and semantic aliases.' } },
  },
};

function Swatch({ varName, hex, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 80 }}>
      <div
        title={hex || varName}
        style={{
          width: 72,
          height: 72,
          borderRadius: 4,
          background: hex || `var(${varName})`,
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
        }}
      />
      <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.3, letterSpacing: '0.04em' }}>
        {label || varName}
      </span>
      {hex && (
        <span style={{ fontFamily: 'monospace', fontSize: 10, color: 'var(--text-subtle)' }}>{hex}</span>
      )}
    </div>
  );
}

function SwatchRow({ title, swatches }) {
  return (
    <section style={{ marginBottom: '2.5rem' }}>
      <h3 style={{
        fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)',
        color: 'var(--text)', marginBottom: '1rem', fontWeight: 600,
      }}>{title}</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
        {swatches.map((s) => (
          <Swatch key={s.varName || s.hex} {...s} />
        ))}
      </div>
    </section>
  );
}

function SemanticRow({ varName }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
      <div style={{
        width: 40, height: 40, borderRadius: 4,
        background: `var(${varName})`,
        border: '1px solid rgba(128,128,128,0.25)',
        flexShrink: 0,
      }} />
      <span style={{ fontFamily: 'monospace', fontSize: 13, color: 'var(--text-muted)' }}>{varName}</span>
    </div>
  );
}

export const RawPalette = {
  name: 'Raw Palette',
  render: () => (
    <div>
      <SwatchRow
        title="Ink Neutrals — Night Ground"
        swatches={[
          { varName: '--ink-950', hex: '#04070f', label: 'ink-950 (app bg)' },
          { varName: '--ink-900', hex: '#0a0e1a', label: 'ink-900' },
          { varName: '--ink-850', hex: '#121826', label: 'ink-850' },
          { varName: '--ink-800', hex: '#1a2130', label: 'ink-800' },
          { varName: '--ink-750', hex: '#212a3a', label: 'ink-750' },
          { varName: '--ink-700', hex: '#2a3446', label: 'ink-700' },
          { varName: '--ink-600', hex: '#3a4658', label: 'ink-600' },
          { varName: '--ink-500', hex: '#566073', label: 'ink-500' },
          { varName: '--ink-400', hex: '#9ca2ad', label: 'ink-400' },
          { varName: '--ink-300', hex: '#c6cad2', label: 'ink-300' },
          { varName: '--ink-200', hex: '#dfe1e6', label: 'ink-200' },
        ]}
      />
      <SwatchRow
        title="Vellum — Warm Paper"
        swatches={[
          { varName: '--vellum-text', hex: '#ece7db', label: 'vellum-text (body)' },
          { varName: '--vellum-200', hex: '#e9e0c9', label: 'vellum-200' },
          { varName: '--vellum-100', hex: '#f4eedeF', label: 'vellum-100' },
          { varName: '--vellum-50', hex: '#faf6ec', label: 'vellum-50' },
        ]}
      />
      <SwatchRow
        title="Rubric Red — Liturgical Accent"
        swatches={[
          { varName: '--rubric-300', hex: '#eca192', label: 'rubric-300' },
          { varName: '--rubric-400', hex: '#e27563', label: 'rubric-400' },
          { varName: '--rubric-500', hex: '#d65846', label: 'rubric-500 ★' },
          { varName: '--rubric-600', hex: '#bf4835', label: 'rubric-600' },
          { varName: '--rubric-700', hex: '#9c3626', label: 'rubric-700' },
        ]}
      />
      <SwatchRow
        title="Illuminated Gold — Gilt Ornament"
        swatches={[
          { varName: '--gold-300', hex: '#e2c887', label: 'gold-300' },
          { varName: '--gold-400', hex: '#d3ad5c', label: 'gold-400' },
          { varName: '--gold-500', hex: '#c9a24b', label: 'gold-500 ★' },
          { varName: '--gold-600', hex: '#a9843a', label: 'gold-600' },
        ]}
      />
      <SwatchRow
        title="Sage — Ordinary Time"
        swatches={[
          { varName: '--sage-400', hex: '#94ad87', label: 'sage-400' },
          { varName: '--sage-500', hex: '#7f9a72', label: 'sage-500 ★' },
          { varName: '--sage-600', hex: '#5f7d53', label: 'sage-600' },
          { varName: '--sage-700', hex: '#4a6540', label: 'sage-700' },
        ]}
      />
      <SwatchRow
        title="Violet — Advent & Lent"
        swatches={[
          { varName: '--violet-400', hex: '#9789b3', label: 'violet-400' },
          { varName: '--violet-500', hex: '#7d6f9c', label: 'violet-500 ★' },
          { varName: '--violet-600', hex: '#675889', label: 'violet-600' },
          { varName: '--violet-700', hex: '#524570', label: 'violet-700' },
        ]}
      />
    </div>
  ),
};

export const SemanticAliases = {
  name: 'Semantic Aliases',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 3rem' }}>
      <div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', color: 'var(--text)', marginBottom: '1rem', fontWeight: 600 }}>
          Surfaces
        </h3>
        {['--bg', '--surface', '--surface-sunk', '--surface-raised', '--surface-hover'].map(v => (
          <SemanticRow key={v} varName={v} />
        ))}

        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', color: 'var(--text)', margin: '1.5rem 0 1rem', fontWeight: 600 }}>
          Borders
        </h3>
        {['--border', '--border-strong', '--hairline'].map(v => (
          <SemanticRow key={v} varName={v} />
        ))}
      </div>

      <div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', color: 'var(--text)', marginBottom: '1rem', fontWeight: 600 }}>
          Text
        </h3>
        {['--text', '--text-muted', '--text-subtle', '--text-inverse', '--text-on-accent'].map(v => (
          <SemanticRow key={v} varName={v} />
        ))}

        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', color: 'var(--text)', margin: '1.5rem 0 1rem', fontWeight: 600 }}>
          Accent & Gilt
        </h3>
        {['--accent', '--accent-hover', '--accent-press', '--accent-quiet', '--gilt', '--gilt-quiet', '--ring'].map(v => (
          <SemanticRow key={v} varName={v} />
        ))}
      </div>
    </div>
  ),
};

export const SeasonalAccents = {
  name: 'Seasonal Accents',
  render: () => {
    const seasons = [
      { id: 'none',      label: 'Base (no season)', desc: 'Rubric red on dark, sage on light' },
      { id: 'ordinary',  label: 'Ordinary Time',    desc: 'Sage green — the manuscript mark' },
      { id: 'epiphany',  label: 'Epiphany',         desc: 'Sage green — same as Ordinary' },
      { id: 'advent',    label: 'Advent',            desc: 'Violet — penitential preparation' },
      { id: 'lent',      label: 'Lent',              desc: 'Deep violet — fasting season' },
      { id: 'christmas', label: 'Christmas',         desc: 'Gold — the feast of the Nativity' },
      { id: 'easter',    label: 'Easter',            desc: 'Gold — the great feast' },
      { id: 'pentecost', label: 'Pentecost',         desc: 'Rubric red — fire of the Spirit' },
    ];
    return (
      <div>
        <p style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-muted)', marginBottom: '2rem', fontStyle: 'italic' }}>
          Toggle the Season toolbar above to preview. Below, each swatch shows the accent for that season (applied via <code>data-season</code> attribute).
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
          {seasons.map(s => (
            <div key={s.id} data-season={s.id !== 'none' ? s.id : undefined} style={{ minWidth: 140 }}>
              <div style={{
                width: 72, height: 72, borderRadius: 4,
                background: 'var(--accent)',
                marginBottom: 8,
                boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
              }} />
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text)', marginBottom: 2 }}>
                {s.label}
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic' }}>
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
