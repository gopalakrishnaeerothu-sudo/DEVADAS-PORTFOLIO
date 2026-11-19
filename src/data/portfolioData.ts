export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  description: string;
  longDescription?: string;
  driveUrl: string;
  driveEmbed: string;
  thumbnail: string;
  tools: string[];
  duration: string;
  highlights: string[];
  year: string;
}

export interface SkillItem {
  title: string;
  category: string;
  level: number;
  description: string;
  tags: string[];
  icon: string;
}

export interface SoftwareTool {
  name: string;
  category: string;
  level: string;
  proficiency: number;
  description: string;
  color: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "MEESALA DEVADAS",
    shortName: "DEVADAS",
    title: "Creative Video Editor | Cinematographer | Visual Storyteller",
    tagline: "Every Frame Has a Story. I Bring It to Life.",
    subtagline: "Transforming raw footage and creative vision into high-impact visual stories, cinematic rhythms, and memorable emotional journeys.",
    bio: "Devadas is a passionate creative professional based in Hyderabad and Nidadavole, dedicated to visual storytelling, filmmaking, and modern post-production. With hands-on expertise in DaVinci Resolve, Adobe Premiere Pro, and CapCut, he merges rhythmic pacing, evocative color science, and spatial audio to produce films, commercials, and digital creator content that captivates audiences.",
    location: "Hyderabad / Nidadavole, India",
    phone: "+91 63029 98003",
    email: "meesaladevadas77@gmail.com",
    whatsapp: "https://wa.me/916302998003",
    instagram: "@editor_of_nidadavole",
    instagramUrl: "https://www.instagram.com/editor_of_nidadavole?igsh=NHRkbmFxeGtnMXA1",
    languages: ["Telugu (Native)", "English (Professional)"],
    status: "Available for Freelance & Full-time Productions",
    heroImage: "/images/profile/devadas-portrait.jpg",
    cinematicImage: "/images/profile/devadas-cinematic.jpg",
  },

  skills: [
    {
      title: "Video Editing",
      category: "Post-Production",
      level: 95,
      description: "Mastery of pacing, rhythm, narrative arcs, dynamic cross-cutting, and multi-camera timeline workflows.",
      tags: ["Timeline Pacing", "Beat-Matching", "Narrative Arcs", "Dynamic Transitions"],
      icon: "Film"
    },
    {
      title: "Cinematography",
      category: "Camera & Lighting",
      level: 90,
      description: "Composition, aspect ratios, dynamic camera motion, three-point studio lighting, and moody low-light framing.",
      tags: ["Visual Composition", "Anamorphic Framing", "Key & Rim Lighting", "Gimbal Work"],
      icon: "Camera"
    },
    {
      title: "Color Grading",
      category: "Color Science",
      level: 92,
      description: "Crafting distinctive cinematic looks, skin-tone isolation, film emulation, teal-and-orange grades, and LUT building.",
      tags: ["DaVinci Color Wheels", "LUT Calibration", "Skin Tone Correction", "HDR Tone Mapping"],
      icon: "Palette"
    },
    {
      title: "Audio & Sound Design",
      category: "Acoustics",
      level: 88,
      description: "Audio cleanup, noise suppression, dialogue leveling, cinematic Foley, sub-bass drops, and spatial ambiance.",
      tags: ["Foley FX", "Dialogue Isolation", "Stereo Widening", "Audio Mastering"],
      icon: "Volume2"
    },
    {
      title: "Creative Screenwriting",
      category: "Pre-Production",
      level: 85,
      description: "Story conception, treatment drafting, screenplay formatting, and visual storyboard sketching for emotional resonance.",
      tags: ["Story Arcs", "Screenplay Format", "Storyboard Layout", "Character Beats"],
      icon: "PenTool"
    },
    {
      title: "Social & Viral Content",
      category: "Content Strategy",
      level: 94,
      description: "High-retention 9:16 vertical editing, 3-second hook design, kinetic typography, and trend adaptation for creators.",
      tags: ["Reels & Shorts", "Hook Optimization", "Kinetic Captions", "Pacing Analytics"],
      icon: "Sparkles"
    }
  ] as SkillItem[],

  tools: [
    {
      name: "DaVinci Resolve Studio",
      category: "Color & Advanced Post",
      level: "Advanced / Primary",
      proficiency: 95,
      description: "Primary powerhouse for node-based color grading, Fairlight audio mixing, and high-fidelity 4K exports.",
      color: "#FF5E36"
    },
    {
      name: "Adobe Premiere Pro",
      category: "NLE Video Editing",
      level: "Advanced / Primary",
      proficiency: 94,
      description: "Industry-standard non-linear editing for narrative cutting, multi-cam sync, and timeline collaboration.",
      color: "#9999FF"
    },
    {
      name: "CapCut Pro",
      category: "Fast Paced & Social",
      level: "Master / Primary",
      proficiency: 96,
      description: "Rapid delivery of high-velocity vertical reels, viral sound transitions, keyframe animation, and trending effects.",
      color: "#00E5FF"
    },
    {
      name: "Adobe After Effects",
      category: "Motion & VFX",
      level: "Intermediate",
      proficiency: 82,
      description: "Kinetic typography, logo reveals, speed ramping stabilization, and visual effects compositing.",
      color: "#D291FF"
    },
    {
      name: "Adobe Photoshop",
      category: "Design & Thumbnails",
      level: "Proficient",
      proficiency: 88,
      description: "High-CTR YouTube and Reel thumbnail composition, posters, graphic overlays, and asset cleaning.",
      color: "#31A8FF"
    },
    {
      name: "Adobe Audition / Fairlight",
      category: "Audio Engineering",
      level: "Proficient",
      proficiency: 86,
      description: "Spectral frequency editing, EQ balancing, compression, and cinematic atmospheric sound beds.",
      color: "#00E676"
    }
  ] as SoftwareTool[],

  projects: [
    {
      id: "project-cover-song",
      title: "COVER SONG — Melodic Visual Odyssey",
      category: "Music Video",
      badge: "Featured Production",
      description: "A rhythmic, visually captivating musical cover film featuring warm color grading, dynamic beat cuts, and emotive cinematography.",
      longDescription: "Engineered from pre-production through final master. Utilized DaVinci Resolve for an amber-violet cinematic grade, matching rhythmically synced cut points to the musical crescendo while retaining natural skin tones under complex studio lighting.",
      driveUrl: "https://drive.google.com/file/d/1BkbV98CpzX1OXd7tmZp71UC0r3JI8PeJ/view?usp=drivesdk",
      driveEmbed: "https://drive.google.com/file/d/1BkbV98CpzX1OXd7tmZp71UC0r3JI8PeJ/preview",
      thumbnail: "/images/projects/cover-song.jpg",
      tools: ["DaVinci Resolve", "Premiere Pro", "Audition"],
      duration: "3:42",
      highlights: ["Beat-Synced Cuts", "Warm Film Emulation", "Multi-Angle Lighting"],
      year: "2024"
    },
    {
      id: "project-thar-cinematic",
      title: "THAR 4X4 — High-Octane Commercial",
      category: "Automotive & Commercial",
      badge: "High Energy",
      description: "Adrenaline-fueled automotive showcase highlighting the raw power and aesthetics of the Mahindra Thar with speed ramping and sound design.",
      longDescription: "A fast-paced commercial edit with high-impact sound design (engine revs, gravel crunches, bass drops). Handled aggressive speed ramping and punchy transition cuts that maintain viewer adrenaline throughout.",
      driveUrl: "https://drive.google.com/file/d/1iFsdpZDJNIg7pxljyGZgtfs5dqDqX5GD/view?usp=drivesdk",
      driveEmbed: "https://drive.google.com/file/d/1iFsdpZDJNIg7pxljyGZgtfs5dqDqX5GD/preview",
      thumbnail: "/images/projects/thar-cinematic.jpg",
      tools: ["DaVinci Resolve", "CapCut Pro", "Custom Foley"],
      duration: "0:45",
      highlights: ["Speed Ramping", "Engine Foley Design", "Teal & Orange Grade"],
      year: "2024"
    },
    {
      id: "project-honey-shortfilm",
      title: "HONEY IS THE BEST — Narrative Short Film",
      category: "Short Film & Creator",
      badge: "Storytelling",
      description: "Humorous and engaging narrative video collaborating with digital creators, focusing on comedic timing, clean dialogues, and character focus.",
      longDescription: "Directed timing and dialogue cuts to ensure jokes landed with punch. Cleaned on-location ambient audio noise and integrated playful sound cues while maintaining cinematic framing.",
      driveUrl: "https://drive.google.com/file/d/1Qek2k4QKTRrcL02eNKhRQB26Oeme7ID5/view?usp=drivesdk",
      driveEmbed: "https://drive.google.com/file/d/1Qek2k4QKTRrcL02eNKhRQB26Oeme7ID5/preview",
      thumbnail: "/images/projects/honey-shortfilm.jpg",
      tools: ["Adobe Premiere Pro", "CapCut", "Photoshop"],
      duration: "2:15",
      highlights: ["Dialogue Pacing", "Punchy Sound Cues", "Color Harmony"],
      year: "2024"
    },
    {
      id: "project-chintu-wedding",
      title: "CHINTU WEDS SANJU — Cinematic Wedding Teaser",
      category: "Wedding & Event",
      badge: "Emotional Narrative",
      description: "Heartwarming, cinematic wedding highlight reel capturing raw emotions, vows, and traditional celebrations with golden-hour warmth.",
      longDescription: "Crafted a narrative-first wedding highlights film. Interwove speeches and vows over visual crescendos, utilizing rich golden-hour film LUTs and multi-track acoustic arrangement.",
      driveUrl: "https://drive.google.com/file/d/1LqQ3R7MaUcigwdIZijgyoyU5d8otD04s/view?usp=drivesdk",
      driveEmbed: "https://drive.google.com/file/d/1LqQ3R7MaUcigwdIZijgyoyU5d8otD04s/preview",
      thumbnail: "/images/projects/chintu-wedding.jpg",
      tools: ["DaVinci Resolve", "Premiere Pro", "Lut Color Science"],
      duration: "4:10",
      highlights: ["Golden Hour Tones", "Emotional Soundscapes", "Smooth Slow-Mo"],
      year: "2024"
    },
    {
      id: "project-cinematography",
      title: "ANAMORPHIC DREAMS — Cinematography Reel",
      category: "Cinematography",
      badge: "Visual Art",
      description: "Exploration of atmospheric lighting, low-light nightscapes, lens flares, and deliberate camera blocking.",
      longDescription: "Personal showcase of camera technique, framing compositions, practical shadows, and deliberate handheld intimacy across different genres.",
      driveUrl: "https://drive.google.com/file/d/1BkbV98CpzX1OXd7tmZp71UC0r3JI8PeJ/view?usp=drivesdk",
      driveEmbed: "https://drive.google.com/file/d/1BkbV98CpzX1OXd7tmZp71UC0r3JI8PeJ/preview",
      thumbnail: "/images/projects/cinematography-1.jpg",
      tools: ["DaVinci Resolve", "Blackmagic RAW", "Anamorphic Lenses"],
      duration: "1:30",
      highlights: ["Anamorphic Aspect Ratio", "Natural Rim Lighting", "Color Depth"],
      year: "2024"
    },
    {
      id: "project-restart-showcase",
      title: "RESTART ACADEMY SHOWCASE — Promotional Film",
      category: "Promotional & Non-Profit",
      badge: "Impactful",
      description: "Impactful promotional video produced for Restart Academy and charitable initiatives, driving awareness and student engagement.",
      longDescription: "High-impact storytelling for academy outreach and social initiatives. Combined student soundbites, fast-moving workshop b-roll, and uplifting motivational scoring.",
      driveUrl: "https://drive.google.com/file/d/1iFsdpZDJNIg7pxljyGZgtfs5dqDqX5GD/view?usp=drivesdk",
      driveEmbed: "https://drive.google.com/file/d/1iFsdpZDJNIg7pxljyGZgtfs5dqDqX5GD/preview",
      thumbnail: "/images/projects/event-reel.jpg",
      tools: ["Adobe Premiere Pro", "DaVinci Resolve"],
      duration: "1:50",
      highlights: ["Documentary Pacing", "Engaging B-Roll", "Story Arc"],
      year: "2024"
    }
  ] as ProjectItem[],

  experience: [
    {
      role: "Video Editor & Post-Production Specialist",
      company: "Restart Academy",
      location: "Hyderabad, India",
      period: "2023 — Present",
      type: "Full-Time / Studio",
      achievements: [
        "Led video editing workflows for a variety of film and advertising projects, ensuring seamless visual storytelling and high-quality production standards.",
        "Produced compelling promotional videos and multi-camera event coverage for non-profit organizations and charitable causes.",
        "Collaborated intimately with top content creators and influencers to bring creative visions into viral reality while keeping strict timelines and budgets.",
        "Specialized in DaVinci Resolve color grading, audio restoration, and custom LUT application."
      ]
    },
    {
      role: "Independent Cinematographer & Freelance Editor",
      company: "Devadas Creative Studio",
      location: "Hyderabad / Nidadavole",
      period: "2022 — Present",
      type: "Freelance & Client Collaborations",
      achievements: [
        "Delivered 25+ finished commercial reels, wedding teasers, music videos, and social media shorts.",
        "Engineered distinct visual aesthetics that boosted client social engagement by over 300%.",
        "Managed end-to-end production pipelines: from treatment conceptualization and lighting setup to final color grading."
      ]
    }
  ],

  creativeProcess: [
    {
      step: "01",
      title: "IDEA & VISION",
      subtitle: "Deconstructing the Story",
      description: "Deep dive into the narrative soul, target audience mood, pacing rhythm, visual references, and audio soundscape vision.",
      icon: "Lightbulb"
    },
    {
      step: "02",
      title: "PRODUCTION",
      subtitle: "Visual Framing & Capture",
      description: "Setting cinematic angles, camera moves, three-point lighting, and capturing crisp 4K footage and multi-track audio.",
      icon: "Video"
    },
    {
      step: "03",
      title: "EDITING & RHYTHM",
      subtitle: "Sculpting the Timeline",
      description: "Rough cut assembly, tempo syncing, dynamic speed ramping, J/L audio cuts, and tightening every millisecond.",
      icon: "Sliders"
    },
    {
      step: "04",
      title: "COLOR & SOUND MASTER",
      subtitle: "The Cinematic Polish",
      description: "Node-based DaVinci color grading, film grain texture, spatial Foley sound effects, and multi-platform master export.",
      icon: "Sparkles"
    }
  ],

  education: [
    {
      degree: "Professional Diploma in Film Editing, Cinematography & Photography",
      institution: "Restart Academy",
      location: "Hyderabad, India",
      period: "Comprehensive Program",
      highlights: [
        "Enriched academic journey encompassing advanced film editing techniques, cinematography, and screenwriting.",
        "Engaged in hands-on real-world film projects that honed practical skills in camera mechanics, lighting setups, and post-production workflows.",
        "Mastered industry-standard NLE tools (DaVinci Resolve, Premiere Pro) and narrative pacing."
      ]
    }
  ],

  principlesView: [
    {
      term: "Storytelling",
      subtitle: "The Soul of the Frame",
      text: "Every cut must serve the emotional arc. Editing is not merely joining clips; it is deciding what the audience feels, questions, and discovers in each fraction of a second."
    },
    {
      term: "Color Science",
      subtitle: "Atmosphere & Temperature",
      text: "Color speaks directly to the subconscious. Through deliberate LUT mapping, skin tone isolation, and shadow separation, cold shadows meet warm highlights to craft unmistakable cinematic depth."
    },
    {
      term: "Rhythm & Cadence",
      subtitle: "Musicality in Motion",
      text: "Visual pacing mirrors human heartbeats. Speed ramping, jump cuts, and contemplative wide shots breathe in harmony with acoustic tempos to command unbroken audience focus."
    },
    {
      term: "Acoustic Foley",
      subtitle: "Sonic Immersion",
      text: "Audio is over half of the cinematic impact. Layered environmental ambiences, crisp dialogue presence, and thunderous sub-bass drops transform ordinary video into a living, breathing reality."
    },
    {
      term: "Visual Light",
      subtitle: "Sculpting Dimension",
      text: "From anamorphic horizontal flares to deep chiaroscuro silhouettes, light defines spatial depth and separates commercial work from true cinematic art."
    }
  ]
};
