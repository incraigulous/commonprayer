import React from 'react';

export default {
  title: 'Foundations/Typography',
  parameters: {
    docs: { description: { component: 'Type system: three voices — Cormorant Garamond (display), EB Garamond (body/liturgy), and the UI sans stack.' } },
  },
};

const SCALE = [
  { token: '--text-5xl', px: 72,  label: 'text-5xl — Hero display' },
  { token: '--text-4xl', px: 52,  label: 'text-4xl — Display' },
  { token: '--text-3xl', px: 40,  label: 'text-3xl — Day / date' },
  { token: '--text-2xl', px: 30,  label: 'text-2xl — Office title' },
  { token: '--text-xl',  px: 24,  label: 'text-xl — Section heading' },
  { token: '--text-lg',  px: 20,  label: 'text-lg — Lead / emphasis' },
  { token: '--text-base',px: 17,  label: 'text-base — Liturgical body' },
  { token: '--text-sm',  px: 15,  label: 'text-sm — Metadata / labels' },
  { token: '--text-xs',  px: 13,  label: 'text-xs — Captions / page refs' },
];

function Rule() {
  return <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '2rem 0' }} />;
}

export const TypeScale = {
  name: 'Type Scale',
  render: () => (
    <div>
      {SCALE.map(({ token, px, label }) => (
        <div key={token} style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '0.25rem' }}>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--text-subtle)', minWidth: 110, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {px}px · {token}
            </span>
          </div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: `var(${token})`, color: 'var(--text)', lineHeight: 'var(--leading-heading)' }}>
            {label}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const FontFamilies = {
  name: 'Font Families',
  render: () => (
    <div>
      <section style={{ marginBottom: '3rem' }}>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.75rem' }}>
          Cormorant Garamond — Display / Titles
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', color: 'var(--text)', fontWeight: 400, marginBottom: 8 }}>
          Morning Prayer
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', color: 'var(--text)', fontWeight: 600, marginBottom: 8 }}>
          The Lord's Prayer
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', color: 'var(--text)', fontStyle: 'italic' }}>
          O Lord, open thou our lips
        </div>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--text-muted)', marginTop: 8, fontStyle: 'italic' }}>
          Regular · SemiBold · Italic — for office titles, headings, date displays
        </div>
      </section>

      <Rule />

      <section style={{ marginBottom: '3rem' }}>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.75rem' }}>
          EB Garamond — Liturgical Body & Scripture
        </div>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-base)', color: 'var(--text)', lineHeight: 'var(--leading-body)', maxWidth: '36rem', marginBottom: 8 }}>
          Almighty and most merciful Father, we have erred and strayed from your ways like lost sheep. We have followed too much the devices and desires of our own hearts. We have offended against your holy laws.
        </div>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-base)', color: 'var(--text)', lineHeight: 'var(--leading-body)', maxWidth: '36rem', fontStyle: 'italic' }}>
          The Lord is in his holy temple: let all the earth keep silence before him.
        </div>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--text-muted)', marginTop: 8, fontStyle: 'italic' }}>
          Regular · SemiBold · Italic — the reading voice; never used for UI chrome
        </div>
      </section>

      <Rule />

      <section style={{ marginBottom: '3rem' }}>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.75rem' }}>
          UI Sans — Chrome / Metadata Only
        </div>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', color: 'var(--text)', letterSpacing: '0.04em', marginBottom: 4 }}>
          MORNING PRAYER · PROPER 9 · JULY 6, 2026
        </div>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
          Officiant · People · Amen
        </div>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--text-muted)', marginTop: 8, fontStyle: 'italic' }}>
          System sans — used only for labels, badges, nav, metadata. Never for prayed text.
        </div>
      </section>

      <Rule />

      <section>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gilt)', marginBottom: '0.75rem' }}>
          Goudy Initialen — Illuminated Drop Caps
        </div>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-body)', color: 'var(--text)', maxWidth: '36rem' }}>
          <span style={{
            fontFamily: 'var(--font-initial)',
            fontSize: '3.4em',
            lineHeight: 0.72,
            float: 'left',
            marginRight: '0.12em',
            color: 'var(--gilt)',
          }}>O</span>
          Lord, open thou our lips. And our mouth shall shew forth thy praise. O God, make speed to save us. O Lord, make haste to help us. Glory be to the Father, and to the Son, and to the Holy Ghost.
        </p>
        <div style={{ clear: 'both', fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--text-muted)', marginTop: 8, fontStyle: 'italic' }}>
          Goudy Initialen — single-character drop caps only; gilt or rubric-red coloring
        </div>
      </section>
    </div>
  ),
};

export const Weights = {
  name: 'Weights & Styles',
  render: () => {
    const serif = [
      { weight: 400, style: 'normal',  label: 'Regular' },
      { weight: 400, style: 'italic',  label: 'Regular Italic' },
      { weight: 500, style: 'normal',  label: 'Medium' },
      { weight: 600, style: 'normal',  label: 'SemiBold' },
      { weight: 600, style: 'italic',  label: 'SemiBold Italic' },
      { weight: 700, style: 'normal',  label: 'Bold' },
    ];
    return (
      <div>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.5rem' }}>
          EB Garamond Weights
        </div>
        {serif.map(({ weight, style, label }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '0.75rem' }}>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--text-subtle)', minWidth: 160, letterSpacing: '0.04em' }}>
              {label} ({weight})
            </span>
            <span style={{ fontFamily: 'var(--font-serif)', fontWeight: weight, fontStyle: style, fontSize: 'var(--text-xl)', color: 'var(--text)', lineHeight: 1.2 }}>
              The Holy Spirit proceeds from the Father
            </span>
          </div>
        ))}

        <Rule />

        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.5rem' }}>
          Cormorant Garamond Weights
        </div>
        {serif.map(({ weight, style, label }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '0.75rem' }}>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--text-subtle)', minWidth: 160, letterSpacing: '0.04em' }}>
              {label} ({weight})
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: weight, fontStyle: style, fontSize: 'var(--text-xl)', color: 'var(--text)', lineHeight: 1.2 }}>
              Morning Prayer — The Invitatory
            </span>
          </div>
        ))}
      </div>
    );
  },
};

export const Tracking = {
  name: 'Letter Spacing',
  render: () => (
    <div>
      {[
        { token: '--tracking-tight',  value: '-0.01em', sample: 'O Lord, make haste to help us' },
        { token: '--tracking-normal', value: '0',        sample: 'The Lord is risen' },
        { token: '--tracking-wide',   value: '0.04em',   sample: 'Common Prayer' },
        { token: '--tracking-caps',   value: '0.16em',   sample: 'MORNING PRAYER · PROPER 9' },
      ].map(({ token, value, sample }) => (
        <div key={token} style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--text-subtle)', marginBottom: 4, letterSpacing: '0.04em' }}>
            {token} — {value}
          </div>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', color: 'var(--text)', letterSpacing: `var(${token})`, textTransform: token === '--tracking-caps' ? 'uppercase' : 'none' }}>
            {sample}
          </div>
        </div>
      ))}
    </div>
  ),
};
