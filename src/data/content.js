// Single source of truth for all portfolio content.

export const profile = {
  name: 'Mhokesh P',
  shortName: 'Mhokesh',
  role: 'Computer Science and AI Student',
  location: 'Salem, Tamil Nadu',
  email: 'mhokesh008@gmail.com',
  phone: '+91 6383539910',
  linkedin: 'https://www.linkedin.com/in/mhokesh',
  github: 'https://github.com/mhokesh',
  githubHandle: 'mhokesh',
  portrait: '/portrait.png',
  // Three-line manifesto used in the hero
  manifesto: [
    'I build practical AI systems',
    'for healthcare, research,',
    'and real-world automation.',
  ],
  intro:
    'Computer Science and AI student at Amrita Vishwa Vidyapeetham with hands-on experience in software development, machine learning, and full-stack applications. I build practical systems with C++, Python, React, Flask, and modern AI tools while continuously learning through projects and real-world experience.',
  // A pull-stat that anchors credibility without bragging
  signal: {
    rank: '7th',
    of: '10,000+',
    event: 'IIT Kharagpur Data Science Hackathon 2024-25',
  },
  stats: [
    { value: '8.15', label: 'CGPA / 10' },
    { value: '3', label: 'featured projects' },
    { value: '100+', label: 'DSA problems solved' },
    { value: '7th', label: 'hackathon rank' },
  ],
}

/* ---- Featured: rich, story-first spreads with animated visuals ---- */
export const projects = [
  {
    id: 'medical-avatar',
    index: '01',
    title: '3D Virtual Medical Assistant',
    subtitle: 'Interactive 3D medical conversational avatar',
    year: '2025',
    accuracy: '95%',
    accuracyLabel: 'voice accuracy with ElevenLabs TTS',
    stack: ['React', 'Three.js', 'Node.js', 'OpenAI'],
    url: 'https://github.com/mhokesh',
    summary:
      'Built an interactive 3D virtual doctor with real-time facial expressions, lip-sync animations, and conversational AI for medical guidance.',
    points: [
      'Integrated GPT-4o-mini for intelligent medical conversations and ElevenLabs TTS for natural speech output.',
      'Used Blender, Ready Player Me, and Mixamo to animate custom 3D avatars with lip-synced speech.',
      'Built the full-stack experience with React.js, Node.js, and Express.js for interactive avatar communication.',
    ],
    tone: 'health',
    major: true,
  },
  {
    id: 'paper-eval',
    index: '02',
    title: 'AI Research Paper Evaluation System',
    subtitle: 'LLM-based automated publishability assessment',
    year: '2025',
    accuracy: '90%',
    accuracyLabel: 'evaluation accuracy with traceable reasoning',
    stack: ['Python', 'LangChain', 'Flask', 'RAG'],
    url: 'https://github.com/mhokesh',
    summary:
      'Designed an LLM-based evaluation framework that assesses research paper publishability with transparent, explainable results.',
    points: [
      'Implemented a RAG pipeline for contextual document understanding and traceable response generation.',
      'Automated the publishability review flow to reduce evaluation time and improve consistency.',
      'Used Python, Flask, LangChain, and test-driven validation to keep outputs reliable.',
    ],
    tone: 'paper',
    major: true,
  },
  {
    id: 'attendance',
    index: '03',
    title: 'Smart Attendance System',
    subtitle: 'Facial recognition-based attendance automation',
    year: '2025',
    accuracy: '95%',
    accuracyLabel: 'recognition accuracy with real-time processing',
    stack: ['Python', 'Flask', 'OpenCV', 'Computer Vision'],
    url: 'https://github.com/mhokesh',
    summary:
      'Built a face-recognition attendance system that processes live video in real time and removes manual attendance tracking.',
    points: [
      'Used a multi-threaded video-capture pipeline to sustain real-time 30 FPS processing.',
      'Combined face detection and recognition for automated attendance marking.',
      'Reduced administrative overhead and made classroom tracking more reliable.',
    ],
    tone: 'signal',
  },
]

/* ---- Archive: the full breadth, filterable ---- */
export const archiveCategories = [
  'All',
  'AI / ML',
  'Web & Backend',
  'Data Science',
  'Tools & Systems',
]

