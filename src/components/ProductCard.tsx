
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

type ProductCardProps = {
  product: Product;
  className?: string;
};

const ProductCard = ({ product, className = '' }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      anime: product.anime,
      category: product.category,
    });
  };

  return (
    <Link 
      to={`/product/${product.id}`} 
      className={`group block bg-white dark:bg-otaku-dark rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ${className}`}
    >
      <div className="aspect-[4/5] overflow-hidden relative">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.trending && (
          <div className="absolute top-3 left-3 bg-otaku-purple text-white text-xs py-1 px-2 rounded-full">
            Trending
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium line-clamp-2 group-hover:text-otaku-purple transition-colors">
            {product.name}
          </h3>
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
        </div>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          {product.anime}
        </p>
        
        <div className="flex justify-between items-end">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                className={i < Math.round(product.stars) 
                  ? "text-yellow-400 fill-yellow-400" 
                  : "text-gray-300"
                } 
              />
            ))}
            <span className="text-sm ml-1 text-gray-600 dark:text-gray-400">
              ({product.stars.toFixed(1)})
            </span>
          </div>
          
          <Button 
            size="sm" 
            variant="outline" 
            className="mt-2 text-otaku-purple border-otaku-purple hover:bg-otaku-purple hover:text-white"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
