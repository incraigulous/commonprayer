A labelled text field for the few moments the office asks for input.

```jsx
<Field label="Prayer intention" placeholder="Name someone or something…" />
<Field label="Reflection" multiline rows={4} help="Saved privately to your journal." />
<Field label="Email" required error="Please enter a valid address." />
```

- **label** renders a small-caps label; **required** adds a rubric-red asterisk.
- **help** shows quiet helper text; **error** overrides it and turns the field rubric-red.
- **multiline** swaps to a `<textarea>` (`rows` to size). All other input props pass through.