export const archive = [
  {
    name: '3D Virtual Medical Assistant',
    cat: 'AI / ML',
    lang: 'React',
    desc: 'Interactive 3D medical avatar with NLP, lip-sync speech, and a full-stack React plus Node.js interface.',
    url: 'https://github.com/mhokesh',
    tags: ['Three.js', 'OpenAI'],
  },
  {
    name: 'AI Research Paper Evaluation System',
    cat: 'AI / ML',
    lang: 'Python',
    desc: 'LLM and RAG pipeline for publishability scoring, conference matching, and explainable evaluation output.',
    url: 'https://github.com/mhokesh',
    tags: ['LangChain', 'RAG'],
  },
  {
    name: 'Smart Attendance System',
    cat: 'Tools & Systems',
    lang: 'Python',
    desc: 'Facial-recognition attendance automation built for real-time classroom or lab use.',
    url: 'https://github.com/mhokesh',
    tags: ['OpenCV', 'Flask'],
  },
  {
    name: 'Netkathir AI Avatar Internship',
    cat: 'Web & Backend',
    lang: 'Node.js',
    desc: 'Internship work centered on a web-based 3D medical conversational avatar and supporting backend services.',
    url: 'https://github.com/mhokesh',
    tags: ['React', 'Express'],
  },
  {
    name: 'DSA Practice Repository',
    cat: 'Tools & Systems',
    lang: 'C++',
    desc: '100+ problem-solving practice across data structures and algorithms.',
    url: 'https://github.com/mhokesh',
    tags: ['C++', 'Algorithms'],
  },
  {
    name: 'LeetCode and TUF Practice',
    cat: 'Tools & Systems',
    lang: 'Java',
    desc: 'Consistent DSA practice across online coding platforms to sharpen problem-solving speed.',
    url: 'https://github.com/mhokesh',
    tags: ['Java', 'DSA'],
  },

  {
    name: 'Research Workflow Notes',
    cat: 'Data Science',
    lang: 'Python',
    desc: 'RAG-oriented notes and experiments supporting traceable LLM evaluation workflows.',
    url: 'https://github.com/mhokesh',
    tags: ['RAG', 'LLM'],
  },
]

export const journey = [
  {
    period: 'Apr 2025 — May 2025',
    title: 'AI Developer Intern',
    place: 'Netkathir Technologies Pvt. Ltd., Puducherry, India',
    detail: 'Built a 3D medical conversational avatar with React, Node.js, NLP, TTS, and lip-sync animation',
    now: false,
  },
  {
    period: '2023 — 2027',
    title: 'B.Tech, Computer Science and Engineering (AI)',
    place: 'Amrita Vishwa Vidyapeetham',
    detail: 'CGPA 8.15 / 10.0',
    now: true,
  },
  {
    period: '2023',
    title: 'Higher Secondary (HSC)',
    place: 'SRV International Senior Secondary School, Rasipuram',
    detail: '80%',
  },
  {
    period: '2021',
    title: 'Secondary School (SSC)',
    place: 'SVB Modern School, Rasipuram',
    detail: '87%',
  },
]

export const achievements = [
  {
    headline: '7th among 10,000+ teams',
    body: 'IIT Kharagpur Data Science Hackathon 2024-25 with algorithmic optimisation and efficient data pipeline design.',
  },
  {
    headline: '100+ DSA problems solved',
    body: 'Consistent practice on coding platforms including LeetCode and TUF strengthened problem-solving speed and implementation quality.',
  },
  {
    headline: 'Led technical teams',
    body: 'Coordinated design, development, testing, and delivery across multiple AI projects and deployments.',
  },
]

// Skills grouped by the *role they play* in a system, not by category label.
export const skillClusters = [
  {
    role: 'Make software work',
    blurb: 'Programming foundations',
    items: ['C++', 'Python', 'C', 'JavaScript', 'Java', 'SQL', 'HTML/CSS'],
  },
  {
    role: 'Make interfaces and APIs',
    blurb: 'Full-stack delivery',
    items: ['Flask', 'React.js', 'Node.js', 'REST APIs', 'Git', 'MySQL', 'MongoDB', 'Supabase'],
  },
  {
    role: 'Make models useful',
    blurb: 'AI and machine learning',
    items: ['LLM', 'Scikit-learn', 'TensorFlow', 'PyTorch', 'OpenCV', 'GPT', 'RAG', 'LangChain', 'NumPy', 'Pandas'],
  },
]
