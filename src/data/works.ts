const CDN = 'https://cdn.sanity.io/images/bsz0zxd1/production/';
const cdn = (ids: string[]) => ids.map((id) => `${CDN}${id}`);

export interface Award {
  tier: string;
  name: string;
}

export interface Section {
  title: string;
  body: string;
}

export interface CaseStudy {
  slug: string;
  name: string;
  client: string;
  place: string;
  tagline: string;
  disciplines: string[];
  services: string[];
  industry: string;
  awards: Award[];
  thumb: string;
  summary: string;
  challenge: Section[];
  process: Section[];
  solution: Section[];
  gallery: string[];
  quote: string;
}

export interface Project {
  name: string;
  place: string;
  tagline: string;
  disciplines: string[];
  thumb: string;
}

export const BEHANCE = 'https://www.behance.net/studiosold';

export const cases: CaseStudy[] = [
  {
    slug: 'koba',
    name: 'KOBA',
    client: 'KOBA',
    place: 'Japan',
    tagline: 'Weaving Heritage and Innovation',
    disciplines: ['Strategy', 'Identity', 'UI/UX', 'Art Direction'],
    services: ['Brand Strategy', 'Visual Identity', 'UI/UX Design', 'Art Direction', 'Web Development'],
    industry: 'Textiles / Manufacturing',
    awards: [
      { tier: 'Gold', name: 'Muse Creative Awards' },
      { tier: 'Featured', name: 'Behance' },
    ],
    thumb: '/works/koba.webp',
    summary:
      'A concept brand born from Kobayashi Woven, a Kyoto textile house founded in 1947. "Koba" means small forest, and the identity carries that forest-first idea into premium eco-textiles.',
    challenge: [
      { title: 'Heritage & artistry', body: 'Honour more than 75 years of Kyoto textile craft with a quiet, minimal language and nature-inspired motifs.' },
      { title: 'Sustainable innovation', body: 'Make sustainability unmistakable and premium, without falling into the usual tropes of generic green branding.' },
    ],
    process: [
      { title: 'Discovery', body: 'Research into Japanese weaving motifs and sustainable fibres defined KOBA as both guardian of heritage and pioneer of innovation.' },
      { title: 'Visual mapping', body: 'A visual system mapped across touchpoints, from high-end art direction to a refined digital experience.' },
    ],
    solution: [
      { title: 'Brand logomark', body: 'Refined, minimalist typography and a logo system that captures the precision of Japanese design.' },
      { title: 'Visual system', body: 'Patterns and colours drawn from textile weaves and sustainable materials.' },
      { title: 'Art direction & UI/UX', body: 'A digital-first experience that tells the brand story through a human-centred interface.' },
    ],
    gallery: cdn([
      '16e29eef2ac935cd2b97c4d0de2ad8c6f66e0c7f-1920x1280.webp',
      'beabf0f4322f96d85462facc49b91aaa299aedba-1920x1280.webp',
      '4edf064b3035a59574bbfde0724950aed0efe795-1920x1280.webp',
      'c57c7252651a75aa1570f406eef03465703232d3-1920x1280.webp',
      '5ee3a4d61768c44bb117ed95c4fbdeef97f96114-1920x1280.webp',
      '273b052e3913fc81bcbfd66aabc3c32a40b7dffd-1920x1280.webp',
      '6648826e71f30ad90ce38c390b40649127fc1d34-1920x1280.webp',
    ]),
    quote: 'Craft and Future: a brand that treats the forest as its first client.',
  },
  {
    slug: 'radiant-health',
    name: 'Radiant Health',
    client: 'Radiant Health',
    place: 'Malaysia',
    tagline: 'Bridging Technology & Wellness',
    disciplines: ['Strategy', 'Identity', 'UI/UX', 'Web'],
    services: ['Brand Strategy', 'Visual Identity', 'UI/UX Design', 'Web Development'],
    industry: 'Healthcare Tech',
    awards: [
      { tier: 'Platinum', name: 'Titan Brand Awards' },
      { tier: 'Bronze', name: 'A\u2019Design Award' },
      { tier: 'Commended', name: 'WBDS' },
    ],
    thumb: '/works/radiant.webp',
    summary:
      'Founded in Kuching in 2019, Radiant Health grew from one clinic to eight across Malaysia. The new identity joins AI-led diagnostics with traditional, high-touch care.',
    challenge: [
      { title: 'Bridging paradigms', body: 'Unite high-tech AI diagnostics with Asian symbolism and traditional healing, without the cold feel of medical tech.' },
      { title: 'Category saturation', body: 'Break away from the blue-and-white conventions of Malaysian healthcare while still reassuring a conservative audience.' },
    ],
    process: [
      { title: 'Visual synthesis', body: 'Bamboo for resilience and upward growth, paired with a radiant sun for energy and positivity.' },
      { title: 'Colour & craft', body: 'An earthy green-neon palette, precise grids for technology and organic lines for healing.' },
      { title: 'Typographic voice', body: 'A geometric sans for wayfinding and data, a humanist display face for warmth.' },
    ],
    solution: [
      { title: 'Responsive identity', body: 'A logomark that adapts its detail from large signage down to a favicon.' },
      { title: 'Omnichannel experience', body: 'The system carried into wayfinding, interiors, patient portals and responsive web.' },
      { title: 'Digital interface', body: 'A patient-centred site bringing bookings, telemedicine and records into one calm interface.' },
    ],
    gallery: cdn([
      'ab7931a6f61bbb289ab93e7ecf1fcd05efb1ab70-1400x933.webp',
      '5b92b549a528ec2fee1f6194553b3ce8e3a24cab-1400x933.webp',
      '36a6ae2d0bc4be3b736ac29b8aa8194529f75f3e-1400x933.webp',
      '1707402f0f8f84352ede587b4203bec4f62f53f4-1400x933.webp',
      'b27472c317f704f0923c4467fefb939c8f516880-1920x1280.webp',
      '59c19d7388db65f9ae3f2daac3fc5b9f441ebd3b-1400x933.webp',
      'ad817ece4c6fc7b3112a3ff11486fae0a56b094b-1920x1280.webp',
    ]),
    quote: 'Imparting true life: every visual decision reflects vitality, restoration and inner wellbeing.',
  },
  {
    slug: 'moms-up',
    name: 'Cordlife: Moms Up',
    client: 'Moms Up by Cordlife Group',
    place: 'Singapore',
    tagline: 'Empowering Happy Moms in Asia',
    disciplines: ['Strategy', 'Identity', 'UI/UX', 'App'],
    services: ['Brand Strategy', 'Visual Identity', 'UI/UX Design', 'App Development'],
    industry: 'Parenting Community',
    awards: [{ tier: 'Top 10', name: 'App Store' }],
    thumb: '/works/moms_up.webp',
    summary:
      'An every-stage motherhood app from Cordlife, launched across six Asian markets. SOLD shaped the strategy, identity, app experience and social assets.',
    challenge: [
      { title: 'Destigmatising support', body: 'Position Moms Up as a trusted, empathetic companion rather than another source of jargon.' },
      { title: 'Unified ecosystem', body: 'Fold resource libraries, trackers and community features into one intuitive app for tired parents.' },
    ],
    process: [
      { title: 'Empathetic discovery', body: 'Personas and empathy maps from surveys and interviews traced the highs and lows of motherhood.' },
      { title: 'Playful semiotics', body: 'Overlapping hearts for bonding and balloons for uplift: approachable, playful and authentic.' },
      { title: 'User-centric prototyping', body: 'One-handed navigation and glanceable data, tested from wireframe to high fidelity.' },
    ],
    solution: [
      { title: 'Scalable visual system', body: 'An illustration style that crosses languages, from app icon to billboard.' },
      { title: 'Hub of empowerment', body: 'Content organised into stages of motherhood, so the app grows with each user.' },
      { title: 'Cross-market rollout', body: 'One design system across six regions, cutting development overhead and keeping the brand consistent.' },
    ],
    gallery: cdn([
      '74d292837c5cca6d4bca2900a91e05789c86f4eb-2800x1867.webp',
      'f89ce5b362c2bd882ec43f0f97af901cf8a08dd1-2800x1867.webp',
      '12329e5ff159932f0abc41cb973df108cafdff98-1920x1280.webp',
      '6b5a9e05020f2f34b29e7606f887ecbad108c25e-1920x1280.webp',
      'cd189a2ae48f7f2eba35d044f0eabe63515d1264-1920x1280.webp',
      '5679070d9113dd73719dddb067a4011b83884470-2800x1867.webp',
      '78ac62c282204dd7171b3b33666b01d31163c09c-2800x1867.webp',
    ]),
    quote: 'Designed to be a mother\u2019s best friend through every stage of the journey.',
  },
  {
    slug: 'quotz',
    name: 'SgCarMart: Quotz',
    client: 'Quotz by SgCarMart',
    place: 'Singapore',
    tagline: 'Making Car Selling Simpler',
    disciplines: ['Strategy', 'Identity', 'UI/UX', 'Web'],
    services: ['Brand Strategy', 'Visual Identity', 'UI/UX Design'],
    industry: 'Automotive',
    awards: [],
    thumb: '/works/quotz.webp',
    summary:
      'Quotz helps car owners sell directly to dealers through live auctions. SOLD clarified its positioning and redesigned its digital and offline touchpoints.',
    challenge: [
      { title: 'Brand distinctiveness', body: 'Step out from generic dealers and the SgCarMart parent brand with an identity that feels institutional and premium.' },
      { title: 'Digital friction', body: 'Turn complicated auction mechanics into a simple, reassuring journey for non-technical sellers.' },
    ],
    process: [
      { title: 'Strategic discovery', body: 'Seller research found uncertainty was the main pain point, leading to a brand built on radical transparency.' },
      { title: 'Visualising efficiency', body: 'A "Q" that reads as magnifying glass and seal of approval, in electric blue and white.' },
      { title: 'User-centric flow', body: 'A three-step listing wizard and a live dashboard that makes the bidding exciting.' },
    ],
    solution: [
      { title: 'Unified ecosystem', body: 'One brand system across web, vehicle decals and inspection-centre signage.' },
      { title: 'Bidding interface', body: 'Highest bid, time left and vehicle condition up front, so dealers can decide quickly.' },
      { title: 'Market leadership', body: 'A polished presence that attracts premium sellers and builds lasting trust with dealers.' },
    ],
    gallery: cdn([
      '88fbac1e8df4881209184c8386d0c55b9b24b544-1400x933.webp',
      '1663649b403c07fc7c1ad87a564012ee802447f3-2800x1867.webp',
      'fd762903b35d71a82eadbdf89268fdf3ca41ecdb-2800x1867.webp',
      '9778c2dde8f3bf67c4d8330a7fbae9452b3f340e-2800x1867.webp',
      '361dcb3aeae18ed72ed3f4692350eb663748fb18-2800x1867.webp',
      'fb3493e28f79755464cac3fa5d72e5c1d2595389-2800x1867.webp',
      'a5f4a2ffdf50e1d39e23e79ddfb5e0b0c7a9e329-2800x1867.webp',
    ]),
    quote: 'True value, real speed: car selling with minimum hassle and maximum peace of mind.',
  },
  {
    slug: 'sccci',
    name: 'SCCCI',
    client: 'SCCCI.org.sg',
    place: 'Singapore',
    tagline: 'Celebrating 120 Years of Commerce',
    disciplines: ['Strategy', 'Identity'],
    services: ['Visual Identity', 'Brand Strategy'],
    industry: 'Chamber of Commerce',
    awards: [],
    thumb: '/works/sccci.webp',
    summary:
      'The Singapore Chinese Chamber of Commerce and Industry turns 120 in 2026. SOLD created the anniversary identity, linking a legacy that began in 1906 with the future of Singapore business.',
    challenge: [
      { title: 'Visual unification', body: 'Speak to family businesses and tech start-ups alike, under one celebratory banner.' },
      { title: 'Anniversary significance', body: 'A "120" mark strong enough to stand alone that still sits naturally beside the parent brand.' },
    ],
    process: [
      { title: 'Heritage analysis', body: 'Archive research, architectural motifs and calligraphic strokes gave the identity its visual DNA.' },
      { title: 'Symbology of growth', body: 'Interlocking numerals for unity, upward strokes for growth and a globe-like zero for reach.' },
      { title: 'Colour psychology', body: 'Imperial red for authority, with a jubilee gold accent for the celebration.' },
    ],
    solution: [
      { title: 'A timeless emblem', body: 'The weight of tradition with the lightness of modern design, beside the historic crest.' },
      { title: 'Versatile application', body: 'From avatars and web headers to stage backdrops, merchandise and a full brand guide.' },
      { title: 'Commemorative impact', body: 'Worn by members on lapel pins and letterheads throughout the anniversary year.' },
    ],
    gallery: cdn([
      'b1f483861c2972ac32914cbac0f30299610e196e-1920x1080.webp',
      '4ce4bbf46602ed956e89ebbc4835ae8c363221b7-2560x1440.webp',
      '7d9b6dc07510091c309230a10b79fe1ffde66ce4-1400x788.webp',
      'd5584e9955b0918dddf69e6abf42a104b7b45304-1400x788.webp',
      '56a77d620a3dc40007e2fa0d1d2ae059c07c3ac4-1400x788.webp',
      '45c612d5bbdb512bde3070ff3168247eb35c3b9b-1400x788.webp',
      '457dd15a335044191efc72ae6067ec74c99d87a4-1400x788.webp',
    ]),
    quote: '120 years of connecting and gathering commerce, and a new chapter of growth.',
  },
  {
    slug: 'saughtandfound',
    name: 'Saught&Found',
    client: 'Saught&Found',
    place: 'Singapore',
    tagline: 'Helping Brands to Seek and Find',
    disciplines: ['Strategy', 'Identity', 'Art Direction'],
    services: ['Brand Strategy', 'Visual Identity', 'Art Direction'],
    industry: 'Brand Consultancy',
    awards: [],
    thumb: '/works/saught.webp',
    summary:
      'An independent strategy and design studio that helps brands find their purpose. SOLD built an identity that is minimal, elegant and artisanal.',
    challenge: [
      { title: 'Seeking purpose', body: 'A way of working that digs past surface aesthetics to true strategic alignment.' },
      { title: 'Silent strength', body: 'In a noisy agency landscape, an identity that shows authority through restraint.' },
    ],
    process: [
      { title: 'Strategic excavation', body: 'Starting with why, the core purpose became "to seek, find and realise true purpose".' },
      { title: 'Naming & etymology', body: 'Old English roots for peace and agreement, Old Norse for seeking, gave the name its depth.' },
      { title: 'Typographic harmony', body: 'Serif meets sans, with an inverted ampersand that looks at things from a new angle.' },
    ],
    solution: [
      { title: 'A unified voice', body: 'A quiet, sophisticated canvas that lets client work shine.' },
      { title: 'Responsive systems', body: 'A logo system that stays legible from signage down to favicons.' },
      { title: 'Meaningful marks', body: 'The filled dot and inverted ampersand became graphic devices in their own right.' },
    ],
    gallery: cdn([
      'a71a32279d45dc70341a200930e461b32440e92c-1400x933.webp',
      '6d145614ae866edddfff003bf514c8dc3e2b4fb3-1400x933.webp',
      '53b89d11188f5695c622364bb329e8acce81d779-1400x933.webp',
      'f9a012f437cee71df0da3c3521638cada1d260ba-1400x933.webp',
      '3c7f9f47e1d5bcc7ec4fa4a708835f1133354fb0-1400x933.webp',
      'b1d220bd4206084cf5e96144a7e14651903a6a19-1400x933.webp',
    ]),
    quote: 'Saught: to seek, to be at peace. Found: to attain, to arrive.',
  },
];

