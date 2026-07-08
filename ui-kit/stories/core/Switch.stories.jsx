import React, { useState } from 'react';
import { Switch } from '../../components/core/Switch.jsx';

export default {
  title: 'Core/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    help: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component: `
A labelled toggle field — a "light switch": a pill track with a sliding thumb, an inline label and optional help text. Controlled; the track fills with the theme \`--accent\` when on, so it always matches the season. \`onGlyph\` / \`offGlyph\` ride inside the thumb (e.g. a sun / moon).
      `,
      },
    },
  },
};

export const Default = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return <Switch label="Daily reminder" checked={checked} onChange={setChecked} />;
  },
};

export const WithHelp = {
  name: 'With Help Text',
  render: () => {
    const [checked, setChecked] = useState(true);
    return (
      <Switch
        label="Night office"
        help="Dim the page for low light"
        checked={checked}
        onChange={setChecked}
      />
    );
  },
};

export const WithGlyphs = {
  name: 'With Thumb Glyphs',
  render: () => {
    const [checked, setChecked] = useState(true);
    return (
      <Switch
        label="Night office"
        help="Dim the page for low light"
        checked={checked}
        onChange={setChecked}
        onGlyph="☾"
        offGlyph="☀"
      />
    );
  },
};

export const Disabled = {
  render: () => <Switch label="Sync across devices" checked={false} disabled />,
};

export const SettingsList = {
  name: 'In Context — Settings List',
  render: () => {
    const [dark, setDark] = useState(true);
    const [remind, setRemind] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '22rem' }}>
        <Switch
          label="Night office"
          help="Dim the page for low light"
          checked={dark}
          onChange={setDark}
          onGlyph="☾"
          offGlyph="☀"
        />
        <Switch
          label="Daily reminder"
          help="A bell at 8:00 each morning"
          checked={remind}
          onChange={setRemind}
        />
        <Switch label="Sync across devices" checked={false} disabled />
      </div>
    );
  },
};

export const Playground = {
  args: {
    label: 'Night office',
    help: 'Dim the page for low light',
    checked: false,
    disabled: false,
  },
};
