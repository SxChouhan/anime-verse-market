
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getProductById } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const product = getProductById(id || '');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold mb-4">Product Not Found</h1>
        <Button onClick={() => navigate('/')}>Return to Home</Button>
      </div>
    );
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
      anime: product.anime,
      category: product.category,
    });
    
    toast({
      title: 'Added to cart',
      description: `${quantity} × ${product.name} added to your cart`,
    });
  };

  const handleBuyNow = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
      anime: product.anime,
      category: product.category,
    });
    
    navigate('/cart');
  };

  // Generate similar products (mock for now)
  const similarProducts = Array.from({ length: 4 }, (_, index) => {
    const productId = ((parseInt(product.id) + index + 1) % 10 + 1).toString();
    return getProductById(productId);
  }).filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm">
            <ol className="flex items-center space-x-2">
              <li>
                <button onClick={() => navigate('/')} className="text-gray-500 hover:text-otaku-purple">
                  Home
                </button>
              </li>
              <li className="text-gray-500">/</li>
              <li>
                <button 
                  onClick={() => navigate(`/${product.category}`)} 
                  className="text-gray-500 hover:text-otaku-purple capitalize"
                >
                  {product.category}
                </button>
              </li>
              <li className="text-gray-500">/</li>
              <li className="text-gray-900 dark:text-white font-medium truncate">
                {product.name}
              </li>
            </ol>
          </nav>
          
          {/* Product Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden mb-4 aspect-square">
                <img 
                  src={product.images[activeImage]} 
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      className={`border-2 rounded-md overflow-hidden aspect-square ${
                        activeImage === index ? 'border-otaku-purple' : 'border-gray-200'
                      }`}
                      onClick={() => setActiveImage(index)}
                    >
                      <img 
                        src={image} 
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Details */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.floor(product.stars) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  {product.stars.toFixed(1)} ({product.reviews.length} reviews)
                </span>
              </div>
              
              <div className="mb-6">
                <p className="text-3xl font-bold text-otaku-purple">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-green-600 mt-1">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
              </div>
              
              <div className="mb-6">
                <p className="font-medium mb-2">Anime: {product.anime}</p>
                <p className="font-medium mb-2">Category: <span className="capitalize">{product.category}</span></p>
              </div>
              
              <div className="mb-6">
                <label className="block font-medium mb-2">Quantity</label>
                <div className="flex items-center">
                  <button
                    className="border border-gray-300 rounded-l-md px-3 py-2"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    className="border-y border-gray-300 text-center w-16 py-2"
                    min="1"
                  />
                  <button
                    className="border border-gray-300 rounded-r-md px-3 py-2"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-white border border-otaku-purple text-otaku-purple hover:bg-otaku-purple hover:text-white"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button 
                  onClick={handleBuyNow}
                  className="flex-1 bg-otaku-purple hover:bg-otaku-purple/90 text-white"
                >
                  Buy Now
                </Button>
                <Button variant="outline" size="icon" className="border-gray-300">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="border-gray-300">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Product Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="description">
              <TabsList className="border-b border-gray-200 w-full justify-start">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({product.reviews.length})</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="py-6">
                <h3 className="text-lg font-semibold mb-4">Product Description</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {product.description}
                </p>
                <ul className="mt-4 list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Premium quality material</li>
                  <li>Official licensed merchandise</li>
                  <li>Perfect for anime enthusiasts</li>
                  <li>Makes a great gift</li>
                </ul>
              </TabsContent>
              
              <TabsContent value="reviews" className="py-6">
                <h3 className="text-lg font-semibold mb-6">Customer Reviews</h3>
                
                {product.reviews.length === 0 ? (
                  <p>No reviews yet. Be the first to review this product!</p>
                ) : (
                  <div className="space-y-6">
                    {product.reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6">
                        <div className="flex items-center mb-2">
                          <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
                            {review.userName.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <p className="font-medium">{review.userName}</p>
                            <div className="flex items-center">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={16}
                                    className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                                  />
                                ))}
                              </div>
                              <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 dark:text-gray-300 mt-2">{review.comment}</p>
                        
                        {review.image && (
                          <div className="mt-3 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg inline-block">
                            <img 
                              src={review.image} 
                              alt="Review" 
                              className="w-32 h-32 object-cover rounded"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="shipping" className="py-6">
                <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Shipping Times</h4>
                    <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Standard Shipping: 5-7 business days</li>
                      <li>Express Shipping: 2-3 business days</li>
                      <li>International Shipping: 10-14 business days</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Return Policy</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      We accept returns within 30 days of delivery. Items must be unused and in original packaging.
                      Please refer to our full <a href="/return-policy" className="text-otaku-purple hover:underline">Return Policy</a> for more details.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Similar Products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {similarProducts.map((item) => item && (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
