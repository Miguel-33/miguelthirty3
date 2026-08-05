export const projectChoices = [
  {
    id: "website",
    number: "01",
    title: "Build a website",
    label: "Websites",
    summary:
      "A clear, mobile-friendly home for a business, service, idea, or organization.",
    price: "Packages from $750",
    projectType: "Website",
    tone: "yellow",
    size: "feature",
    packages: [
      { name: "One-Page Launch", price: "$750" },
      { name: "Small Business Website", price: "$1,500" },
      { name: "Growth Website", price: "$2,500" },
    ],
    includes: ["Responsive design", "Contact form", "Basic SEO", "Launch support"],
  },
  {
    id: "refresh",
    number: "02",
    title: "Refresh my website",
    label: "Website refresh",
    summary:
      "Sharper design, clearer flow, and a better mobile experience for an existing site.",
    price: "$1,200",
    projectType: "Website redesign",
    tone: "ink",
    size: "tall",
    packages: [{ name: "Website Refresh", price: "$1,200" }],
    includes: ["Up to 5 pages", "UX cleanup", "Mobile improvements", "One revision round"],
  },
 {
  id: "quick-design",
  number: "03",
  title: "Make one great design",
  label: "Quick design",
  summary:
    "Flyers, business cards, social graphics, price lists, signs, and more.",
  price: "From $35",
  projectType: "Flyer, invitation, or quick design",
  tone: "blue",
  size: "wide",
  packages: [
    { name: "Single Design", price: "$35" },
    { name: "Matching Pair", price: "$65" },
  ],
  includes: [
    "One custom design",
    "One size or format",
    "One revision round",
    "3-5 business days",
  ],
},
{
  id: "school",
  number: "04",
  title: "Help my school or PTO",
  label: "Schools + PTOs",
  summary:
    "Coordinated designs for fundraisers, spirit nights, programs, sign-ups, and school events.",
  price: "From $95",
  projectType: "School or PTO materials",
  tone: "mint",
  size: "standard",
  packages: [
    { name: "School + PTO Mini Kit", price: "$95" },
    { name: "School + PTO Event Kit", price: "$150" },
  ],
  includes: [
    "Three pieces in the Mini Kit",
    "Four pieces in the Event Kit",
    "Print + digital formats",
    "One revision round",
  ],
},
{
  id: "celebration",
  number: "05",
  title: "Make the moment stand out",
  label: "Parties + celebrations",
  summary:
    "Custom invitations and matching graphics for birthdays, celebrations, and family events.",
  price: "From $30",
  projectType: "Birthday or celebration design",
  tone: "coral",
  size: "standard",
  packages: [
    { name: "Digital Invitation", price: "$30" },
    { name: "Print + Digital Invitation", price: "$45" },
    { name: "Celebration Pair", price: "$65" },
  ],
  includes: [
    "Custom invitation design",
    "Phone-ready format",
    "One revision round",
    "3-5 business days",
  ],
},
{
  id: "qr-form",
  number: "06",
  title: "Create a QR sign + form",
  label: "Forms + QR codes",
  summary:
    "Turn registrations, RSVPs, quote requests, or sign-ups into one easy scan.",
  price: "From $35",
  projectType: "QR code and form",
  tone: "lilac",
  size: "standard",
  packages: [
    { name: "Branded QR Sign", price: "$35" },
    { name: "Simple Form + QR", price: "$65" },
    { name: "Signup Kit", price: "$95" },
  ],
  includes: [
    "Tested QR code",
    "Form options up to 10 questions",
    "Confirmation message",
    "One revision round",
  ],
},
{
  id: "logo",
  number: "07",
  title: "Start with a logo",
  label: "Logo design",
  summary:
    "A focused starter logo for a new business, club, program, or local idea.",
  price: "$250",
  projectType: "Logo design",
  tone: "paper",
  size: "standard",
  packages: [{ name: "Starter Logo", price: "$250" }],
  includes: [
    "One logo concept",
    "One revision round",
    "Color + black-and-white versions",
    "Final logo files",
  ],
},
  {
    id: "something-else",
    number: "08",
    title: "I need something else",
    label: "Not sure yet",
    summary:
      "Bring the idea, the rough notes, or the problem. We will figure out the right format together.",
    price: "Free fit check",
    projectType: "Not sure",
    tone: "outline",
    size: "wide",
    packages: [{ name: "Quick project fit check", price: "Free" }],
    includes: ["No polished brief needed", "Clear recommendation", "Exact scope", "Exact price"],
  },
];

