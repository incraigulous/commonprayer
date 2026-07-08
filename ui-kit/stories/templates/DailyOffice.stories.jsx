import React, { useState } from 'react';
import { Button } from '../../components/core/Button.jsx';
import { Callout } from '../../components/feedback/Callout.jsx';
import { DisplayMenu } from '../../components/core/DisplayMenu.jsx';
import { IlluminatedInitial } from '../../components/liturgy/IlluminatedInitial.jsx';
import { Masthead } from '../../components/liturgy/Masthead.jsx';
import { OrnamentalDivider } from '../../components/liturgy/OrnamentalDivider.jsx';
import { Scripture } from '../../components/liturgy/Scripture.jsx';
import { SectionHeading } from '../../components/liturgy/SectionHeading.jsx';
import { Versicle } from '../../components/liturgy/Versicle.jsx';
import { SessionBar } from '../../components/navigation/SessionBar.jsx';
import { Tabs } from '../../components/navigation/Tabs.jsx';

export default {
  title: 'Templates/Daily Office',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A full-screen composition of the UI kit in a realistic Morning Prayer reading view — SessionBar, step Tabs, Masthead, and the liturgy primitives that make up the office body.',
      },
    },
  },
};

const STEPS = [
  { id: 'opening',   label: 'Opening' },
  { id: 'invitatory',label: 'Invitatory' },
  { id: 'lesson',    label: 'The Lesson' },
  { id: 'collect',   label: 'Collect' },
];

const GLASS_ORDINARY = ['#a9c19b', '#94ad87', '#7f9a72', '#5f7d53', '#4a6540', '#3c5334', '#8aa67d'];

export const MorningPrayer = {
  name: 'Morning Prayer — Full Layout',
  render: () => {
    const [step, setStep] = useState('opening');
    const [menuOpen, setMenuOpen] = useState(false);
    const [display, setDisplay] = useState({ theme: 'dark', color: 'seasonal', size: 'md' });

    return (
      <div data-season="ordinary" style={{
        display: 'flex', flexDirection: 'column', height: '100vh',
        background: 'var(--bg)', fontFamily: 'var(--font-serif)', overflow: 'hidden',
      }}>
        {/* Top chrome */}
        <div>
          <SessionBar
            leadIcon="x"
            onBack={() => {}}
            onTextSize={() => setMenuOpen((o) => !o)}
          />
          <div style={{ padding: '0 1.25rem', borderBottom: '1px solid var(--border)' }}>
            <Tabs value={step} onChange={setStep} items={STEPS} />
          </div>
          {menuOpen && (
            <div style={{ position: 'absolute', top: 64, right: 16, zIndex: 10, width: 280 }}>
              <DisplayMenu
                theme={display.theme} onThemeChange={(theme) => setDisplay((d) => ({ ...d, theme }))}
                color={display.color} onColorChange={(color) => setDisplay((d) => ({ ...d, color }))}
                size={display.size} onSizeChange={(size) => setDisplay((d) => ({ ...d, size }))}
                style={{ boxShadow: 'var(--shadow-lg)', borderRadius: 'var(--radius-md)' }}
              />
            </div>
          )}
        </div>

        {/* Scrolling content */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <Masthead
            office="Morning Prayer"
            tradition="Matins"
            date="July 5, 2026"
            readings={['Psalm 95', 'John 14']}
            colors={GLASS_ORDINARY}
            style={{ height: 320 }}
          />

          <div style={{ maxWidth: '36rem', margin: '0 auto', padding: '1.75rem 1.5rem 3rem' }}>

            <section style={{ marginBottom: 'var(--space-7)' }}>
              <p style={{
                fontFamily: 'var(--font-ui)', fontSize: 'var(--text-xs)', fontWeight: 600,
                letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase',
                color: 'var(--accent)', margin: '0 0 var(--space-3)',
              }}>
                Opening
              </p>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-body)', color: 'var(--text-subtle)', margin: 0 }}>
                The Officiant begins with a sentence of Scripture. Stand, and be still.
              </p>
              <div style={{ marginTop: 'var(--space-4)' }}>
                <Scripture cite="Philippians 1:2">
                  Grace to you and peace from God our Father and from the Lord Jesus Christ.
                </Scripture>
              </div>
            </section>

            {(step === 'opening' || step === 'invitatory') && (
              <section style={{ marginBottom: 'var(--space-7)' }}>
                <SectionHeading level="section">The Invitatory</SectionHeading>
                <Versicle lines={[
                  { by: 'Officiant', text: 'Lord, open our lips.' },
                  { by: 'People',    text: 'And our mouth shall proclaim your praise.', response: true },
                ]} />
                <div style={{ marginTop: 'var(--space-4)' }}>
                  <IlluminatedInitial letter="C" variant="gilt">
                    ome, let us sing unto the Lord; let us heartily rejoice in the strength of our salvation. Let us come before his presence with thanksgiving.
                  </IlluminatedInitial>
                </div>
              </section>
            )}

            <section style={{ marginBottom: 'var(--space-7)' }}>
              <SectionHeading level="section">The Lesson</SectionHeading>
              <Scripture variant="illuminated" cite="Psalm 95:3–5">
                For the Lord is a great God, and a great King above all gods. In his hand are all the corners of the earth, and the strength of the hills is his also.
              </Scripture>
            </section>

            <section>
              <SectionHeading level="section">The Collect</SectionHeading>
              <Callout variant="prayer" title="A Collect for Grace">
                O Lord, our heavenly Father, almighty and everlasting God, you have brought us in safety to this new day. <em>Amen.</em>
              </Callout>
            </section>

            <OrnamentalDivider glyph="cross" />

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-2)' }}>
              <Button variant="gilt" size="lg">Amen</Button>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
