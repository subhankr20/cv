export const CV_DATA = {
  candidate: {
    name: "Subhankar Patra",
    phone: "76025-16810",
    email: "patrasubhankar997@gmail.com",
    location: "Siliguri / Sikkim, India",
    languages: ["English", "Hindi", "Bengali"],
    summary: "Sales and Marketing professional with experience in sales and customer handling, currently looking for a Marketing and sales job. Have worked in a target-based environment and handled customer interactions, lead follow-ups, and sales support activities along with strategic and positioned marketing handling. Motivated to learn, grow, and contribute to a highly challenging environment.",
  },
  education: [
    { title: "Bachelors of Business Administration, Marketing & Finance", school: "Sikkim Manipal Institute of Technology", location: "Majitar, Sikkim", years: "2021–2025" },
    { title: "Higher Secondary", school: "Delhi Public School", location: "Siliguri, West Bengal", years: "2019–2021" },
  ],
  experience: [
    {
      role: "Marketing Associate",
      company: "Zeomax R.O. Systems",
      dates: "May 2024 – Dec 2025",
      location: "Siliguri, West Bengal",
      points: [
        "Conducted tailored product presentations to 30 homeowners daily, emphasizing benefits and resulting in increased engagement and interest.",
        "Achieved a 20% increase in sales in 3 months, closing an average of 10 deals per week in the first month through persuasive selling techniques and in-depth product knowledge.",
        "Maintained detailed records of 300+ sales interactions, enhancing strategic decision-making through improved reporting and analysis.",
        "Used traditional and digital adverts to assist the mentioned increase in sales using a waterfall methodology.",
      ],
    },
    {
      role: "AI Content & Copywriter",
      company: "My Digital.io",
      dates: "March 2024 – May 2024",
      location: "Remote",
      points: ["Dedicated and targeted keyword-based writing with high keyword density and click-through rates."],
    },
    {
      role: "Video Creator & Editor",
      company: "Hanwong International",
      dates: "2024 – 2025 (Freelance)",
      location: "Remote",
      points: ["Direction-based and historic data-driven content generation and editing."],
    },
  ],
  achievement: {
    title: "Social Media Content Manager",
    points: [
      "Created and curated engaging, shareable content resulting in a cumulative view count of 2.3 million across two viral videos.",
      "Collaborated with influential meme creators and influencers, expanding the page's reach and network.",
      "Established the meme page as a notable presence in the online meme community, receiving mentions and features on other popular meme pages.",
    ],
  },
  certifications: [
    "Sales Training: Practical Sales Techniques | Udemy",
    "Adobe Premiere Pro: Masterclass | Udemy",
  ],
  skills: [
    "Adobe Photoshop",
    "Adobe Illustrator",
    "Adobe Premiere Pro",
    "Facebook Ads Manager",
    "Instagram Ads",
    "Microsoft Word",
    "Microsoft Excel",
  ],
};

export const LANDMARKS: Record<string, { icon: string; title: string; subtitle: string; body: string; stats: string[] }> = {
  welcome_arch: {
    icon: "🏛️",
    title: "Welcome to Patra World",
    subtitle: "Click anywhere to walk. Discover the résumé.",
    body: "A floating island where every landmark is a chapter of my career. Walk to each one to uncover my story.",
    stats: [],
  },
  library: {
    icon: "📚",
    title: "Education",
    subtitle: "Academic Foundation",
    body: "BBA in Marketing & Finance from Sikkim Manipal Institute of Technology (2021–2025). Higher Secondary from Delhi Public School, Siliguri (2019–2021).",
    stats: ["BBA Marketing & Finance", "SMIT 2021–2025", "DPS 2019–2021"],
  },
  doorstep: {
    icon: "🏘️",
    title: "Zeomax R.O. Systems",
    subtitle: "Marketing Associate · May 2024 – Dec 2025",
    body: "Conducted 30 product presentations daily. Achieved 20% sales increase in 3 months, closing ~10 deals per week. Maintained 300+ logged sales interactions for strategic analysis.",
    stats: ["30/day", "+20%", "10 deals/wk", "300+ logs"],
  },
  pen_garden: {
    icon: "✍️",
    title: "My Digital.io",
    subtitle: "AI Content & Copywriter · Mar–May 2024",
    body: "Dedicated and targeted keyword-based writing with high keyword density and click-through rates. Remote role focused on SEO-optimized content at scale.",
    stats: ["SEO", "Keywords", "CTR"],
  },
  directors_cut: {
    icon: "🎬",
    title: "Hanwong International",
    subtitle: "Video Creator & Editor · 2024–2025",
    body: "Direction-based and historic data-driven content generation and editing. Freelance post-production transforming raw footage into compelling visual narratives.",
    stats: ["Premiere Pro", "Freelance"],
  },
  viral_shrine: {
    icon: "📱",
    title: "2.3 Million Views",
    subtitle: "Social Media Content Manager",
    body: "Created viral content resulting in 2.3M cumulative views across two videos. Collaborated with meme creators and influencers. Established a notable presence in the online meme community.",
    stats: ["2.3M Views", "2 Viral Videos", "Influencer Collabs"],
  },
  phone_booth: {
    icon: "📞",
    title: "Get In Touch",
    subtitle: "The Final Conversion",
    body: "Step inside to connect. Download the CV, send an email, or make a call.",
    stats: [],
  },
};