export const websitePackages = [
  {
    name: "One-Page Launch",
    price: "$750",
    bestFor: "New businesses, focused services, events, and personal brands",
    includes: [
      "One custom page with up to 6 sections",
      "Mobile-friendly design",
      "Contact form",
      "Basic SEO setup",
      "One revision round",
    ],
  },
  {
    name: "Small Business Website",
    price: "$1,500",
    bestFor: "Established businesses that need a complete, credible online home",
    featured: true,
    includes: [
      "Up to 5 custom pages",
      "Mobile-friendly design",
      "Contact form and social links",
      "Basic SEO setup",
      "One revision round",
    ],
  },
  {
    name: "Growth Website",
    price: "$2,500",
    bestFor: "Growing brands that need more content, resources, and stronger lead flow",
    includes: [
      "Up to 8 custom pages",
      "Advanced inquiry form",
      "Blog or resource template",
      "Local SEO foundation",
      "Two revision rounds",
    ],
  },
];

export const quickDesignPackages = [
  {
    name: "Single Design",
    note: "Flyer, social graphic, price list, sign, or business card",
    price: "$35",
  },
  {
    name: "Matching Pair",
    note: "Two coordinated designs or formats",
    price: "$65",
  },
  {
    name: "Digital Invitation",
    note: "One custom phone-ready invitation",
    price: "$30",
  },
  {
    name: "Print + Digital Invitation",
    note: "Printable invitation plus phone-sharing version",
    price: "$45",
  },
  {
    name: "School + PTO Mini Kit",
    note: "Three coordinated pieces for one event or campaign",
    price: "$95",
  },
  {
    name: "Simple Form + QR",
    note: "Branded form, tested QR code, and confirmation",
    price: "$65",
  },
  {
    name: "Signup Kit",
    note: "Form, QR code, matching sign, and social graphic",
    price: "$95",
  },
  {
    name: "Starter Logo",
    note: "One concept, one revision, and final logo files",
    price: "$250",
  },
];

export const featuredWork = [
  {
    name: "Isabella Transport",
    type: "Transportation website",
    image: "/isabellaTransportHero.png",
    href: "/proof-of-work/isabella-transport",
    result: "A trustworthy digital home built to make booking the next ride easier.",
  },
  {
    name: "Glamp Camp Nashville",
    type: "Family experience website",
    image: "/glampCampNashvilleHero.png",
    href: "/proof-of-work/glamp-camp-nashville",
    result: "A playful experience that helps parents explore themes, prices, and booking.",
  },
  {
    name: "Blayne’s Family Research",
    type: "Family research website",
    image: "/blaynesFamilyResearchHero.png",
    href: "/proof-of-work/blaynes-family-research",
    result: "A warm, clear website shaped around trust, family stories, and easy contact.",
  },
];

export const labColors = [
  { name: "Sunshine", value: "#f4d40a" },
  { name: "Electric blue", value: "#2f5bea" },
  { name: "Coral", value: "#ff705f" },
  { name: "Mint", value: "#8ed7ae" },
  { name: "Purple", value: "#9c7bea" },
];

export const labWords = ["CREATE", "BE KIND", "TRY AGAIN", "DREAM BIG", "STAY CURIOUS"];

export const labShapes = [
  { id: "burst", name: "Burst" },
  { id: "circle", name: "Circle" },
  { id: "shield", name: "Shield" },
];
