
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalItems, getTotalPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [promoCode, setPromoCode] = useState('');
  
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
    } else {
      // This would typically go to a checkout page with payment processing
      // For now, we'll just navigate to a placeholder
      navigate('/checkout');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
          
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag size={64} className="mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Button
                className="bg-otaku-purple hover:bg-otaku-purple/90"
                onClick={() => navigate('/')}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-otaku-dark rounded-lg shadow overflow-hidden">
                  <div className="hidden sm:grid grid-cols-12 bg-gray-50 dark:bg-gray-800 p-4">
                    <div className="col-span-6">
                      <span className="font-medium">Product</span>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className="font-medium">Price</span>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className="font-medium">Quantity</span>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className="font-medium">Total</span>
                    </div>
                  </div>
                  
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {cart.map(item => (
                      <div key={item.id} className="grid grid-cols-1 sm:grid-cols-12 p-4 items-center gap-4">
                        {/* Product */}
                        <div className="sm:col-span-6 flex items-center">
                          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <Link 
                              to={`/product/${item.id}`}
                              className="font-medium hover:text-otaku-purple transition-colors"
                            >
                              {item.name}
                            </Link>
                            <p className="text-sm text-gray-500 mt-1 capitalize">{item.category}</p>
                          </div>
                        </div>
                        
                        {/* Price */}
                        <div className="sm:col-span-2 text-center">
                          <span className="sm:hidden font-medium">Price: </span>
                          <span>${item.price.toFixed(2)}</span>
                        </div>
                        
                        {/* Quantity */}
                        <div className="sm:col-span-2 flex items-center justify-center">
                          <div className="flex items-center border border-gray-300 rounded">
                            <button
                              className="px-2 py-1 text-gray-600"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                              className="w-12 text-center border-x border-gray-300 py-1"
                              min="1"
                            />
                            <button
                              className="px-2 py-1 text-gray-600"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        
                        {/* Total */}
                        <div className="sm:col-span-2 text-center">
                          <span className="sm:hidden font-medium">Total: </span>
                          <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                          <button
                            className="ml-2 text-red-500 hover:text-red-700"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between">
                  <Link 
                    to="/"
                    className="text-otaku-purple hover:underline flex items-center"
                  >
                    <ArrowRight className="mr-2 rotate-180" size={18} />
                    Continue Shopping
                  </Link>
                  
                  <Button 
                    variant="outline" 
                    className="mt-4 sm:mt-0"
                    onClick={() => removeFromCart('')} // Remove all items
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
              
              {/* Order Summary */}
              <div>
                <div className="bg-white dark:bg-otaku-dark rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal ({getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''})</span>
                      <span>${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${(getTotalPrice() + getTotalPrice() * 0.08).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="mb-4">
                      <label className="block mb-2 text-sm">Have a promo code?</label>
                      <div className="flex">
                        <Input
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Enter code"
                          className="rounded-r-none"
                        />
                        <Button variant="outline" className="rounded-l-none border-l-0">
                          Apply
                        </Button>
                      </div>
                    </div>
                    
                    <Button
                      className="w-full bg-otaku-purple hover:bg-otaku-purple/90"
                      onClick={handleCheckout}
                    >
                      {user ? 'Proceed to Checkout' : 'Login to Checkout'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
