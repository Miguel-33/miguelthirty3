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
      "Flyers, invitations, business cards, social graphics, price lists, and more.",
    price: "$65",
    projectType: "Flyer, invitation, or quick design",
    tone: "blue",
    size: "wide",
    packages: [
      { name: "Single Design", price: "$65" },
      { name: "Matching Pair", price: "$120" },
    ],
    includes: ["Print-ready file", "Digital file", "Two revision rounds", "3-5 business days"],
  },
  {
    id: "school",
    number: "04",
    title: "Help my school or PTO",
    label: "Schools + PTOs",
    summary:
      "A coordinated set for fundraisers, spirit nights, programs, sign-ups, and school events.",
    price: "$225",
    projectType: "School or PTO materials",
    tone: "mint",
    size: "standard",
    packages: [{ name: "School + PTO Kit", price: "$225" }],
    includes: ["Four matching pieces", "Print + digital formats", "QR code included", "Two revisions"],
  },
  {
    id: "celebration",
    number: "05",
    title: "Make the moment stand out",
    label: "Parties + celebrations",
    summary:
      "Custom invitations and matching graphics for birthdays, celebrations, and family events.",
    price: "$120",
    projectType: "Birthday or celebration design",
    tone: "coral",
    size: "standard",
    packages: [{ name: "Celebration Pair", price: "$120" }],
    includes: ["Invitation design", "One matching piece", "Print + phone formats", "Two revisions"],
  },
  {
    id: "qr-form",
    number: "06",
    title: "Create a QR sign + form",
    label: "Forms + QR codes",
    summary:
      "Turn registrations, RSVPs, quote requests, or sign-ups into one easy scan.",
    price: "$175",
    projectType: "QR code and form",
    tone: "lilac",
    size: "standard",
    packages: [{ name: "QR + Simple Form", price: "$175" }],
    includes: ["Branded form", "QR code", "Matching sign", "Confirmation message"],
  },
  {
    id: "logo",
    number: "07",
    title: "Start with a logo",
    label: "Logo design",
    summary:
      "A focused starter logo package for a new business, club, program, or local idea.",
    price: "$450",
    projectType: "Logo design",
    tone: "paper",
    size: "standard",
    packages: [{ name: "Starter Logo", price: "$450" }],
    includes: ["Two concepts", "Two revision rounds", "Color variations", "Final logo files"],
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
  { name: "Single Design", note: "Flyer, invitation, social graphic, price list, QR sign, or business card", price: "$65" },
  { name: "Matching Pair", note: "Two coordinated pieces or formats", price: "$120" },
  { name: "School + PTO Kit", note: "Four coordinated pieces for one school event or campaign", price: "$225" },
  { name: "QR + Simple Form", note: "Branded form, QR code, confirmation, and matching sign", price: "$175" },
  { name: "Starter Logo", note: "Two concepts, two revisions, and final logo files", price: "$450" },
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
