export const chapters = [
  { id: 'welcome', name: 'Hero' },
  { id: 'about', name: 'About' },
  { id: 'work', name: 'Work' },
  { id: 'process', name: 'Process' },
  { id: 'studio', name: 'Studio' },
  { id: 'contact', name: 'Contact' },
] as const;

export type ChapterId = (typeof chapters)[number]['id'];

export const navItems = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#process', label: 'Process' },
  { href: '#studio', label: 'Studio' },
];

export const EMAIL = 'hello@sold.com.sg';

export const hero = {
  slogan: 'We build brands with AI',
  title: ['Brands,', 'engineered.'],
  lede: 'An AI-first branding and digital design studio in Singapore. SOLD plans the brand, designs the identity and builds the experience, in one team.',
};

export const about = {
  label: 'About',
  title: ['Strategy you can see.', 'Design you remember.'],
  intro: 'SOLD is a small, senior studio where brand thinking, visual craft and AI tooling work as one.',
  manifesto: [
    { text: 'A logo people only' },
    { text: 'notice', key: true },
    { text: 'fades by Friday. A brand they' },
    { text: 'believe in', key: true },
    { text: 'becomes a' },
    { text: 'business', key: true },
    { text: '.' },
  ],
  features: [
    {
      icon: 'compass',
      title: 'Brand Strategy',
      body: 'Positioning, naming and narrative, tested against real audiences before a single pixel is drawn.',
      tags: ['Positioning', 'Naming', 'Messaging'],
    },
    {
      icon: 'shapes',
      title: 'Brand Identity',
      body: 'Logos, type, colour and motion systems built to flex across packaging, print and screen.',
      tags: ['Logo', 'Visual system', 'Guidelines'],
    },
    {
      icon: 'monitor',
      title: 'Digital Experiences',
      body: 'Websites, web apps and portals designed and engineered in-house, fast and accessible.',
      tags: ['UI/UX', 'Web apps', 'CMS'],
    },
  ],
};

export const award = {
  label: 'Work',
  headline: ['Work that juries', 'keep [recognising].'],
  about: 'Since 2012, SOLD identities have been awarded by international design juries, from Muse, Titan and A\u2019Design.',
  facts: [
    { value: 'Gold', label: 'Muse Creative Awards' },
    { value: 'Platinum', label: 'Titan Brand Awards' },
    { value: 'Bronze', label: 'A\u2019Design Awards' },
  ],
};

export const works = [
  {
    name: 'Radiant Health',
    category: 'Brand Identity',
    year: '2025',
    body: 'A wellness identity that bridges technology and care, built to feel calm on every screen and shelf.',
    image: '/work-radiant-health.webp',
    awards: [
      { tier: 'Platinum', name: 'Titan Brand Awards' },
      { tier: 'Bronze', name: 'A\u2019Design Award' },
      { tier: 'Commended', name: 'WBDS' },
    ],
  },
  {
    name: 'KOBA',
    category: 'Brand Identity',
    year: '2025',
    body: 'Heritage weaving meets eco-textile innovation in an identity rooted in craft.',
    image: '/work-koba.webp',
    awards: [
      { tier: 'Gold', name: 'Muse Creative Awards' },
      { tier: 'Featured', name: 'Behance' },
    ],
  },
  {
    name: 'Nippon Paint',
    category: 'Digital & Brand',
    year: '2024',
    body: 'The NP Trade brand brought to life across web, mobile and CRM touchpoints for trade partners.',
    image: '/work-nippon-paint.webp',
    awards: [{ tier: 'Shipped', name: 'Web \u00b7 Mobile \u00b7 CRM' }],
  },
  {
    name: 'UOB \u00b7 BNP Paribas \u00b7 Selleys',
    category: 'UI/UX & Web Apps',
    year: '2024',
    body: 'Websites, web apps and CRM portals for leading brands, from interface design to full-stack build.',
    image: '/work-digital.webp',
    awards: [{ tier: 'Shipped', name: 'UI/UX \u00b7 Full-stack' }],
  },
];

export const process = {
  label: 'Process',
  title: 'From brief to a brand that sells.',
  intro: 'Three focused stages, each one checked by the people who will run it.',
  steps: [
    {
      tone: 'dark',
      label: 'Discover',
      title: 'One clear idea.',
      body: 'Interviews, audits and AI-assisted research narrow a crowded brief down to the single thing customers should remember.',
      log: ['> discover \u2014 audience, market, goal', 'many directions \u2192 one idea', 'out \u2014 a positioning that holds'],
    },
    {
      tone: 'dark',
      label: 'Design',
      title: 'Seen, not described.',
      body: 'We explore with real mockups on real touchpoints, not mood boards. Decisions come faster and rework drops.',
      log: ['> design \u2014 identity on real surfaces', 'sketch \u2192 render \u2192 refine', 'out \u2014 a system that flexes'],
    },
    {
      tone: 'dark',
      label: 'Deliver',
      title: 'Built and shipped.',
      body: 'Guidelines, assets and a live website, delivered and tested on every device your customers use.',
      log: ['> deliver \u2014 guidelines, site, assets', 'build \u2192 test \u2192 launch', 'out \u2014 a brand in market'],
    },
  ],
  statement: 'Details sell the brand.',
};

export const studio = {
  label: 'Studio',
  title: ['One team.', 'Brief to launch.'],
  intro: 'Strategy, identity and engineering in the same hands, so nothing is lost between hand-offs.',
  layers: [
    { name: 'Strategy', role: 'Research \u00b7 AI \u00b7 naming', icons: ['compass', 'sparkles', 'message'] },
    { name: 'Identity', role: 'Logo \u00b7 type \u00b7 colour', icons: ['pen-tool', 'type', 'palette'] },
    { name: 'Experience', role: 'Web \u00b7 apps \u00b7 motion', icons: ['monitor', 'mouse-pointer', 'play'] },
  ],
  capabilities: [
    { icon: 'compass', name: 'Brand strategy', meta: 'Positioning, naming, narrative' },
    { icon: 'pen-tool', name: 'Identity design', meta: 'Logo, type and colour systems' },
    { icon: 'sparkles', name: 'AI-assisted craft', meta: 'Faster exploration, sharper output' },
    { icon: 'monitor', name: 'Web design & build', meta: 'Marketing sites and web apps' },
    { icon: 'package', name: 'Packaging & print', meta: 'From dieline to shelf' },
    { icon: 'play', name: 'Motion & content', meta: 'Brand films and social assets' },
  ],
};

export const contact = {
  label: 'Contact',
  title: ['Your next brand,', 'with SOLD.'],
  body: 'Tell us what you are launching and when. We reply within one working day.',
  cta: 'Start a project',
};
