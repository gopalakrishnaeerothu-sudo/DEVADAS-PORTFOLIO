/* =====================================================================
   DEVADAS PORTFOLIO — CONTENT FILE
   ---------------------------------------------------------------------
   This is the ONLY file you need to edit to update the website.

   HOW TO ADD THINGS
   • New photos → put image files in  public/images/devadas/
   • Then write the path in the lists below (exact spelling, incl. .jpg/.png)

   If an image file is missing, the site automatically shows a styled
   placeholder instead, so nothing ever looks broken.
   ===================================================================== */

const SITE = {
  name: "Meesala Devadas",
  shortName: "Devadas",
  initials: "MD",
  roles: ["Aspiring Actor"],
  tagline: "Every character has a story. I'm ready to bring it to life.",

  // Main photo (used in the film strips and as a fallback)
  heroPhoto: "/images/profile/devadas-poster.jpg",

  // Photo shown in the "About" section, with a cinematic black & white effect
  aboutPhoto: "/images/devadas/coffee-smile.jpg",

  // About text: each line becomes a paragraph
  bio: [
    "Meesala Devadas is an aspiring actor from Hyderabad and Nidadavole, working towards his first break in front of the camera.",
    "His photoshoots already show the range he wants to bring to the screen: a blood-soaked, unnervingly calm character in one frame, a confident leading man on a rain-wet street in the next, and a warm, quick-to-laugh everyday guy in the one after that.",
    "He is comfortable on camera, takes direction seriously and is hungry to learn. He believes a look, a tilt of the head or a held silence can say more than a line of dialogue.",
    "He is open to auditions for feature films, short films, web series, music videos and ad campaigns, and he will give every role, big or small, his full commitment."
  ],

  // Text on the first (3D hero) screen
  hero: {
    hello: "Hi, I'm Devadas",                              // giant heading on the first screen
    cutout: "/images/profile/devadas-hero-cutout.webp",    // cut-out portrait standing over the 3D wheel
    tagline1: "Aspiring Actor · Hyderabad",
    tagline2: "ready for the first take",
    navCta: "Cast me",
    heroCta: "See my looks"
  },

  // Contact details: leave "" for anything you don't want shown
  contact: {
    email: "meesaladevadas77@gmail.com",
    // Each number gets a Call button and a WhatsApp button.
    phones: ["+91 63029 98003"],
    instagram: "https://www.instagram.com/editor_of_nidadavole?igsh=NHRkbmFxeGtnMXA1",
    youtube: "",
    facebook: "",
    imdb: "",
    location: "Hyderabad / Nidadavole, India"
  }
};

/* ---------------------------------------------------------------------
   PROFILE FACTS (shown in About)
   --------------------------------------------------------------------- */
const FACTS = [
  { label: "Full name", value: "Meesala Devadas" },
  { label: "Based in", value: "Hyderabad / Nidadavole" },
  { label: "Languages", value: "Telugu · English" },
  { label: "Pursuing", value: "Acting" },
  { label: "Open to", value: "Films · Web series · Ads · Music videos" },
  { label: "Status", value: "Open to auditions & first roles" }
];

/* ---------------------------------------------------------------------
   RANGE (three cards: the kinds of characters he plays)
   --------------------------------------------------------------------- */
const RANGE = [
  {
    icon: "🔥",
    title: "Intense & Dark",
    text: "Villains, outsiders and men on the edge, with a calm that is more unsettling than shouting.",
    points: ["Gritty, blood-and-sweat character looks", "Menace carried in stillness and the eyes", "Crime, thriller and action roles"]
  },
  {
    icon: "🎬",
    title: "Lead & Swagger",
    text: "The confident leading man: sunglasses, monsoon skies and a presence that owns the frame.",
    points: ["Hero entries and poster-style shots", "Street, night and landmark locations", "Style-led music video looks"]
  },
  {
    icon: "☕",
    title: "Warm & Everyday",
    text: "The friend, the colleague, the guy next door. Easy-going, natural and quick to laugh.",
    points: ["Natural, relaxed on-camera ease", "Light comedy and slice-of-life", "Brand and lifestyle ad campaigns"]
  }
];

/* ---------------------------------------------------------------------
   LOOKBOOK (photos of Devadas with a short story for each)
   cat   : which filter tab it sits under (must match a LOOKBOOK_CATS id)
   title : short headline · note : one or two sentences about the shot
   --------------------------------------------------------------------- */
const LOOKBOOK_CATS = [
  { id: "character", label: "In Character" },
  { id: "street", label: "Street & Style" },
  { id: "studio", label: "Studio & Off-Duty" }
];

