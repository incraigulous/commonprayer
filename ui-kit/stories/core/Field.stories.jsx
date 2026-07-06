import React from 'react';
import { Field } from '../../components/core/Field.jsx';

export default {
  title: 'Core/Field',
  component: Field,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    help: { control: 'text' },
    error: { control: 'text' },
    required: { control: 'boolean' },
    multiline: { control: 'boolean' },
    rows: { control: 'number' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: 'A labelled text field (single- or multi-line). Hairline ruled border; focused state uses the seasonal accent ring.',
      },
    },
  },
};

export const Default = {
  args: {
    label: 'Intercession',
    placeholder: 'Enter a name or intention…',
  },
};

export const WithHelp = {
  args: {
    label: 'Prayer intention',
    help: 'This will be included in the intercessions for Morning Prayer.',
    placeholder: 'For the sick, the suffering, and those in need…',
  },
};

export const WithError = {
  args: {
    label: 'Name',
    error: 'Please enter a name.',
    placeholder: 'Your name…',
  },
};

export const Required = {
  args: {
    label: 'Intention',
    required: true,
    placeholder: 'Required field…',
  },
};

export const Multiline = {
  args: {
    label: 'Personal prayer',
    multiline: true,
    rows: 4,
    placeholder: 'A free prayer in your own words…',
  },
};

export const Disabled = {
  args: {
    label: 'Scripture reference',
    disabled: true,
    defaultValue: 'John 4:6–32 (NLT)',
  },
};

export const AllStates = {
  name: 'All States',
  render: () => (
    <div style={{ maxWidth: '28rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Field label="Default" placeholder="Enter text…" />
      <Field label="With help" help="This is a help message." placeholder="Enter text…" />
      <Field label="Required *" required placeholder="Required field…" />
      <Field label="Error state" error="This field is required." placeholder="Enter text…" />
      <Field label="Disabled" disabled defaultValue="Locked value" />
      <Field label="Multiline" multiline rows={3} placeholder="A longer prayer or intention…" />
    </div>
  ),
};

export const Playground = {
  args: {
    label: 'Intercession',
    placeholder: 'Enter a name or intention…',
    help: '',
    error: '',
    required: false,
    multiline: false,
    disabled: false,
  },
};
