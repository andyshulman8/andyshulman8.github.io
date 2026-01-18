export interface SkillCategory {
  title: string;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'User Research',
    items: [
      'Pendo',
      'Accessibility',
      'User Interviews',
      'Usability Testing',
      'Heuristic Evaluation',
    ],
  },
  {
    title: 'Infrastructure',
    items: [
      'Design Systems',
      'Information Architecture',
      'Systems Design',
      'Behavior Design',
      'Material UI',
    ],
  },
  {
    title: 'Interaction',
    items: [
      'Figma',
      'Rapid Prototyping',
      'User Flows',
      'Journey Mapping',
      'AI Design',
    ],
  },
  {
    title: 'Engineering',
    items: [
      'Python, HTML, CSS, C++',
      'Prompt Design',
      'Cursor & Framer',
      'APIs & Automation',
      'Git',
    ],
  },
];
