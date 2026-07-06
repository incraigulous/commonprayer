import React from 'react';
import { Scripture } from '../../components/liturgy/Scripture.jsx';

export default {
  title: 'Liturgy/Scripture',
  component: Scripture,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['quiet', 'illuminated'],
      description: 'quiet = accent left-edge; illuminated = gilt frame',
    },
    cite: { control: 'text' },
    mark: { control: 'boolean', description: 'Show the gilt cross mark' },
    children: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: `
A set-apart scripture reading block. Two variants:

- **quiet** (default) — accent-colored left border on a slightly sunk background. Used for lessons.
- **illuminated** — full gilt frame with inset shadow. Used for the Gospel and featured verses.
      `,
      },
    },
  },
};

export const Quiet = {
  args: {
    cite: 'John 4:6–14 (NLT)',
    mark: true,
    children: (
      <p>
        Jesus, tired from the long walk, sat wearily beside the well about noontime. Soon a Samaritan woman came to draw water, and Jesus said to her, "Please give me a drink."
      </p>
    ),
  },
};

export const Illuminated = {
  args: {
    variant: 'illuminated',
    cite: 'Matthew 5:3–12 (BCP)',
    mark: true,
    children: (
      <>
        <p>Blessed are the poor in spirit: for theirs is the kingdom of heaven.</p>
        <p>Blessed are they that mourn: for they shall be comforted.</p>
        <p>Blessed are the meek: for they shall inherit the earth.</p>
      </>
    ),
  },
};

export const NoCite = {
  name: 'Without Citation',
  args: {
    cite: null,
    mark: true,
    children: <p>The earth is the Lord's and all that is in it, the world, and those who live in it.</p>,
  },
};

export const NoMark = {
  name: 'Without Mark',
  args: {
    cite: 'Psalm 24:1',
    mark: false,
    children: <p>The earth is the Lord's and all that is in it.</p>,
  },
};

export const MultiParagraph = {
  name: 'Multi-paragraph Lesson',
  render: () => (
    <div style={{ maxWidth: '36rem' }}>
      <Scripture cite="Luke 10:25–37 (NLT)" mark>
        <p>On one occasion an expert in the law stood up to test Jesus. "Teacher," he asked, "what must I do to inherit eternal life?"</p>
        <p>"What is written in the Law?" he replied. "How do you read it?"</p>
        <p>He answered, "'Love the Lord your God with all your heart and with all your soul and with all your strength and with all your mind'; and, 'Love your neighbor as yourself.'"</p>
        <p>"You have answered correctly," Jesus replied. "Do this and you will live."</p>
      </Scripture>
    </div>
  ),
};

export const BothVariants = {
  name: 'Quiet vs Illuminated',
  render: () => (
    <div style={{ maxWidth: '36rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Scripture variant="quiet" cite="Isaiah 55:1 (NLT)">
        <p>"Is anyone thirsty? Come and drink—even if you have no money! Come, take your choice of wine or milk—it's all free!"</p>
      </Scripture>
      <Scripture variant="illuminated" cite="John 3:16 (NLT)">
        <p>For God loved the world so much that he gave his one and only Son, so that everyone who believes in him will not perish but have eternal life.</p>
      </Scripture>
    </div>
  ),
};

export const Playground = {
  args: {
    variant: 'quiet',
    cite: 'John 4:6–14 (NLT)',
    mark: true,
    children: 'Jesus, tired from the long walk, sat wearily beside the well about noontime.',
  },
};
