/* =====================================================================
   DEVADAS PORTFOLIO — CONTENT FILE
   ---------------------------------------------------------------------
   This is the ONLY file you need to edit to update the website.

   HOW TO ADD THINGS
   • His photos       → put image files in  public/images/profile/  or  public/images/gallery/
   • Project images   → put image files in  public/images/work/
   • Then write the path in the lists below (exact spelling, incl. .jpg/.png)

   If an image file is missing, the site automatically shows a styled
   placeholder instead, so nothing ever looks broken.
   ===================================================================== */

const SITE = {
  name: "Meesala Devadas",
  shortName: "Devadas",
  initials: "MD",
  roles: ["Video Editor", "Cinematographer", "Visual Storyteller"],
  tagline: "Every frame has a story. I bring it to life.",

  // Main photo (used in the film strips and as a fallback)
  heroPhoto: "/images/profile/devadas-poster.jpg",

  // Photo shown in the "About" section, with a cinematic black & white effect
  aboutPhoto: "/images/profile/devadas-original.jpg",

  // About text: each line becomes a paragraph
  bio: [
    "Meesala Devadas is a video editor, cinematographer and visual storyteller based in Hyderabad and Nidadavole, turning raw footage and creative vision into films that people feel.",
    "As an editor, he works in rhythm: pacing, beat-matched cuts, J and L audio cuts and speed ramps that carry an audience from the first frame to the last. Commercials, music videos, short films, wedding films and creator reels all get the same care.",
    "Behind the camera, he shapes light and composition, from moody low-light framing to golden-hour warmth. In the grade, he builds distinctive cinematic looks in DaVinci Resolve, and in the mix, he layers Foley and ambience until the picture breathes.",
    "He trained in film editing, cinematography and photography at Restart Academy, Hyderabad, where he now leads post-production for film, advertising and non-profit projects."
  ],

  // Text on the first (3D hero) screen
  hero: {
    hello: "Hi, I'm Devadas",                              // giant heading on the first screen
    cutout: "/images/profile/devadas-hero-cutout.webp",    // cut-out portrait standing over the 3D wheel
    tagline1: "Video Editor · Cinematographer",
    tagline2: "every frame has a story",
    navCta: "Get in touch",
    heroCta: "Watch my work"
  },

  // Process section intro
  processIntro:
    "Every project moves through the same four stages, so the story stays clear from the first idea to the final master: a vision agreed up front, footage captured with intent, a timeline cut to rhythm, and a grade and mix that make it cinematic.",

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
   PROJECTS (shown as poster cards; click opens details + Watch button)
   poster : title-related image inside public/images/work/
   link   : Google Drive (or YouTube) watch URL
   --------------------------------------------------------------------- */
const MOVIES = [
  {
    title: "Thar 4x4",
    year: "2024",
    duration: "0:45",
    genre: "Automotive Commercial",
    role: "High-octane commercial",
    tags: ["Speed Ramping", "Engine Foley Design", "Teal & Orange Grade"],
    tools: "DaVinci Resolve · CapCut Pro · Custom Foley",
    link: "https://drive.google.com/file/d/1iFsdpZDJNIg7pxljyGZgtfs5dqDqX5GD/view?usp=drivesdk",
    poster: "/images/work/thar.jpg",
    description: "An adrenaline-fuelled automotive commercial built on raw horsepower. Aggressive speed ramping and punchy transition cuts are driven by high-impact sound design: engine revs, gravel crunches and bass drops that keep the pulse up from start to finish."
  },
  {
    title: "Cover Song",
    year: "2024",
    duration: "3:42",
    genre: "Music Video",
    role: "Melodic visual odyssey",
    tags: ["Beat-Synced Cuts", "Warm Film Emulation", "Multi-Angle Lighting"],
    tools: "DaVinci Resolve · Premiere Pro · Audition",
    link: "https://drive.google.com/file/d/1BkbV98CpzX1OXd7tmZp71UC0r3JI8PeJ/view?usp=drivesdk",
    poster: "/images/work/cover-song.jpg",
    description: "A rhythmic musical cover film taken from pre-production to final master. Cut points are synced to the musical crescendo, and an amber-violet cinematic grade keeps natural skin tones under complex studio lighting."
  },
  {
    title: "Honey Is The Best",
    year: "2024",
    duration: "2:15",
    genre: "Short Film",
    role: "Narrative short with creators",
    tags: ["Dialogue Pacing", "Punchy Sound Cues", "Color Harmony"],
    tools: "Premiere Pro · CapCut · Photoshop",
    link: "https://drive.google.com/file/d/1Qek2k4QKTRrcL02eNKhRQB26Oeme7ID5/view?usp=drivesdk",
    poster: "/images/work/honey.jpg",
    description: "A humorous and intense narrative short made with digital creators. Dialogue cuts are timed so every joke and dramatic beat lands, location audio is cleaned, and playful sound cues sit inside cinematic framing."
  },
  {
    title: "Chintu Weds Sanju",
    year: "2024",
    duration: "4:10",
    genre: "Wedding Film",
    role: "Cinematic wedding teaser",
    tags: ["Golden Hour Tones", "Emotional Soundscapes", "Smooth Slow-Mo"],
    tools: "DaVinci Resolve · Premiere Pro · LUT Color Science",
    link: "https://drive.google.com/file/d/1LqQ3R7MaUcigwdIZijgyoyU5d8otD04s/view?usp=drivesdk",
    poster: "/images/work/wedding.jpg",
    description: "A narrative-first wedding highlight film that captures raw emotion, vows and traditional celebration. Speeches and vows are woven over visual crescendos with rich golden-hour film tones and a multi-track acoustic score."
  },
  {
    title: "Anamorphic Dreams",
    year: "2024",
    duration: "1:30",
    genre: "Cinematography Reel",
    role: "Light, lens and shadow",
    tags: ["Anamorphic Aspect Ratio", "Natural Rim Lighting", "Color Depth"],
    tools: "DaVinci Resolve · Blackmagic RAW · Anamorphic Lenses",
    link: "https://drive.google.com/file/d/1BkbV98CpzX1OXd7tmZp71UC0r3JI8PeJ/view?usp=drivesdk",
    poster: "/images/work/cinematography.jpg",
    description: "A personal showcase of camera technique: atmospheric lighting, low-light nightscapes, lens flares, deliberate blocking and handheld intimacy across different genres."
  },
  {
    title: "Restart Academy Showcase",
    year: "2024",
    duration: "1:50",
    genre: "Promotional Film",
    role: "Academy & non-profit promo",
    tags: ["Documentary Pacing", "Engaging B-Roll", "Story Arc"],
    tools: "Premiere Pro · DaVinci Resolve",
    link: "https://drive.google.com/file/d/1iFsdpZDJNIg7pxljyGZgtfs5dqDqX5GD/view?usp=drivesdk",
    poster: "/images/work/academy.jpg",
    description: "A promotional film for Restart Academy and its charitable initiatives. Student soundbites, fast-moving workshop b-roll and an uplifting score drive awareness and engagement."
  }
];

/* ---------------------------------------------------------------------
   PHOTO GALLERY (rotating 3D carousel + "All photos" grid)
   --------------------------------------------------------------------- */
const GALLERY = [
  { src: "/images/profile/devadas-poster.jpg", caption: "Portrait" },
  { src: "/images/work/thar.jpg", caption: "Thar 4x4" },
  { src: "/images/profile/devadas-original.jpg", caption: "In the edit" },
  { src: "/images/work/cover-song.jpg", caption: "Cover Song" },
  { src: "/images/gallery/cinema-camera.jpg", caption: "Cinema camera" },
  { src: "/images/work/wedding.jpg", caption: "Chintu Weds Sanju" },
  { src: "/images/profile/devadas-cinematic.jpg", caption: "Cinematic look" },
  { src: "/images/work/honey.jpg", caption: "Honey Is The Best" },
  { src: "/images/gallery/studio-mic.jpg", caption: "Sound design" },
  { src: "/images/work/cinematography.jpg", caption: "Anamorphic Dreams" },
  { src: "/images/gallery/film-set.jpg", caption: "On set" },
  { src: "/images/work/academy.jpg", caption: "Restart Academy" },
  { src: "/images/gallery/thar-red.jpg", caption: "Automotive shoot" },
  { src: "/images/profile/devadas-hero-full.jpg", caption: "Brush portrait" }
];

/* ---------------------------------------------------------------------
   TRAINING (shown in About, in order)
   --------------------------------------------------------------------- */
const QUALIFICATIONS = [
  { title: "Professional Diploma in Film Editing, Cinematography & Photography", type: "Restart Academy" }
];

/* ---------------------------------------------------------------------
   SOFTWARE TOOLS (shown in the "Tools of the Trade" grid)
   mono : the letters shown in the logo frame · color : its glow colour
   --------------------------------------------------------------------- */
const TOOLS = [
  { name: "DaVinci Resolve Studio", mono: "Dv", color: "#ff5a5a", level: "Advanced · Primary", proficiency: 95,
    desc: "Node-based colour grading, Fairlight audio mixing and high-fidelity 4K exports." },
  { name: "Adobe Premiere Pro", mono: "Pr", color: "#9999ff", level: "Advanced · Primary", proficiency: 94,
    desc: "Narrative cutting, multi-cam sync and timeline collaboration." },
  { name: "CapCut Pro", mono: "Cc", color: "#3fe3ff", level: "Master · Primary", proficiency: 96,
    desc: "Fast vertical reels, viral sound transitions, keyframe animation and trending effects." },
  { name: "Adobe After Effects", mono: "Ae", color: "#d291ff", level: "Intermediate", proficiency: 82,
    desc: "Kinetic typography, logo reveals, stabilisation and VFX compositing." },
  { name: "Adobe Photoshop", mono: "Ps", color: "#31a8ff", level: "Proficient", proficiency: 88,
    desc: "High-CTR thumbnails, posters, graphic overlays and asset clean-up." },
  { name: "Audition / Fairlight", mono: "Au", color: "#00e676", level: "Proficient", proficiency: 86,
    desc: "Spectral editing, EQ, compression and cinematic atmospheric sound beds." }
];

const FACTS = [
  { label: "Full name", value: "Meesala Devadas" },
  { label: "Based in", value: "Hyderabad / Nidadavole" },
  { label: "Languages", value: "Telugu · English" },
  { label: "Instagram", value: "@editor_of_nidadavole" },
  { label: "Work", value: "Editor · Cinematographer · Colorist" },
  { label: "Status", value: "Available for freelance & full-time" }
];

/* ---------------------------------------------------------------------
   THE CRAFT (three cards)
   --------------------------------------------------------------------- */
const CRAFT = [
  {
    icon: "✂️",
    title: "Video Editor",
    text: "Pacing, rhythm and narrative arcs: the cut decides what the audience feels.",
    points: ["Beat-matched, dynamic cutting", "High-retention reels with 3-second hooks", "Multi-camera timeline workflows"]
  },
  {
    icon: "🎥",
    title: "Cinematographer",
    text: "Composition, camera motion and light that shape every frame.",
    points: ["Anamorphic framing & gimbal work", "Key, rim and low-light lighting", "Storyboards and shot planning"]
  },
  {
    icon: "🎨",
    title: "Colour & Sound",
    text: "Cinematic grades and layered sound that make footage feel alive.",
    points: ["DaVinci grades, LUTs, skin-tone care", "Foley, dialogue clean-up, mastering", "Film emulation and HDR tone mapping"]
  }
];

/* ---------------------------------------------------------------------
   EXPERIENCE
   --------------------------------------------------------------------- */
const EXPERIENCE = [
  {
    icon: "🎬",
    role: "Video Editor & Post-Production Specialist",
    company: "Restart Academy · Hyderabad",
    period: "2023 — Present",
    points: [
      "Leads editing workflows for film and advertising projects",
      "Promotional films and multi-camera event coverage for non-profits",
      "Colour grading, audio restoration and custom LUTs in DaVinci Resolve"
    ]
  },
  {
    icon: "🎥",
    role: "Independent Cinematographer & Freelance Editor",
    company: "Devadas Creative Studio · Hyderabad / Nidadavole",
    period: "2022 — Present",
    points: [
      "25+ commercial reels, wedding teasers, music videos and shorts",
      "Visual styles that lifted client social engagement by over 300%",
      "End-to-end production: treatment, lighting, edit and grade"
    ]
  }
];

/* ---------------------------------------------------------------------
   3D RING PHOTOS (the rotating wheel of cards on the first screen)
   --------------------------------------------------------------------- */
const RING_PHOTOS = [
  "/images/work/thar.jpg",
  "/images/profile/devadas-original.jpg",
  "/images/work/cover-song.jpg",
  "/images/work/wedding.jpg",
  "/images/gallery/cinema-camera.jpg",
  "/images/work/cinematography.jpg",
  "/images/work/honey.jpg",
  "/images/gallery/film-set.jpg"
];

/* ---------------------------------------------------------------------
   CREATIVE PROCESS (four cards)
   --------------------------------------------------------------------- */
const PROCESS = [
  { icon: "💡", title: "01 · Idea & Vision", text: "Deconstructing the story: audience mood, pacing, visual references and the soundscape." },
  { icon: "🎥", title: "02 · Production", text: "Cinematic angles, camera moves, three-point lighting and crisp 4K capture with multi-track audio." },
  { icon: "✂️", title: "03 · Editing & Rhythm", text: "Assembly, tempo sync, speed ramps and J/L cuts, tightening every millisecond." },
  { icon: "🎨", title: "04 · Colour & Sound", text: "Node-based grading, film grain, spatial Foley and multi-platform master export." }
];

/* ---------------------------------------------------------------------
   IMAGE CREDITS (title images are freely licensed from Wikimedia Commons)
   --------------------------------------------------------------------- */
const COMMONS = "https://commons.wikimedia.org/wiki/File:";
const CREDITS = [
  { label: "Thar · DjDavid1998", license: "CC BY-SA 4.0", url: COMMONS + "Mahindra_Thar_Photoshoot_at_Perupalem_Beach_(West_Godavari_District,_AP,_India)_Djdavid.jpg" },
  { label: "Red Thar · Ank Kumar", license: "CC BY-SA 4.0", url: COMMONS + "Mahindra_Thar_SUV_in_%22Red_Rage%22_color_at_Ashiana_Brahmanda,_East_Singbhum_India_(Ank_Kumar,_Infosys_limited)_01.jpg" },
  { label: "Microphone · Will Fisher", license: "CC BY-SA 2.0", url: COMMONS + "Neumann_U87_Condenser_Microphone_-_Studio_A,_In_Your_Ear_Studios.jpg" },
  { label: "Studio mic · Tim Sheerman-Chase", license: "CC BY 2.0", url: COMMONS + "Condenser_Microphone_with_Pop_Filter_and_Reflection_Filter.jpg" },
  { label: "Honey · Scott Bauer, USDA ARS", license: "Public domain", url: COMMONS + "Runny_hunny.jpg" },
  { label: "Wedding · Maheima Kapur", license: "CC BY 3.0", url: COMMONS + "Bride_And_Groom_After_An_Indian_Wedding_(156684579).jpeg" },
  { label: "Cinema camera · Sean P. Anderson", license: "CC BY 2.0", url: COMMONS + "Arri_Alexa_camera.jpg" },
  { label: "Camera · Major Eleven", license: "CC BY-SA 3.0", url: COMMONS + "Arri_Alexa_01.jpg" },
  { label: "Clapperboard · Mattbr", license: "CC BY 2.0", url: COMMONS + "Clapperboard,_O2_film,_September_2008.jpg" },
  { label: "Film set · Lesless", license: "CC BY-SA 4.0", url: COMMONS + "Film_set_in_Moscow_20240618_152950.jpg" }
];