export const moreProjects: Project[] = [
  { name: 'Nine Social', place: 'Singapore', tagline: 'Accelerating Social Connections', disciplines: ['Strategy', 'Identity', 'UI/UX'], thumb: '/works/nine.webp' },
  { name: 'Sunwheel', place: 'Norway', tagline: 'Bringing About Solar in Motion', disciplines: ['Strategy', 'Identity', 'UI/UX'], thumb: '/works/sunwheel.webp' },
  { name: 'Selleys', place: 'Singapore', tagline: 'Supporting Partners Programme', disciplines: ['UI/UX', 'Web', 'Art Direction'], thumb: '/works/selleys.webp' },
  { name: 'Nippon Paint', place: 'Singapore', tagline: 'Sumo Buddies Loyalty Programme', disciplines: ['Packaging', 'Art Direction'], thumb: '/works/sumo.webp' },
  { name: 'Nippon Paint', place: 'Singapore', tagline: 'B2B Trade Digital Ecosystem', disciplines: ['Strategy', 'UI/UX', 'Web'], thumb: '/works/nippon.webp' },
  { name: 'HomeRenoGuru', place: 'Singapore', tagline: 'B2C Portal + CRM + Mobile App', disciplines: ['UI/UX', 'Web', 'App'], thumb: '/works/homereno.webp' },
  { name: 'i.Dental Clinic', place: 'Singapore', tagline: 'Democratising Dental Care', disciplines: ['UI/UX', 'Web'], thumb: '/works/idental.webp' },
];

export const findCase = (slug: string) => cases.find((c) => c.slug === slug);
