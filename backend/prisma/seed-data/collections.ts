import type { SeedCollection } from './types.js';

export const SEED_COLLECTIONS: SeedCollection[] = [
    { name: 'Summer Essentials', slug: 'summer-essentials', description: 'Fresh looks for warm days and easy layering.', type: 'seasonal', isFeatured: true },
    { name: 'Autumn Layers', slug: 'autumn-layers', description: 'Cozy textures and everyday staples for cool evenings.', type: 'seasonal', isFeatured: true },
    { name: 'Weekend Ready', slug: 'weekend-ready', description: 'Easy staples for light travel and city weekends.', type: 'editorial', isFeatured: true },
    { name: 'City Movement', slug: 'city-movement', description: 'Performance silhouettes for moving through the everyday.', type: 'editorial', isFeatured: false },
    { name: 'Elegant Sustainable Fashion', slug: 'elegant-sustainable-fashion', description: 'Refined essentials with a quiet, responsible point of view.', type: 'editorial', isFeatured: true },
    { name: 'Sporty Sustainable Wear', slug: 'sporty-sustainable-wear', description: 'Technical layers and outdoor comfort built for active routines.', type: 'editorial', isFeatured: true },
];
