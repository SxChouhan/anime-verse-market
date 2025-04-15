
import { Link } from 'react-router-dom';
import { getProductCategories } from '@/data/products';

const ProductCategories = () => {
  const productCategories = getProductCategories();

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-100 dark:from-otaku-dark/20 dark:to-otaku-dark/40">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Shop by Product
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {productCategories.map(category => (
            <Link 
              key={category}
              to={`/${category.toLowerCase()}`}
              className="group relative overflow-hidden rounded-lg shadow-md h-64"
            >
              <img 
                src={`/src/resource/Home Page/Product Category/${category}.jpeg`}
                alt={category}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  console.error(`Failed to load image for ${category}`);
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold text-white capitalize mb-2">
                    {category}
                  </h3>
                  <span className="inline-block text-white font-medium underline transform translate-y-0 group-hover:translate-y-0 opacity-100 group-hover:opacity-100 transition-all duration-300">
                    Shop Now
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
