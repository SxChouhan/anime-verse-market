export type Product = {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  anime: string;
  category: string;
  trending?: boolean;
  inStock: boolean;
  stars: number;
  reviews: Review[];
};

export type Review = {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  image?: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Attack on Titan Survey Corps Hoodie",
    price: 49.99,
    images: ["/placeholder.svg"],
    description: "Show your dedication to humanity with this official Survey Corps hoodie. Features the Wings of Freedom emblem.",
    anime: "Attack on Titan",
    category: "merchandise",
    trending: true,
    inStock: true,
    stars: 4.8,
    reviews: [
      {
        id: "r1",
        userId: "u1",
        userName: "Eren J.",
        rating: 5,
        comment: "Perfect for my morning runs and titan killing sessions!",
        date: "2025-03-15",
        image: "/placeholder.svg"
      }
    ]
  },
  {
    id: "2",
    name: "Sukuna Finger Necklace",
    price: 29.99,
    images: ["/placeholder.svg"],
    description: "Replica of Sukuna's finger in pendant form. Not cursed... probably.",
    anime: "Jujutsu Kaisen",
    category: "merchandise",
    trending: true,
    inStock: true,
    stars: 4.7,
    reviews: []
  },
  {
    id: "3",
    name: "Tanjiro's Earrings",
    price: 19.99,
    images: ["/placeholder.svg"],
    description: "Hanafuda-inspired earrings like the ones worn by Tanjiro Kamado.",
    anime: "Demon Slayer",
    category: "merchandise",
    trending: true,
    inStock: true,
    stars: 4.9,
    reviews: []
  },
  {
    id: "4",
    name: "Naruto Sage Mode Figure",
    price: 89.99,
    images: ["/placeholder.svg"],
    description: "High-quality figure of Naruto in Sage Mode, with detailed texturing and painting.",
    anime: "Naruto Series",
    category: "figures",
    inStock: true,
    stars: 4.9,
    reviews: []
  },
  {
    id: "5",
    name: "Chainsaw Man Poster",
    price: 14.99,
    images: ["/placeholder.svg"],
    description: "Premium quality poster featuring Denji in his Chainsaw Man form.",
    anime: "Chainsaw Man",
    category: "posters",
    inStock: true,
    stars: 4.7,
    reviews: []
  },
  {
    id: "6",
    name: "Erwin Smith Cosplay Uniform",
    price: 129.99,
    images: ["/placeholder.svg"],
    description: "Complete Survey Corps Commander uniform for cosplaying as Erwin Smith.",
    anime: "Attack on Titan",
    category: "costumes",
    inStock: true,
    stars: 4.8,
    reviews: []
  },
  {
    id: "7",
    name: "Death Note Replica",
    price: 24.99,
    images: ["/placeholder.svg"],
    description: "Replica of the Death Note with faux leather cover and ruled pages.",
    anime: "Death Note",
    category: "unique",
    trending: true,
    inStock: true,
    stars: 4.9,
    reviews: []
  },
  {
    id: "8",
    name: "One Piece Straw Hat",
    price: 34.99,
    images: ["/placeholder.svg"],
    description: "Replica of Luffy's iconic straw hat from One Piece.",
    anime: "One Piece",
    category: "unique",
    inStock: true,
    stars: 4.6,
    reviews: []
  },
  {
    id: "9",
    name: "Tokyo Revengers Sticker Pack",
    price: 9.99,
    images: ["/placeholder.svg"],
    description: "Set of 15 high-quality vinyl stickers featuring Tokyo Manji Gang members.",
    anime: "Tokyo Revengers",
    category: "posters",
    inStock: true,
    stars: 4.5,
    reviews: []
  },
  {
    id: "10",
    name: "Fullmetal Alchemist State Alchemist Pocket Watch",
    price: 39.99,
    images: ["/placeholder.svg"],
    description: "Replica of the State Alchemist pocket watch with chain.",
    anime: "Fullmetal Alchemist",
    category: "unique",
    trending: true,
    inStock: true,
    stars: 4.9,
    reviews: []
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getTrendingProducts = (): Product[] => {
  return products.filter(product => product.trending);
};

export const getProductsByAnime = (anime: string): Product[] => {
  return products.filter(product => product.anime === anime);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getAnimeCategories = (): string[] => {
  const animeSet = new Set(products.map(product => product.anime));
  return Array.from(animeSet);
};

export const getProductCategories = (): string[] => {
  return [
    "Figures",
    "Merchandise",
    "Stickers",
    "Posters",
    "Costumes",
    "Unique",
    "Keychains",
    "Phone Cases",
    "Plushies",
    "Accessories",
    "Wall Scrolls",
    "Bags",
    "Clothing"
  ];
};
