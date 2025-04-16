
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { getTrendingProducts } from '@/data/products';

const TrendingSection = () => {
  const trendingProducts = getTrendingProducts().slice(0, 8);

  return (
    <section id="trending-section" className="py-16 bg-gradient-to-b from-gray-100 to-white dark:from-otaku-dark/40 dark:to-otaku-dark/20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Trending Products
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {trendingProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="border-otaku-purple text-otaku-purple hover:bg-otaku-purple hover:text-white"
            asChild
          >
            <Link to="/merchandise">Browse All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
