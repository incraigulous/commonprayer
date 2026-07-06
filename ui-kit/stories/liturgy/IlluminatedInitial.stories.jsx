import React from 'react';
import { IlluminatedInitial } from '../../components/liturgy/IlluminatedInitial.jsx';

export default {
  title: 'Liturgy/IlluminatedInitial',
  component: IlluminatedInitial,
  tags: ['autodocs'],
  argTypes: {
    letter: { control: 'text' },
    variant: {
      control: 'select',
      options: ['gilt', 'rubric', 'ink'],
      description: 'gilt = illuminated gold · rubric = accent red · ink = body text color',
    },
    boxed: {
      control: 'boolean',
      description: 'Adds a manuscript-style frame around the initial',
    },
    children: {
      control: 'text',
      description: 'The body text — everything after the drop-cap letter',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
An illuminated drop-cap opening a prayer, psalm, or reading. The cap floats left; body text wraps around it for the first three lines, then flows normally below.

**Goudy Initialen** — a decorative foliate initial face — is used for the cap letter. Use only for single characters, never words.

\`letter\` is the drop-cap character. \`children\` is everything that follows it in the same paragraph — including the rest of the opening word. Subsequent paragraphs are plain \`<p>\` tags placed after the component.
        `,
      },
    },
  },
};

// --- Shared passages long enough to show the float wrapping clearly --------

const COLLECT =
  `lmighty God, to you all hearts are open, all desires known, and from you no secrets are hid: Cleanse the thoughts of our hearts by the inspiration of your Holy Spirit, that we may perfectly love you, and worthily magnify your holy Name; through Christ our Lord. Amen.`;

const CONFESSION =
  `lmighty and most merciful Father, we have erred and strayed from your ways like lost sheep. We have followed too much the devices and desires of our own hearts. We have offended against your holy laws. We have left undone those things which we ought to have done; and we have done those things which we ought not to have done; and there is no health in us.`;

const PSALM_23 =
  `he Lord is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake. Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.`;

const BENEDICITE =
  `less the Lord, all you works of the Lord: praise him and magnify him for ever. O ye Angels of the Lord, bless ye the Lord: praise him and magnify him for ever. O ye Heavens, bless ye the Lord: praise him and magnify him for ever. O ye Waters that be above the firmament, bless ye the Lord.`;

// --- Stories ---------------------------------------------------------------

export const ParagraphWrap = {
  name: 'Paragraph Wrap — Float',
  render: () => (
    <div style={{ maxWidth: '36rem' }}>
      <p style={{
        fontFamily: 'var(--font-ui)', fontSize: 11,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        color: 'var(--text-subtle)', marginBottom: '1.5rem',
      }}>
        The cap floats left; body text wraps around it for the first three
        lines, then flows normally below.
      </p>

      <IlluminatedInitial letter="A" variant="gilt">
        {COLLECT}
      </IlluminatedInitial>

      <p style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'var(--text-base)',
        lineHeight: 'var(--leading-body)',
        color: 'var(--text)',
        marginTop: 'var(--space-4)',
      }}>
        Almighty and most merciful Father, we have erred and strayed from your
        ways like lost sheep. We have followed too much the devices and desires
        of our own hearts.
      </p>

      <p style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'var(--text-base)',
        lineHeight: 'var(--leading-body)',
        color: 'var(--text)',
        marginTop: 'var(--space-4)',
      }}>
        We have left undone those things which we ought to have done; and we
        have done those things which we ought not to have done; and there is no
        health in us.
      </p>
    </div>
  ),
};

export const BoxedParagraphWrap = {
  name: 'Paragraph Wrap — Boxed',
  render: () => (
    <div style={{ maxWidth: '36rem' }}>
      <p style={{
        fontFamily: 'var(--font-ui)', fontSize: 11,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        color: 'var(--text-subtle)', marginBottom: '1.5rem',
      }}>
        Boxed variant — framed initial with the same float wrap.
      </p>

      <IlluminatedInitial letter="A" variant="gilt" boxed>
        {COLLECT}
      </IlluminatedInitial>

      <p style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'var(--text-base)',
        lineHeight: 'var(--leading-body)',
        color: 'var(--text)',
        marginTop: 'var(--space-4)',
      }}>
        Almighty and most merciful Father, we have erred and strayed from your
        ways like lost sheep. We have followed too much the devices and desires
        of our own hearts. We have offended against your holy laws.
      </p>
    </div>
  ),
};

