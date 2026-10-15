export type SeedImage = {
    url: string;
    alt: string;
    source: 'unsplash';
    review?: string;
};

export type SeedProductImage = SeedImage;

export type SeedProduct = {
    sku: string;
    title: string;
    description: string;
    brand: string;
    category: 'men' | 'women' | 'kids';
    subCategory: 'shirt' | 'jacket' | 'shoes' | 'cap' | 'bag' | 'watch';
    season: 'summer' | 'fall' | 'winter' | 'spring';
    collection: string;
    price: number;
    oldPrice?: number;
    createdDaysAgo: number;
    colors: string[];
    image: SeedImage | null;
};

export type SeedCollection = {
    name: string;
    slug: string;
    description: string;
    type: 'seasonal' | 'editorial';
    isFeatured: boolean;
};
