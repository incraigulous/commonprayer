import React, { useState } from 'react';
import { Badge } from '../../components/core/Badge.jsx';
import { Button } from '../../components/core/Button.jsx';
import { Callout } from '../../components/feedback/Callout.jsx';
import { Card } from '../../components/core/Card.jsx';
import { TypeScale, READING_SCALES } from '../../components/core/TypeScale.jsx';
import { IlluminatedInitial } from '../../components/liturgy/IlluminatedInitial.jsx';
import { OrnamentalDivider } from '../../components/liturgy/OrnamentalDivider.jsx';
import { Rubric } from '../../components/liturgy/Rubric.jsx';
import { Scripture } from '../../components/liturgy/Scripture.jsx';
import { SectionHeading } from '../../components/liturgy/SectionHeading.jsx';
import { Versicle } from '../../components/liturgy/Versicle.jsx';
import { Tabs } from '../../components/navigation/Tabs.jsx';
import { Icon } from '../../components/core/Icon.jsx';

export default {
  title: 'Templates/Daily Office',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A full-screen composition of all UI kit components in a realistic Morning Prayer layout.',
      },
    },
  },
};

const NAV_TABS = [
  { id: 'morning', label: 'Morning', icon: <Icon name="sun" size="1.35rem" /> },
  { id: 'noon',    label: 'Noon',    icon: <Icon name="clock" size="1.35rem" /> },
  { id: 'evening', label: 'Evening', icon: <Icon name="sunset" size="1.35rem" /> },
  { id: 'more',    label: 'More',    icon: <Icon name="menu" size="1.35rem" /> },
];

const SECTION_TABS = [
  { id: 'office',   label: 'Office' },
  { id: 'psalms',   label: 'Psalms' },
  { id: 'readings', label: 'Readings' },
];

