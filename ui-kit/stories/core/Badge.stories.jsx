import React from 'react';
import { Badge } from '../../components/core/Badge.jsx';

export default {
  title: 'Core/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'rubric', 'gilt', 'sage', 'violet', 'solid'],
    },
    children: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Small-caps pill badge for seasons, liturgical propers, and lesson markers.
Each variant corresponds to a season or accent role:

| Variant | Color | Use case |
|---|---|---|
| \`default\` | Muted neutral | Generic labels |
| \`rubric\` | Rubric red | Liturgical instructions, Pentecost |
| \`gilt\` | Illuminated gold | Christmas, Easter, sacred markers |
| \`sage\` | Sage green | Ordinary Time, Epiphany |
| \`violet\` | Penitential violet | Advent, Lent |
| \`solid\` | Accent fill | High-visibility, current season |
      `,
      },
    },
  },
};

export const Default = {
  args: { variant: 'default', children: 'Proper 9' },
};

export const Rubric = {
  args: { variant: 'rubric', children: 'Pentecost' },
};

export const Gilt = {
  args: { variant: 'gilt', children: 'Easter' },
};

export const Sage = {
  args: { variant: 'sage', children: 'Ordinary Time' },
};

export const Violet = {
  args: { variant: 'violet', children: 'Advent' },
};

export const Solid = {
  args: { variant: 'solid', children: 'Today' },
};

export const AllVariants = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
      <Badge>Proper 9</Badge>
      <Badge variant="rubric">Pentecost</Badge>
      <Badge variant="gilt">Christmas</Badge>
      <Badge variant="sage">Ordinary Time</Badge>
      <Badge variant="violet">Advent</Badge>
      <Badge variant="solid">Today</Badge>
    </div>
  ),
};

export const SeasonalUse = {
  name: 'In Context — Seasonal',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {[
        { season: 'ordinary',  label: 'Ordinary Time', variant: 'sage',   propers: ['Proper 9', 'Proper 10', 'Year A'] },
        { season: 'advent',    label: 'Advent',        variant: 'violet', propers: ['Advent I', 'Year B', 'Candlemas'] },
        { season: 'christmas', label: 'Christmas',     variant: 'gilt',   propers: ['Christmas I', 'Epiphany'] },
        { season: 'pentecost', label: 'Pentecost',     variant: 'rubric', propers: ['Whitsunday', 'Trinity'] },
      ].map(({ season, label, variant, propers }) => (
        <div key={season} data-season={season} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Badge variant={variant}>{label}</Badge>
          {propers.map(p => <Badge key={p}>{p}</Badge>)}
        </div>
      ))}
    </div>
  ),
};

export const Playground = {
  args: { variant: 'sage', children: 'Ordinary Time' },
};
