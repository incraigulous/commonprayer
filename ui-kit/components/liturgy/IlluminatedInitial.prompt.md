The illuminated initial — a display-serif drop-cap that opens a psalm,
canticle, or reading. Pass the first letter separately from the rest.

```jsx
<IlluminatedInitial letter="C">
  ome, let us sing unto the Lord; let us heartily rejoice in the
  strength of our salvation.
</IlluminatedInitial>

<IlluminatedInitial letter="B" boxed variant="rubric">
  lessed are they who dwell in your house…
</IlluminatedInitial>
```

- **letter** is the initial; children are the remainder of the paragraph (begin mid-word).
- **variant**: `gilt` (default), `rubric`, `ink`. **boxed** draws the illuminated frame.
