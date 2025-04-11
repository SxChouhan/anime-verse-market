
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Filter, ChevronDown, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { getProductsByCategory, getAnimeCategories } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [selectedAnime, setSelectedAnime] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  
  const animeCategories = getAnimeCategories();
  
  let products = getProductsByCategory(category || '');
  
  // Apply filters
  if (searchQuery) {
    products = products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.anime.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  if (selectedAnime.length > 0) {
    products = products.filter(product => selectedAnime.includes(product.anime));
  }
  
  products = products.filter(product => 
    product.price >= priceRange[0] && product.price <= priceRange[1]
  );
  
  // Apply sorting
  switch (sortOption) {
    case 'price-asc':
      products = [...products].sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      products = [...products].sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      // In a real app, would sort by date
      products = [...products];
      break;
    case 'popular':
    default:
      products = [...products].sort((a, b) => b.stars - a.stars);
      break;
  }

  const toggleAnimeFilter = (anime: string) => {
    if (selectedAnime.includes(anime)) {
      setSelectedAnime(selectedAnime.filter(item => item !== anime));
    } else {
      setSelectedAnime([...selectedAnime, anime]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold capitalize">{category}</h1>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our collection of premium {category} from your favorite anime series.
            </p>
          </div>
          
          {/* Search and Sort */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search products" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            
            <div className="md:w-48">
              <Select
                value={sortOption}
                onValueChange={setSortOption}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort by: Popular" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Popular</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              variant="outline" 
              className="md:hidden flex items-center"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} className="mr-2" />
              Filters
              <ChevronDown size={18} className="ml-2" />
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters */}
            <div className={`md:w-64 ${showFilters ? 'block' : 'hidden'} md:block`}>
              <div className="bg-white dark:bg-otaku-dark rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Filters</h3>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 200]}
                      min={0}
                      max={200}
                      step={5}
                      value={priceRange}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                
                {/* Anime Filter */}
                <div>
                  <h4 className="font-medium mb-3">Anime</h4>
                  <div className="space-y-2 max-h-72 overflow-y-auto">
                    {animeCategories.map(anime => (
                      <div key={anime} className="flex items-center">
                        <Checkbox 
                          id={`anime-${anime}`}
                          checked={selectedAnime.includes(anime)}
                          onCheckedChange={() => toggleAnimeFilter(anime)}
                        />
                        <label 
                          htmlFor={`anime-${anime}`}
                          className="ml-2 text-sm cursor-pointer"
                        >
                          {anime}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Reset Filters */}
                <Button 
                  variant="outline" 
                  className="w-full mt-6"
                  onClick={() => {
                    setSelectedAnime([]);
                    setPriceRange([0, 200]);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
            
            {/* Products */}
            <div className="flex-grow">
              {products.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-lg font-medium mb-4">No products found</p>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                  <Button 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedAnime([]);
                      setPriceRange([0, 200]);
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
