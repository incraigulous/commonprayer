import React from 'react';

export default {
  title: 'Foundations/Effects',
  parameters: {
    docs: { description: { component: 'Radii, border widths, shadows, focus rings, and motion tokens — the ruled-parchment visual language.' } },
  },
};

function Row({ children }) {
  return <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>{children}</div>;
}

function Label({ children }) {
  return (
    <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', color: 'var(--text)', fontWeight: 600, marginBottom: '1rem' }}>
      {children}
    </div>
  );
}

function Token({ name }) {
  return <code style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--accent)' }}>{name}</code>;
}

export const BorderRadii = {
  name: 'Border Radii',
  render: () => {
    const radii = [
      { token: '--radius-none', value: '0px',   label: 'none' },
      { token: '--radius-sm',   value: '2px',   label: 'sm' },
      { token: '--radius-md',   value: '4px',   label: 'md' },
      { token: '--radius-lg',   value: '8px',   label: 'lg' },
      { token: '--radius-xl',   value: '12px',  label: 'xl' },
      { token: '--radius-pill', value: '999px', label: 'pill' },
    ];
    return (
      <div>
        <p style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '1.5rem' }}>
          Restrained radii — this is ruled parchment, not soft UI. Cards and inputs read as ruled leaves.
        </p>
        <Row>
          {radii.map(({ token, value, label }) => (
            <div key={token} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 72, height: 72,
                background: 'var(--surface-raised)',
                border: '1px solid var(--border-strong)',
                borderRadius: `var(${token})`,
              }} />
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--text-muted)', textAlign: 'center' }}>
                {token.replace('--radius-', '')}<br />
                <span style={{ color: 'var(--text-subtle)' }}>{value}</span>
              </div>
            </div>
          ))}
        </Row>
      </div>
    );
  },
};

export const BorderWidths = {
  name: 'Border Widths',
  render: () => {
    const borders = [
      { token: '--border-hair',  value: '1px',   label: 'Hairline — default ruled line', note: 'Used on cards, inputs, dividers' },
      { token: '--border-rule',  value: '1.5px', label: 'Rule — section lines',          note: 'Used on section rules, scripture left-edge' },
      { token: '--border-frame', value: '2px',   label: 'Frame — illuminated borders',  note: 'Used on gilt-framed elements' },
    ];
    return (
      <div>
        {borders.map(({ token, value, label, note }) => (
          <div key={token} style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: 8 }}>
              <div style={{ width: 120, height: 0, borderTop: `${value} solid var(--text)` }} />
              <div>
                <div style={{ fontFamily: 'monospace', fontSize: 13, color: 'var(--text)', marginBottom: 2 }}>{token} — {value}</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic' }}>{label}</div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--text-subtle)', marginTop: 2 }}>{note}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const Shadows = {
  name: 'Shadows & Rings',
  render: () => (
    <div>
      <Label>Elevation Shadows</Label>
      <p style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '1.5rem' }}>
        Barely-there elevation over the night ground.
      </p>
      <Row>
        {[
          { token: '--shadow-sm',  label: 'sm — subtle lift' },
          { token: '--shadow-md',  label: 'md — modal / card' },
          { token: '--shadow-lg',  label: 'lg — sheet / drawer' },
        ].map(({ token, label }) => (
          <div key={token} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 80, height: 80,
              background: 'var(--surface-raised)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: `var(${token})`,
            }} />
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--text-muted)', textAlign: 'center' }}>
              {token.replace('--', '')}<br />
              <span style={{ color: 'var(--text-subtle)', fontSize: 10 }}>{label}</span>
            </div>
          </div>
        ))}
      </Row>

      <Label>Gilt Inset (Illuminated Frames)</Label>
      <Row>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}>
          <div style={{
            width: 120, height: 80,
            background: 'var(--surface-raised)',
            border: '1px solid var(--gilt)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-gilt-inset)',
          }} />
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--text-muted)' }}>
            --shadow-gilt-inset<br />
            <span style={{ color: 'var(--text-subtle)', fontSize: 10 }}>Double-rule gilt frame effect</span>
          </div>
        </div>
      </Row>

      <Label>Focus Ring</Label>
      <Row>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}>
          <button style={{
            background: 'var(--accent)', color: 'var(--text-on-accent)',
            border: 'none', borderRadius: 'var(--radius-md)',
            padding: '0.6rem 1.25rem',
            fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)',
            cursor: 'pointer',
            boxShadow: 'var(--focus-ring)',
          }}>
            Focused button
          </button>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--text-muted)' }}>
            --focus-ring — 3px ring in --ring color
          </div>
        </div>
      </Row>
    </div>
  ),
};

export const Motion = {
  name: 'Motion Tokens',
  render: () => {
    const [hover, setHover] = React.useState({});
    const toggleHover = (key, on) => setHover(h => ({ ...h, [key]: on }));

    const durations = [
      { token: '--dur-fast', value: '120ms', note: 'Micro-interactions (hover state transitions)' },
      { token: '--dur-base', value: '200ms', note: 'Standard transitions (cards, modals)' },
      { token: '--dur-slow', value: '360ms', note: 'Slow reveals (sheets, drawers, onboarding)' },
    ];
    const eases = [
      { token: '--ease-standard', value: 'cubic-bezier(0.4, 0, 0.2, 1)', note: 'Standard — most transitions' },
      { token: '--ease-out',      value: 'cubic-bezier(0.16, 1, 0.3, 1)',  note: 'Ease-out — elements entering the screen' },
    ];
    return (
      <div>
        <p style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '2rem' }}>
          Unhurried, contemplative motion. Nothing snaps; nothing lingers.
        </p>

        <Label>Durations</Label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
          {durations.map(({ token, value, note }) => {
            const key = token;
            const active = hover[key];
            return (
              <div
                key={token}
                style={{
                  padding: '1rem 1.25rem',
                  background: active ? 'var(--surface-hover)' : 'var(--surface-raised)',
                  border: '1px solid var(--border)',
                  borderRadius: 4,
                  cursor: 'default',
                  transition: `background ${value} var(--ease-standard)`,
                }}
                onMouseEnter={() => toggleHover(key, true)}
                onMouseLeave={() => toggleHover(key, false)}
              >
                <div style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--accent)', marginBottom: 4 }}>{token}</div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--text)', fontWeight: 600, marginBottom: 4 }}>{value}</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic' }}>{note}</div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--text-subtle)', marginTop: 6 }}>Hover to preview</div>
              </div>
            );
          })}
        </div>

        <Label>Easing Curves</Label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
          {eases.map(({ token, value, note }) => (
            <div key={token} style={{
              padding: '1rem 1.25rem',
              background: 'var(--surface-raised)',
              border: '1px solid var(--border)',
              borderRadius: 4,
            }}>
              <div style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--accent)', marginBottom: 4 }}>{token}</div>
              <div style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--text)', marginBottom: 6 }}>{value}</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic' }}>{note}</div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
