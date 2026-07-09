import React from 'react';
import { Eyebrow } from '../../components/core/Eyebrow.jsx';

export default {
  title: 'Core/Eyebrow',
  component: Eyebrow,
  tags: ['autodocs'],
  argTypes: {
    as: { control: 'text' },
    children: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: `
A small-caps label above a heading or card title — the manuscript's rubric tag. Always colored with the live season accent. Used internally by \`Card\` and \`SectionHeading\` for their \`eyebrow\` prop.
        `,
      },
    },
  },
};

export const Default = {
  args: {
    children: 'Morning Prayer',
  },
};

export const AsSpan = {
  args: {
    as: 'span',
    children: 'The Collect',
  },
};