export const MorningPrayer = {
  name: 'Morning Prayer — Full Layout',
  render: () => {
    const [navTab, setNavTab] = useState('morning');
    const [sectionTab, setSectionTab] = useState('office');
    const [readingSize, setReadingSize] = useState('md');
    const scale = READING_SCALES[readingSize];

    return (
      <div style={{
        display: 'flex', flexDirection: 'column', minHeight: '100vh',
        background: 'var(--bg)', '--reading-scale': scale,
        fontFamily: 'var(--font-serif)',
      }}>
        {/* Top bar */}
        <header style={{
          background: 'var(--surface)',
          borderBottom: '1px solid var(--border)',
          padding: '0.75rem 1.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', color: 'var(--text)', fontWeight: 600 }}>
            Common Prayer
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <TypeScale value={readingSize} onChange={setReadingSize} />
            <Button variant="ghost" size="sm">
              <Icon name="settings" size="1.1rem" />
            </Button>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          <div style={{ maxWidth: '36rem', margin: '0 auto' }}>

            {/* Date / office header */}
            <div style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Badge variant="sage">Ordinary Time</Badge>
              <Badge>Proper 9</Badge>
              <Badge>Year A</Badge>
            </div>

            <SectionHeading level="display" eyebrow="Sunday Morning">
              July 6, 2026
            </SectionHeading>

            {/* Section tabs */}
            <div style={{ marginBottom: '1.5rem' }}>
              <Tabs variant="underline" value={sectionTab} onChange={setSectionTab} items={SECTION_TABS} />
            </div>

            {sectionTab === 'office' && (
              <div>
                <SectionHeading level="office" eyebrow="The Daily Office">Morning Prayer</SectionHeading>

                <Rubric>The Officiant begins the service with one or more of these sentences of Scripture.</Rubric>

                <Callout variant="note" title="Opening Sentence">
                  Choose one according to the season or occasion. In ordinary time, begin with the sentence from Habakkuk.
                </Callout>

                <p style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: `calc(var(--text-base) * ${scale})`,
                  lineHeight: 'var(--leading-body)',
                  color: 'var(--text)',
                  margin: '1rem 0',
                }}>
                  The Lord is in his holy temple: let all the earth keep silence before him. <em style={{ color: 'var(--text-muted)' }}>Habakkuk 2:20</em>
                </p>

                <OrnamentalDivider glyph="cross" tone="gilt" />

                <SectionHeading level="section">The Invitatory</SectionHeading>

                <Versicle lines={[
                  { by: 'Officiant', text: 'Lord, open thou our lips.' },
                  { by: 'People',    text: 'And our mouth shall shew forth thy praise.', response: true },
                  { by: 'Officiant', text: 'O God, make speed to save us.' },
                  { by: 'People',    text: 'O Lord, make haste to help us.', response: true },
                ]} />

                <OrnamentalDivider glyph="fleuron" />

                <SectionHeading level="section">The Collect of the Day</SectionHeading>

                <Callout variant="prayer" title="A Collect for Grace">
                  O Lord, our heavenly Father, almighty and everlasting God, who hast safely brought us to the beginning of this day; Defend us in the same with thy mighty power; and grant that this day we fall into no sin, neither run into any kind of danger; but that all our doings, being ordered by thy governance, may be righteous in thy sight, through Jesus Christ our Lord. <em>Amen.</em>
                </Callout>

                <OrnamentalDivider glyph="cross" tone="gilt" />

                <Callout variant="blessing" title="The Blessing">
                  The grace of our Lord Jesus Christ, and the love of God, and the fellowship of the Holy Ghost, be with us all evermore. <em>Amen.</em>
                </Callout>

                <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <Button variant="primary">Continue to Psalms</Button>
                  <Button variant="ghost">Mark complete</Button>
                </div>
              </div>
            )}

            {sectionTab === 'psalms' && (
              <div>
                <SectionHeading level="office" eyebrow="The Psalter">Psalm 145</SectionHeading>

                <Rubric>Sung or said by all. The antiphon may be repeated after each section.</Rubric>

                <Callout variant="refrain" title="Antiphon">
                  I will extol you, my God and King, and bless your name forever and ever.
                </Callout>

                <div style={{ height: '1rem' }} />

                <IlluminatedInitial letter="I" variant="gilt">
                  {`will extol you, my God and King, and bless your name forever and ever. Every day I will bless you and praise your name forever and ever. Great is the Lord, and greatly to be praised, and his greatness is unsearchable.`}
                </IlluminatedInitial>

                <p style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: `calc(var(--text-base) * ${scale})`,
                  lineHeight: 'var(--leading-body)',
                  color: 'var(--text)',
                  margin: '1rem 0',
                }}>
                  One generation shall commend your works to another, and shall declare your mighty acts. On the glorious splendor of your majesty, and on your wondrous works, I will meditate.
                </p>

                <OrnamentalDivider glyph="cross" tone="gilt" />

                <Versicle lines={[
                  { by: '', text: 'Glory to the Father, and to the Son, and to the Holy Spirit;' },
                  { by: '', text: 'as it was in the beginning, is now, and will be for ever. Amen.', response: true },
                ]} />
              </div>
            )}

            {sectionTab === 'readings' && (
              <div>
                <SectionHeading level="office" eyebrow="The Lessons">Scripture Readings</SectionHeading>

                <Card eyebrow="Old Testament" title="First Lesson">
                  <Rubric>A reading from the Prophet Isaiah.</Rubric>
                  <Scripture variant="quiet" cite="Isaiah 55:1–5 (NLT)">
                    <p>"Is anyone thirsty? Come and drink—even if you have no money! Come, take your choice of wine or milk—it's all free! Why spend your money on food that does not give you strength? Why pay for food that does you no good? Listen to me, and you will eat what is good. You will enjoy the finest food."</p>
                  </Scripture>
                </Card>

                <div style={{ height: '1.5rem' }} />

                <Card eyebrow="Gospel" variant="illuminated" title="The Holy Gospel">
                  <Rubric center>The Holy Gospel of our Lord Jesus Christ according to St. Matthew.</Rubric>
                  <Versicle lines={[
                    { by: 'People', text: 'Glory to you, Lord Christ.', response: true },
                  ]} />
                  <Scripture variant="illuminated" cite="Matthew 11:16–30 (NLT)">
                    <p>"To what can I compare this generation? It is like children playing a game in the public square. They complain to their friends, 'We played wedding songs, and you didn't dance, so we played funeral songs, and you didn't mourn.'"</p>
                    <p>"Come to me, all of you who are weary and carry heavy burdens, and I will give you rest. Take my yoke upon you. Let me teach you, because I am humble and gentle at heart, and you will find rest for your souls. For my yoke is easy to bear, and the burden I give you is light."</p>
                  </Scripture>
                  <Versicle lines={[
                    { by: 'People', text: 'Praise to you, Lord Christ.', response: true },
                  ]} />
                </Card>
              </div>
            )}
          </div>
        </main>

        {/* Bottom nav */}
        <Tabs variant="bar" value={navTab} onChange={setNavTab} items={NAV_TABS} />
      </div>
    );
  },
};
