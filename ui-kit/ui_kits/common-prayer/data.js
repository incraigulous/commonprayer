// Common Prayer — sample content for the modern demo app.
// Content follows the traditional daily office (public-domain / BCP-style
// language), authored to mirror the real app's readings.
// FOUR daily offices, each mapped to a season colour used by "Time of Day":
//   Morning Prayer  → Easter    (gold)
//   Noonday Prayer  → Ordinary  (green)
//   Evening Prayer  → Pentecost (red)
//   Compline        → Lent      (violet)
// Steps per office: Opening · Psalm · Scripture · Canticle · Prayers · Collect.

// Season → accent hexes (mirror tokens/seasons.css).
window.CP_SEASON_ACCENTS = {
  easter:    { accent: '#c9a24b', onAccent: '#fbf4e4' },  // gold-500 (lighter)
  christmas: { accent: '#c9a24b', onAccent: '#fbf4e4' },
  ordinary:  { accent: '#5f7d53', onAccent: '#f1f6ee' },
  epiphany:  { accent: '#5f7d53', onAccent: '#f1f6ee' },
  advent:    { accent: '#675889', onAccent: '#efeaf6' },
  lent:      { accent: '#524570', onAccent: '#efeaf6' },
  pentecost: { accent: '#bf4835', onAccent: '#fdeeea' },
};

// Season → stained-glass mosaic palette (light → deep, monochromatic per season).
window.CP_SEASON_GLASS = {
  easter:    ['#ecd79c', '#e2c887', '#d3ad5c', '#c9a24b', '#a9843a', '#8a6b2e', '#dcc079'],
  christmas: ['#ecd79c', '#e2c887', '#d3ad5c', '#c9a24b', '#a9843a', '#8a6b2e', '#dcc079'],
  ordinary:  ['#a9c19b', '#94ad87', '#7f9a72', '#5f7d53', '#4a6540', '#3c5334', '#8aa67d'],
  epiphany:  ['#a9c19b', '#94ad87', '#7f9a72', '#5f7d53', '#4a6540', '#3c5334', '#8aa67d'],
  advent:    ['#b3a7c9', '#9789b3', '#7d6f9c', '#675889', '#564a77', '#453a63', '#8b7daa'],
  lent:      ['#b3a7c9', '#9789b3', '#7d6f9c', '#675889', '#524570', '#3f3459', '#8b7daa'],
  pentecost: ['#f0b3a6', '#eca192', '#e27563', '#d65846', '#bf4835', '#9c3626', '#e9897a'],
};

// The Gloria Patri, said after the psalms.
const GLORIA = 'Glory to the Father, and to the Son, and to the Holy Spirit:\nas it was in the beginning, is now, and will be for ever. Amen.';

// The general confession, shared by Morning and Evening Prayer.
const CONFESSION = 'Most merciful God, we confess that we have sinned against you in thought, word, and deed, by what we have done, and by what we have left undone. We have not loved you with our whole heart; we have not loved our neighbors as ourselves. We are truly sorry and we humbly repent. For the sake of your Son Jesus Christ, have mercy on us and forgive us; that we may delight in your will, and walk in your ways, to the glory of your Name. Amen.';

