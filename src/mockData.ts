import { Goal } from './types';

export const MOCK_GOALS: Goal[] = [
  {
    id: '1',
    title: 'Marathon Training',
    category: 'FITNESS',
    progress: 0,
    description: 'Complete week 4 of the 16-week endurance program.',
    dueDate: 'Due Oct 15',
    targetDate: 'October 15, 2024',
    status: 'active',
    milestones: [
      { id: 'm1', title: 'Run a Half Marathon', completed: false, date: 'July 10' },
      { id: 'm2', title: 'Complete 20-mile long run', completed: false, date: 'August 20' },
      { id: 'm3', title: 'Taper week prep', completed: false, description: 'Review nutrition and pacing strategy' }
    ],
    notes: [
      {
        id: 'n1',
        type: 'progress',
        content: '"Felt incredibly strong on the 16-miler today. The negative splits in the final 3 miles were exactly on target. Keep trusting the process."',
        author: 'Cuthmaan',
        date: '2 Days ago'
      }
    ]
  },
  {
    id: '2',
    title: 'AWS Certification',
    category: 'CAREER',
    progress: 0,
    description: 'Finish studying for the Solutions Architect exam.',
    dueDate: 'Due Nov 01',
    targetDate: 'November 01, 2024',
    status: 'active',
    milestones: [],
    notes: []
  },
  {
    id: '3',
    title: 'Emergency Fund',
    category: 'FINANCE',
    progress: 0,
    description: 'Save 6 months of living expenses in high-yield account.',
    dueDate: 'Due Dec 31',
    targetDate: 'December 31, 2024',
    status: 'active',
    milestones: [],
    notes: []
  }
];