const LOOKBOOK = [
  { src: "/images/devadas/cleaver-wall.jpg", cat: "character", title: "Stare Down",
    note: "Against a weathered yellow wall, head tilted, eyes locked on the lens. A gritty character look where the stare does all the talking." },
  { src: "/images/devadas/charminar-night.jpg", cat: "street", title: "Charminar Nights",
    note: "Hyderabad's landmark glowing gold behind him. A night portrait on the streets he calls home, built on deep blues and warm stone." },
  { src: "/images/devadas/coffee-smile.jpg", cat: "studio", title: "First Coffee",
    note: "A warm, easy laugh against a clean grey wall. The relaxed, good-humoured side that people who work with him know best." },
  { src: "/images/devadas/lockup-chair.jpg", cat: "character", title: "Lock-Up",
    note: "A police-station set, one wrist chained to the cell bars, and completely at ease. A character study in calm defiance." },
  { src: "/images/devadas/mg-hood.jpg", cat: "street", title: "Top of the Frame",
    note: "Standing tall on the bonnet under a heavy monsoon sky, an old brick ruin on the horizon. A hero shot composed like a film poster." },
  { src: "/images/devadas/office-headphones.jpg", cat: "studio", title: "Lost in Thought",
    note: "Headphones on, gaze far away, hand mid-gesture. A quiet, unposed moment that shows how naturally he holds the camera." },
  { src: "/images/devadas/cleaver-forest.jpg", cat: "character", title: "The Butcher's Calm",
    note: "Wet hair, stage blood and a cleaver in a dry forest. A dark look where the stillness is scarier than the prop." },
  { src: "/images/devadas/balcony.jpg", cat: "street", title: "Iron & Rust",
    note: "Leaning over an old iron balcony, framed by rust, steel and geometric grilles. A brooding, confident look." },
  { src: "/images/devadas/mirror-lens.jpg", cat: "studio", title: "Mirror, Mirror",
    note: "A close-up in soft window light: tousled hair, a thoughtful downward glance and every detail of the face on show." },
  { src: "/images/devadas/mg-shades.jpg", cat: "street", title: "Monsoon Shades",
    note: "Raindrops beading on a white SUV and a slow reach for the sunglasses. Moody overcast light and leading-man attitude." },
  { src: "/images/devadas/coffee-sip.jpg", cat: "studio", title: "Studio Break",
    note: "Maroon shirt, grey wall, a slow sip in profile. Minimal, clean and completely at ease." },
  { src: "/images/devadas/car-door.jpg", cat: "street", title: "Driver's Seat",
    note: "Half in, half out of the car with a glance back over the shoulder. Natural light, shallow depth and easy charm." },
  { src: "/images/devadas/office-cap.jpg", cat: "studio", title: "Off the Clock",
    note: "Cap low, sleeve rolled, tattoo on show. A candid, laid-back moment with real street-style energy." },
  { src: "/images/devadas/puppy.jpg", cat: "studio", title: "Best Co-Star",
    note: "Golden light, a soft city backdrop and a fluffy co-star who stole the whole scene." }
];

/* ---------------------------------------------------------------------
   PHOTO GALLERY ("All photos" grid + film strips)
   --------------------------------------------------------------------- */
const GALLERY = [
  { src: "/images/devadas/mg-hood.jpg", caption: "Top of the frame" },
  { src: "/images/devadas/charminar-night.jpg", caption: "Charminar nights" },
  { src: "/images/devadas/cleaver-wall.jpg", caption: "In character" },
  { src: "/images/devadas/coffee-smile.jpg", caption: "First coffee" },
  { src: "/images/devadas/lockup-chair.jpg", caption: "Lock-up" },
  { src: "/images/devadas/balcony.jpg", caption: "Iron & rust" },
  { src: "/images/devadas/office-headphones.jpg", caption: "Lost in thought" },
  { src: "/images/devadas/cleaver-forest.jpg", caption: "The butcher's calm" },
  { src: "/images/devadas/mirror-lens.jpg", caption: "Mirror, mirror" },
  { src: "/images/devadas/mg-shades.jpg", caption: "Monsoon shades" },
  { src: "/images/devadas/coffee-sip.jpg", caption: "Studio break" },
  { src: "/images/devadas/car-door.jpg", caption: "Driver's seat" },
  { src: "/images/devadas/cleaver-portrait.jpg", caption: "Look test" },
  { src: "/images/devadas/office-cap.jpg", caption: "Off the clock" },
  { src: "/images/devadas/balcony-square.jpg", caption: "Balcony portrait" },
  { src: "/images/devadas/puppy.jpg", caption: "Best co-star" },
  { src: "/images/profile/devadas-poster.jpg", caption: "Poster portrait" },
  { src: "/images/profile/devadas-hero-full.jpg", caption: "Brush portrait" }
];

/* ---------------------------------------------------------------------
   3D CAROUSEL (a shorter pick, so the spinning ring stays readable)
   --------------------------------------------------------------------- */
const CAROUSEL = [
  { src: "/images/devadas/mg-hood.jpg", caption: "Top of the frame" },
  { src: "/images/devadas/charminar-night.jpg", caption: "Charminar nights" },
  { src: "/images/devadas/cleaver-wall.jpg", caption: "In character" },
  { src: "/images/devadas/coffee-sip.jpg", caption: "Studio break" },
  { src: "/images/devadas/lockup-chair.jpg", caption: "Lock-up" },
  { src: "/images/devadas/mg-shades.jpg", caption: "Monsoon shades" },
  { src: "/images/devadas/car-door.jpg", caption: "Driver's seat" },
  { src: "/images/devadas/cleaver-forest.jpg", caption: "The butcher's calm" },
  { src: "/images/devadas/balcony.jpg", caption: "Iron & rust" },
  { src: "/images/devadas/coffee-smile.jpg", caption: "First coffee" },
  { src: "/images/devadas/office-cap.jpg", caption: "Off the clock" },
  { src: "/images/devadas/puppy.jpg", caption: "Best co-star" }
];

/* ---------------------------------------------------------------------
   3D RING PHOTOS (the rotating wheel of cards on the first screen)
   --------------------------------------------------------------------- */
const RING_PHOTOS = [
  "/images/devadas/cleaver-wall.jpg",
  "/images/devadas/charminar-night.jpg",
  "/images/devadas/coffee-sip.jpg",
  "/images/devadas/mg-hood.jpg",
  "/images/devadas/lockup-chair.jpg",
  "/images/devadas/mg-shades.jpg",
  "/images/devadas/coffee-smile.jpg",
  "/images/devadas/balcony.jpg",
  "/images/devadas/car-door.jpg",
  "/images/devadas/cleaver-forest.jpg"
];