window.CP_DATA = {
  day: { dateLong: 'Monday, 6 July', dateShort: 'Mon 6 Jul', season: 'Ordinary Time', proper: 'Proper 9', seasonKey: 'ordinary' },

  week: {
    theme: 'The Promise of Freedom',
    series: 'Fixing our eyes on Jesus',
    intro: "This week we fix our eyes upon Jesus in the Gospel of John. As we listen to his teaching and explore the miracle of a man receiving sight, we hear Christ’s invitation to us — and respond.",
    author: 'Brittany White',
  },

  periods: [
    {
      id: 'morning', label: 'Morning', office: 'Morning Prayer', icon: 'sunrise',
      season: 'easter',
      greeting: 'Grace and peace to you this morning',
      image: './assets/morning.jpg',
    },
    {
      id: 'noonday', label: 'Noon', office: 'Noonday Prayer', icon: 'sun',
      season: 'ordinary',
      greeting: 'A pause in the middle of the day',
      image: './assets/noon.jpg',
    },
    {
      id: 'evening', label: 'Evening', office: 'Evensong', icon: 'sunset',
      season: 'pentecost',
      greeting: 'The day declines; give thanks',
      image: './assets/evening.jpg',
    },
    {
      id: 'compline', label: 'Night', office: 'Compline', icon: 'moon',
      season: 'lent',
      greeting: 'Rest now in the peace of Christ',
      image: './assets/night.jpg',
    },
  ],

  offices: {
    // ---- MORNING PRAYER --------------------------------------------------
    morning: {
      duration: '9:46', readings: ['Psalm 95', 'John 14'],
      opening: ['The night has passed, and the day lies open before us;', 'let us pray with one heart and mind.'],
      steps: [
        { key: 'confess', label: 'Confess', blocks: [
          { type: 'rubric', text: 'The Officiant begins with a sentence of Scripture.' },
          { type: 'scripture', dropcap: true, text: 'Jesus said to him, “I am the way, the truth, and the life. No one comes to the Father, except through me.”', ref: 'John 14:6' },
          { type: 'heading', text: 'Confession of Sin' },
          { type: 'rubric', text: 'Let us confess our sins against God and our neighbor.' },
          { type: 'prose', text: CONFESSION },
          { type: 'rubric', text: 'The Officiant alone says —' },
          { type: 'prose', text: 'Almighty God have mercy on you, forgive you all your sins through our Lord Jesus Christ, strengthen you in all goodness, and by the power of the Holy Spirit keep you in eternal life. Amen.' },
        ] },
        { key: 'read', label: 'Read', blocks: [
          { type: 'versicle', lines: [ { text: 'Lord, open our lips.' }, { text: 'And our mouth shall proclaim your praise.', response: true } ] },
          { type: 'canticle', text: GLORIA },
          { type: 'heading', text: 'Venite · Psalm 95' },
          { type: 'psalm', ref: 'Psalm 95:1–7', text: 'Come, let us sing to the Lord; *\nlet us shout for joy to the Rock of our salvation.\n\nLet us come before his presence with thanksgiving *\nand raise a loud shout to him with psalms.\n\nFor the Lord is a great God, *\nand a great King above all gods.\n\nCome, let us bow down, and bend the knee, *\nand kneel before the Lord our Maker.' },
          { type: 'rubric', text: 'A Reading from the Gospel according to John.' },
          { type: 'scripture', highlight: true, text: '“If you hold to my teaching, you are really my disciples. Then you will know the truth, and the truth will set you free.”', ref: 'John 8:31–32' },
          { type: 'prose', text: 'Jesus extends an invitation that will have an everlasting effect on our lives: to hold to his word, to know the truth, and to be set free indeed.' },
          { type: 'heading', text: 'Te Deum Laudamus · We Praise You, O God' },
          { type: 'canticle', text: 'You are God: we praise you;\nYou are the Lord: we acclaim you;\nYou are the eternal Father:\nAll creation worships you.\n\nHoly, holy, holy Lord, God of power and might,\nheaven and earth are full of your glory.' },
        ] },
        { key: 'pray', label: 'Pray', blocks: [
          { type: 'heading', text: 'The Apostles’ Creed' },
          { type: 'prose', text: 'I believe in God, the Father almighty, creator of heaven and earth; and in Jesus Christ, his only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died, and was buried. On the third day he rose again. He ascended into heaven, and is seated at the right hand of the Father.' },
          { type: 'heading', text: 'The Prayers' },
          { type: 'versicle', lines: [ { text: 'The Lord be with you.' }, { text: 'And also with you.', response: true } ] },
          { type: 'prose', text: 'Our Father, who art in heaven, hallowed be thy Name, thy kingdom come, thy will be done, on earth as it is in heaven. Give us this day our daily bread. And forgive us our trespasses, as we forgive those who trespass against us. And lead us not into temptation, but deliver us from evil. Amen.' },
          { type: 'heading', text: 'A Collect for Grace' },
          { type: 'collect', text: 'Lord God, almighty and everlasting Father, you have brought us in safety to this new day: Preserve us with your mighty power, that we may not fall into sin, nor be overcome by adversity; and in all we do, direct us to the fulfilling of your purpose; through Jesus Christ our Lord. Amen.' },
          { type: 'refrain', text: 'Let us bless the Lord. Thanks be to God.' },
        ] },
      ],
    },

    // ---- NOONDAY PRAYER --------------------------------------------------
    noonday: {
      duration: '5:12', readings: ['Psalms 30, 31'],
      opening: ['O God, make speed to save us.', 'O Lord, make haste to help us.'],
      steps: [
        { key: 'opening', label: 'Opening', blocks: [
          { type: 'rubric', text: 'A brief pause in the day. Be still, and know.' },
          { type: 'canticle', text: GLORIA },
          { type: 'refrain', text: 'Alleluia.' },
        ] },
        { key: 'psalm', label: 'Psalm', blocks: [
          { type: 'psalm', ref: 'Psalms 30, 31', text: 'I will exalt you, O Lord, because you have lifted me up *\nand have not let my enemies triumph over me.\n\nO Lord my God, I cried out to you, *\nand you restored me to health.\n\nWeeping may spend the night, *\nbut joy comes in the morning.\n\nIn you, O Lord, have I taken refuge; *\nlet me never be put to shame.' },
        ] },
        { key: 'scripture', label: 'Scripture', blocks: [
          { type: 'rubric', text: 'A Reading.' },
          { type: 'scripture', highlight: true, text: 'Blessed Savior, at this hour you hung upon the cross, stretching out your loving arms: Grant that all the peoples of the earth may look to you and be saved.', ref: 'A Prayer at Noon' },
        ] },
        { key: 'prayers', label: 'Prayers', blocks: [
          { type: 'versicle', lines: [ { text: 'Lord, hear our prayer.' }, { text: 'And let our cry come to you.', response: true } ] },
          { type: 'prose', text: 'Our Father, who art in heaven, hallowed be thy Name, thy kingdom come, thy will be done, on earth as it is in heaven. Give us this day our daily bread. And forgive us our trespasses, as we forgive those who trespass against us. And lead us not into temptation, but deliver us from evil. Amen.' },
        ] },
        { key: 'collect', label: 'Collect', blocks: [
          { type: 'heading', text: 'A Collect for the Renewal of Life' },
          { type: 'collect', text: 'Almighty Savior, who at noonday called your servant Saint Paul to be an apostle to the Gentiles: We pray you to illumine the world with the radiance of your glory, that all nations may come and worship you; for you live and reign for ever and ever. Amen.' },
          { type: 'refrain', text: 'Let us bless the Lord. Thanks be to God.' },
        ] },
      ],
    },

    // ---- EVENING PRAYER --------------------------------------------------
    evening: {
      duration: '8:30', readings: ['Psalm 141', 'Luke 1'],
      opening: ['That this evening may be holy, good and peaceful,', 'let us pray with one heart and mind.'],
      steps: [
        { key: 'opening', label: 'Opening', blocks: [
          { type: 'rubric', text: 'At the close of day the candles are lit. Then the Officiant begins.' },
          { type: 'scripture', dropcap: true, text: 'Take my yoke upon you and learn from me, for I am gentle and humble in heart; and you will find rest for your souls.', ref: 'Matthew 11:29' },
          { type: 'heading', text: 'Confession of Sin' },
          { type: 'rubric', text: 'Let us confess our sins against God and our neighbor.' },
          { type: 'prose', text: CONFESSION },
        ] },
        { key: 'psalm', label: 'Psalm', blocks: [
          { type: 'versicle', lines: [ { text: 'O God, make speed to save us.' }, { text: 'O Lord, make haste to help us.', response: true } ] },
          { type: 'canticle', text: GLORIA },
          { type: 'heading', text: 'Domine, clamavi · Psalm 141' },
          { type: 'psalm', ref: 'Psalm 141:1–3', text: 'O Lord, I call to you; come to me quickly; *\nhear my voice when I cry to you.\n\nLet my prayer be set forth in your sight as incense, *\nthe lifting up of my hands as the evening sacrifice.\n\nSet a watch before my mouth, O Lord, *\nand guard the door of my lips.' },
        ] },
        { key: 'scripture', label: 'Scripture', blocks: [
          { type: 'rubric', text: 'A Reading from the Gospel according to Luke.' },
          { type: 'scripture', highlight: true, text: '“Stay with us, for it is nearly evening; the day is almost over.” So he went in to stay with them.', ref: 'Luke 24:29' },
        ] },
        { key: 'canticle', label: 'Canticle', blocks: [
          { type: 'heading', text: 'Phos hilaron · O Gracious Light' },
          { type: 'canticle', text: 'O gracious Light,\npure brightness of the everliving Father in heaven,\nO Jesus Christ, holy and blessed!\n\nNow as we come to the setting of the sun,\nand our eyes behold the vesper light,\nwe sing your praises, O God: Father, Son, and Holy Spirit.' },
          { type: 'heading', text: 'Magnificat · The Song of Mary' },
          { type: 'canticle', text: 'My soul proclaims the greatness of the Lord,\nmy spirit rejoices in God my Savior;\nfor he has looked with favor on his lowly servant.\nFrom this day all generations will call me blessed.' },
        ] },
        { key: 'prayers', label: 'Prayers', blocks: [
          { type: 'versicle', lines: [ { text: 'The Lord be with you.' }, { text: 'And also with you.', response: true } ] },
          { type: 'prose', text: 'Our Father, who art in heaven, hallowed be thy Name, thy kingdom come, thy will be done, on earth as it is in heaven. Give us this day our daily bread. And forgive us our trespasses, as we forgive those who trespass against us. And lead us not into temptation, but deliver us from evil. Amen.' },
        ] },
        { key: 'collect', label: 'Collect', blocks: [
          { type: 'heading', text: 'A Collect for Aid against Perils' },
          { type: 'collect', text: 'Lighten our darkness, we beseech you, O Lord; and by your great mercy defend us from all perils and dangers of this night; for the love of your only Son, our Savior Jesus Christ. Amen.' },
          { type: 'refrain', text: 'Let us bless the Lord. Thanks be to God.' },
        ] },
      ],
    },

    // ---- COMPLINE --------------------------------------------------------
    compline: {
      duration: '6:40', readings: ['Psalm 4', 'Psalm 91'],
      opening: ['The Lord Almighty grant us a peaceful night and a perfect end.', 'Amen.'],
      steps: [
        { key: 'opening', label: 'Opening', blocks: [
          { type: 'versicle', lines: [ { text: 'Our help is in the Name of the Lord;' }, { text: 'The maker of heaven and earth.', response: true } ] },
          { type: 'heading', text: 'Confession of Sin' },
          { type: 'rubric', text: 'Let us confess our sins to God.' },
          { type: 'prose', text: 'Almighty God, our heavenly Father: We have sinned against you, through our own fault, in thought, and word, and deed, and in what we have left undone. For the sake of your Son our Lord Jesus Christ, have mercy on us and forgive us; that we may walk in newness of life, to the glory of your Name. Amen.' },
        ] },
        { key: 'psalm', label: 'Psalm', blocks: [
          { type: 'versicle', lines: [ { text: 'O God, make speed to save us.' }, { text: 'O Lord, make haste to help us.', response: true } ] },
          { type: 'canticle', text: GLORIA },
          { type: 'psalm', ref: 'Psalm 4:1, 8', text: 'Answer me when I call, O God, defender of my cause; *\nyou set me free when I am hard-pressed; have mercy on me and hear my prayer.\n\nI lie down in peace; at once I fall asleep; *\nfor only you, Lord, make me dwell in safety.' },
        ] },
        { key: 'scripture', label: 'Scripture', blocks: [
          { type: 'rubric', text: 'A Reading.' },
          { type: 'scripture', highlight: true, text: 'Be sober, be watchful. Cast all your care on him, for he cares for you. Now to him who is able to keep you from falling, be glory and majesty, dominion and power, now and for ever.', ref: '1 Peter 5:7–8' },
        ] },
        { key: 'canticle', label: 'Canticle', blocks: [
          { type: 'heading', text: 'Nunc dimittis · The Song of Simeon' },
          { type: 'canticle', text: 'Lord, now you let your servant go in peace; *\nyour word has been fulfilled:\n\nMy own eyes have seen the salvation *\nwhich you have prepared in the sight of every people:\n\nA light to reveal you to the nations *\nand the glory of your people Israel.' },
        ] },
        { key: 'prayers', label: 'Prayers', blocks: [
          { type: 'versicle', lines: [ { text: 'Guide us waking, O Lord,' }, { text: 'and guard us sleeping.', response: true } ] },
          { type: 'prose', text: 'Our Father, who art in heaven, hallowed be thy Name, thy kingdom come, thy will be done, on earth as it is in heaven. Give us this day our daily bread. And forgive us our trespasses, as we forgive those who trespass against us. And lead us not into temptation, but deliver us from evil. Amen.' },
        ] },
        { key: 'collect', label: 'Collect', blocks: [
          { type: 'heading', text: 'A Collect for the Close of Day' },
          { type: 'collect', text: 'Keep watch, dear Lord, with those who work, or watch, or weep this night, and give your angels charge over those who sleep. Tend the sick, give rest to the weary, bless the dying, soothe the suffering, pity the afflicted, shield the joyous; and all for your love’s sake. Amen.' },
          { type: 'refrain', text: 'Into your hands, O Lord, I commend my spirit.', ref: 'Psalm 31:5' },
        ] },
      ],
    },
  },
};
