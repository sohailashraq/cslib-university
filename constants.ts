import { Book } from './types';

export const INITIAL_BOOKS: Book[] = [
  {
    id: '1',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    category: 'Algorithms',
    description: 'The standard textbook on algorithms, covering a broad range of topics in depth.',
    coverUrl: 'https://m.media-amazon.com/images/I/41T0iBxY8FL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg',
    pdfUrl: '#',
    featured: true,
    downloads: 1240
  },
  {
    id: '2',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    category: 'Web Dev',
    description: 'A Handbook of Agile Software Craftsmanship. Essential for any developer.',
    coverUrl: 'https://m.media-amazon.com/images/I/41xShlnTZTL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg',
    pdfUrl: '#',
    featured: true,
    downloads: 980
  },
  {
    id: '3',
    title: 'Artificial Intelligence: A Modern Approach',
    author: 'Stuart Russell & Peter Norvig',
    category: 'AI',
    description: 'The leading textbook in Artificial Intelligence. Used in over 1400 universities.',
    coverUrl: 'https://m.media-amazon.com/images/I/5191S8vV0yL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg',
    pdfUrl: '#',
    featured: true,
    downloads: 1500
  },
  {
    id: '4',
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    category: 'Systems',
    description: 'The big ideas behind reliable, scalable, and maintainable systems.',
    coverUrl: 'https://m.media-amazon.com/images/I/51ZSpMl1-LL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg',
    pdfUrl: '#',
    featured: false,
    downloads: 850
  },
  {
    id: '5',
    title: 'Operating System Concepts',
    author: 'Abraham Silberschatz',
    category: 'Systems',
    description: 'The dinosaur book. Fundamental concepts of operating systems.',
    coverUrl: 'https://m.media-amazon.com/images/I/51L7aRvbU-L._SX218_BO1,204,203,200_QL40_FMwebp_.jpg',
    pdfUrl: '#',
    featured: false,
    downloads: 600
  },
  {
    id: '6',
    title: 'Deep Learning',
    author: 'Ian Goodfellow',
    category: 'AI',
    description: 'An introduction to a broad range of topics in deep learning.',
    coverUrl: 'https://m.media-amazon.com/images/I/61qFMV-hNsL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg',
    pdfUrl: '#',
    featured: true,
    downloads: 1120
  }
];