export const InOfficeContext = {
  name: 'In Office Context',
  render: () => (
    <div style={{ maxWidth: '36rem' }}>

      {/* Section heading */}
      <div style={{ marginBottom: 'var(--space-5)' }}>
        <p style={{
          fontFamily: 'var(--font-ui)', fontSize: 'var(--text-xs)',
          letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase',
          color: 'var(--accent)', margin: '0 0 var(--space-2)',
        }}>
          Morning Prayer · Rite II
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 600,
          fontSize: 'var(--text-2xl)', lineHeight: 'var(--leading-heading)',
          color: 'var(--text)', margin: 0,
        }}>
          The Collect for Purity
        </h2>
        <span style={{
          display: 'block', width: '2.5rem', height: '1.5px',
          background: 'var(--accent)', marginTop: 'var(--space-3)',
        }} />
      </div>

      {/* Rubric */}
      <p style={{
        fontFamily: 'var(--font-serif)', fontStyle: 'italic',
        color: 'var(--accent)', fontSize: 'var(--text-base)',
        lineHeight: 'var(--leading-body)', margin: '0 0 var(--space-4)',
      }}>
        The Officiant may say the following Collect.
      </p>

      {/* Drop-cap paragraph */}
      <IlluminatedInitial letter="A" variant="gilt">
        {COLLECT}
      </IlluminatedInitial>

      {/* Hairline rule */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 'var(--space-4)',
        margin: 'var(--space-6) 0', color: 'var(--gilt)',
      }}>
        <span style={{ flex: 1, borderTop: '1px solid var(--border-strong)' }} />
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem' }}>✠</span>
        <span style={{ flex: 1, borderTop: '1px solid var(--border-strong)' }} />
      </div>

      {/* Continuation */}
      <h3 style={{
        fontFamily: 'var(--font-display)', fontWeight: 600,
        fontSize: 'var(--text-xl)', lineHeight: 'var(--leading-heading)',
        color: 'var(--text)', margin: '0 0 var(--space-3)',
      }}>
        The Confession of Sin
      </h3>
      <p style={{
        fontFamily: 'var(--font-serif)', fontStyle: 'italic',
        color: 'var(--accent)', fontSize: 'var(--text-base)',
        lineHeight: 'var(--leading-body)', margin: '0 0 var(--space-4)',
      }}>
        The Deacon or Officiant says, all kneeling,
      </p>

      <IlluminatedInitial letter="A" variant="rubric">
        {CONFESSION}
      </IlluminatedInitial>
    </div>
  ),
};

export const Psalm = {
  name: 'Psalm Opening',
  render: () => (
    <div style={{ maxWidth: '36rem' }}>
      <p style={{
        fontFamily: 'var(--font-ui)', fontSize: 11,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        color: 'var(--text-subtle)', marginBottom: '1.5rem',
      }}>
        Psalm openings use the gilt or ink variant — never rubric (rubric is
        reserved for directions to the worshipper, not for prayed text).
      </p>

      <p style={{
        fontFamily: 'var(--font-ui)', fontSize: 'var(--text-xs)',
        letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase',
        color: 'var(--accent)', margin: '0 0 var(--space-4)',
      }}>
        Psalm 23
      </p>

      <IlluminatedInitial letter="T" variant="gilt">
        {PSALM_23}
      </IlluminatedInitial>

      <p style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'var(--text-base)',
        lineHeight: 'var(--leading-body)',
        color: 'var(--text)',
        marginTop: 'var(--space-4)',
      }}>
        Thou preparest a table before me in the presence of mine enemies: thou
        anointest my head with oil; my cup runneth over. Surely goodness and
        mercy shall follow me all the days of my life: and I will dwell in the
        house of the Lord for ever.
      </p>

      <p style={{
        fontFamily: 'var(--font-serif)', fontStyle: 'italic',
        fontSize: 'var(--text-sm)', color: 'var(--text-muted)',
        lineHeight: 'var(--leading-snug)',
        marginTop: 'var(--space-4)',
      }}>
        Glory be to the Father, and to the Son, and to the Holy Ghost; as it
        was in the beginning, is now, and ever shall be, world without end.
        Amen.
      </p>
    </div>
  ),
};

export const AllVariants = {
  name: 'All Variants',
  render: () => (
    <div style={{ maxWidth: '36rem', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      {[
        { letter: 'A', variant: 'gilt',   label: 'Gilt — illuminated gold',   text: COLLECT },
        { letter: 'A', variant: 'rubric', label: 'Rubric — accent red',        text: CONFESSION },
        { letter: 'B', variant: 'ink',    label: 'Ink — body text color',      text: BENEDICITE },
      ].map(({ letter, variant, label, text }) => (
        <div key={variant}>
          <p style={{
            fontFamily: 'var(--font-ui)', fontSize: 11,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--text-subtle)', margin: '0 0 var(--space-3)',
          }}>
            {label}
          </p>
          <IlluminatedInitial letter={letter} variant={variant}>
            {text}
          </IlluminatedInitial>
        </div>
      ))}
    </div>
  ),
};

export const BoxedVariants = {
  name: 'Boxed — All Variants',
  render: () => (
    <div style={{ maxWidth: '36rem', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      {[
        { letter: 'A', variant: 'gilt',   label: 'Boxed Gilt' },
        { letter: 'A', variant: 'rubric', label: 'Boxed Rubric' },
      ].map(({ letter, variant, label }) => (
        <div key={variant}>
          <p style={{
            fontFamily: 'var(--font-ui)', fontSize: 11,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--text-subtle)', margin: '0 0 var(--space-3)',
          }}>
            {label}
          </p>
          <IlluminatedInitial letter={letter} variant={variant} boxed>
            {COLLECT}
          </IlluminatedInitial>
        </div>
      ))}
    </div>
  ),
};

export const Playground = {
  args: {
    letter: 'A',
    variant: 'gilt',
    boxed: false,
    children: COLLECT,
  },
};
