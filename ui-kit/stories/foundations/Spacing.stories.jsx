import React from 'react';

export default {
  title: 'Foundations/Spacing',
  parameters: {
    docs: { description: { component: 'Spacing scale (4px base), reading measure, and component-level padding tokens.' } },
  },
};

const SCALE = [
  { token: '--space-1',  px: 4   },
  { token: '--space-2',  px: 8   },
  { token: '--space-3',  px: 12  },
  { token: '--space-4',  px: 16  },
  { token: '--space-5',  px: 24  },
  { token: '--space-6',  px: 32  },
  { token: '--space-7',  px: 40  },
  { token: '--space-8',  px: 48  },
  { token: '--space-9',  px: 64  },
  { token: '--space-10', px: 80  },
  { token: '--space-12', px: 96  },
];

export const SpaceScale = {
  name: 'Space Scale',
  render: () => (
    <div>
      <p style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '2rem' }}>
        4px base unit. All spacing and rhythm derives from multiples of this base.
      </p>
      {SCALE.map(({ token, px }) => (
        <div key={token} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
          <span style={{ fontFamily: 'monospace', fontSize: 13, color: 'var(--text-muted)', minWidth: 120 }}>{token}</span>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--text-subtle)', minWidth: 36 }}>{px}px</span>
          <div style={{ height: 20, width: px, background: 'var(--accent)', borderRadius: 2 }} />
        </div>
      ))}
    </div>
  ),
};

export const ReadingMeasure = {
  name: 'Reading Measure',
  render: () => (
    <div>
      <p style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '2rem' }}>
        <code>--measure: 36rem (~66ch)</code> — the ideal liturgy column. All reading content is constrained to this width for sustained reading comfort.
      </p>

      <div style={{ position: 'relative', marginBottom: '3rem' }}>
        <div style={{
          width: '36rem', maxWidth: '100%',
          borderTop: '2px solid var(--accent)',
          borderBottom: '2px solid var(--accent)',
          padding: '1.5rem',
          background: 'var(--surface-raised)',
        }}>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.75rem' }}>
            36rem — var(--measure)
          </div>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-body)', color: 'var(--text)', margin: 0 }}>
            Almighty and most merciful Father, we have erred and strayed from your ways like lost sheep. We have followed too much the devices and desires of our own hearts. We have offended against your holy laws.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        {[
          { token: '--measure',      value: '36rem', desc: 'Ideal liturgy column' },
          { token: '--measure-wide', value: '46rem', desc: 'Wide reading panels' },
          { token: '--gutter',       value: '1.5rem', desc: 'Mobile screen edge' },
          { token: '--gutter-lg',    value: '2.5rem', desc: 'Tablet/desktop edge' },
        ].map(({ token, value, desc }) => (
          <div key={token} style={{
            padding: '1rem 1.25rem',
            background: 'var(--surface-raised)',
            border: '1px solid var(--border)',
            borderRadius: 4,
            minWidth: 180,
          }}>
            <div style={{ fontFamily: 'monospace', fontSize: 13, color: 'var(--text)', marginBottom: 4 }}>{token}</div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 16, color: 'var(--accent)', fontWeight: 600, marginBottom: 4 }}>{value}</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic' }}>{desc}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const ComponentPadding = {
  name: 'Component Padding',
  render: () => {
    const tokens = [
      { token: '--pad-card',    value: '1.5rem (24px)',  desc: 'Card inner padding' },
      { token: '--pad-field-y', value: '0.65rem (~10px)', desc: 'Field vertical padding' },
      { token: '--pad-field-x', value: '0.9rem (~14px)',  desc: 'Field horizontal padding' },
      { token: '--pad-btn-y',   value: '0.6rem (~10px)',  desc: 'Button vertical padding' },
      { token: '--pad-btn-x',   value: '1.25rem (20px)', desc: 'Button horizontal padding' },
      { token: '--stack-para',  value: '1rem (16px)',    desc: 'Between liturgy paragraphs' },
      { token: '--stack-block', value: '2rem (32px)',    desc: 'Between offices / sections' },
    ];
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
        {tokens.map(({ token, value, desc }) => (
          <div key={token} style={{
            padding: '1rem 1.25rem',
            background: 'var(--surface-raised)',
            border: '1px solid var(--border)',
            borderRadius: 4,
          }}>
            <div style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--accent)', marginBottom: 4 }}>{token}</div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--text)', fontWeight: 600, marginBottom: 4 }}>{value}</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic' }}>{desc}</div>
          </div>
        ))}
      </div>
    );
  },
};
