export const COLORS = {
  spaceBlue: '#0B1026',
  cosmicPurple: '#6C63FF',
  nebulaPink: '#FF66C4',
  starYellow: '#FFD700',
  spaceBlack: '#121212',
  starWhite: '#F8F9FA',
  cosmicGray: '#343A40',
  deepSpace: '#050914',
  meteor: '#FF5757'
};

export const SUBJECT_COLORS = {
  physics: {
    text: 'text-cosmicPurple',
    bg: 'bg-cosmicPurple/20',
    border: 'border-cosmicPurple',
    fill: 'fill-cosmicPurple'
  },
  chemistry: {
    text: 'text-nebulaPink',
    bg: 'bg-nebulaPink/20',
    border: 'border-nebulaPink',
    fill: 'fill-nebulaPink'
  },
  mathematics: {
    text: 'text-starYellow',
    bg: 'bg-starYellow/20',
    border: 'border-starYellow',
    fill: 'fill-starYellow'
  }
};

export const EVENT_TYPES = {
  lecture: {
    text: 'text-cosmicPurple',
    bg: 'bg-cosmicPurple/20',
    border: 'border-cosmicPurple'
  },
  assignment: {
    text: 'text-nebulaPink',
    bg: 'bg-nebulaPink/20',
    border: 'border-nebulaPink'
  },
  quiz: {
    text: 'text-starYellow',
    bg: 'bg-starYellow/20',
    border: 'border-starYellow'
  }
};

export const PRIORITIES = {
  high: {
    text: 'text-meteor',
    bg: 'bg-meteor/20',
    border: 'border-meteor'
  },
  medium: {
    text: 'text-nebulaPink',
    bg: 'bg-nebulaPink/20',
    border: 'border-nebulaPink'
  },
  low: {
    text: 'text-cosmicPurple',
    bg: 'bg-cosmicPurple/20',
    border: 'border-cosmicPurple'
  }
};

export const DOCUMENT_TYPES = {
  pdf: {
    text: 'text-cosmicPurple',
    bg: 'bg-cosmicPurple/20',
    icon: 'ri-file-pdf-line'
  },
  ppt: {
    text: 'text-nebulaPink',
    bg: 'bg-nebulaPink/20',
    icon: 'ri-slideshow-line'
  },
  doc: {
    text: 'text-starYellow',
    bg: 'bg-starYellow/20',
    icon: 'ri-file-text-line'
  }
};

export const API_ROUTES = {
  login: '/api/auth/login',
  register: '/api/auth/register',
  user: '/api/user',
  courses: '/api/courses',
  lectures: '/api/lectures',
  assignments: '/api/assignments',
  submissions: '/api/submissions',
  documents: '/api/documents',
  students: '/api/students',
  ai: {
    calendar: '/api/ai/calendar',
    mindmap: '/api/ai/mindmap',
    summary: '/api/ai/summary',
    chat: '/api/ai/chat',
    roadmap: '/api/ai/roadmap',
    quiz: '/api/ai/quiz',
    hint: '/api/ai/hint',
    plagiarism: '/api/ai/plagiarism'
  }
};
