
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShoppingBag, Heart, LogOut, Settings } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  
  // Mock addresses and orders - would come from API in real app
  const addresses = [
    {
      id: 'addr1',
      type: 'Home',
      name: user?.name,
      street: '123 Anime Street',
      city: 'Tokyo',
      state: 'CA',
      postalCode: '94103',
      country: 'United States',
      isDefault: true,
    },
  ];
  
  const orders = [
    {
      id: 'ord123',
      date: '2025-03-01',
      status: 'Delivered',
      total: 79.97,
      items: [
        { name: 'Attack on Titan Survey Corps Hoodie', quantity: 1, price: 49.99 },
        { name: 'Death Note Replica', quantity: 1, price: 29.98 },
      ],
    },
    {
      id: 'ord456',
      date: '2025-02-15',
      status: 'Processing',
      total: 89.99,
      items: [
        { name: 'Naruto Sage Mode Figure', quantity: 1, price: 89.99 },
      ],
    },
  ];
  
  const wishlists = [
    {
      id: 'wl1',
      name: 'Merchandise',
      items: 4,
      dateCreated: '2025-01-10',
    },
    {
      id: 'wl2',
      name: 'Figures',
      items: 2,
      dateCreated: '2025-02-05',
    },
  ];
  
  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged out successfully',
      description: 'You have been logged out of your account',
    });
    navigate('/');
  };
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Would call API to update profile in real app
    toast({
      title: 'Profile updated',
      description: 'Your profile information has been updated',
    });
  };
  
  // Redirect to login if not authenticated
  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Profile Sidebar */}
            <div>
              <div className="bg-white dark:bg-otaku-dark rounded-lg shadow p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="" alt={user.name} />
                    <AvatarFallback className="text-2xl bg-otaku-purple text-white">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                <h2 className="text-xl font-bold mb-1">{user.name}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{user.email}</p>
                
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleLogout}
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </Button>
              </div>
              
              <div className="bg-white dark:bg-otaku-dark rounded-lg shadow mt-6">
                <TabsList className="w-full flex flex-col items-stretch p-0 bg-transparent">
                  <TabsTrigger 
                    value="profile" 
                    className="flex items-center justify-start px-6 py-3 rounded-none data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-800"
                  >
                    <User size={18} className="mr-2" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger 
                    value="orders" 
                    className="flex items-center justify-start px-6 py-3 rounded-none data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-800"
                  >
                    <ShoppingBag size={18} className="mr-2" />
                    Orders
                  </TabsTrigger>
                  <TabsTrigger 
                    value="wishlist" 
                    className="flex items-center justify-start px-6 py-3 rounded-none data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-800"
                  >
                    <Heart size={18} className="mr-2" />
                    Wishlist
                  </TabsTrigger>
                  <TabsTrigger 
                    value="settings" 
                    className="flex items-center justify-start px-6 py-3 rounded-none data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-800"
                  >
                    <Settings size={18} className="mr-2" />
                    Settings
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="profile">
                {/* Profile */}
                <TabsContent value="profile">
                  <div className="bg-white dark:bg-otaku-dark rounded-lg shadow p-6">
                    <h3 className="text-xl font-bold mb-6">Personal Information</h3>
                    
                    <form onSubmit={handleSaveProfile}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="(123) 456-7890"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="birthday">Birthday</Label>
                          <Input
                            id="birthday"
                            type="date"
                            className="mt-1"
                          />
                        </div>
                      </div>
                      
                      <Button 
                        type="submit"
                        className="bg-otaku-purple hover:bg-otaku-purple/90"
                      >
                        Save Changes
                      </Button>
                    </form>
                  </div>
                  
                  <div className="bg-white dark:bg-otaku-dark rounded-lg shadow p-6 mt-8">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">Shipping Addresses</h3>
                      <Button variant="outline">Add New Address</Button>
                    </div>
                    
                    <div className="space-y-6">
                      {addresses.map(address => (
                        <div 
                          key={address.id} 
                          className={`border ${address.isDefault ? 'border-otaku-purple' : 'border-gray-200'} p-4 rounded-lg relative`}
                        >
                          {address.isDefault && (
                            <span className="absolute top-2 right-2 bg-otaku-purple text-white text-xs px-2 py-1 rounded">
                              Default
                            </span>
                          )}
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{address.name}</p>
                              <p className="text-gray-600 dark:text-gray-400 mt-1">{address.street}</p>
                              <p className="text-gray-600 dark:text-gray-400">
                                {address.city}, {address.state} {address.postalCode}
                              </p>
                              <p className="text-gray-600 dark:text-gray-400">{address.country}</p>
                            </div>
                            <div className="space-x-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white">
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                {/* Orders */}
                <TabsContent value="orders">
                  <div className="bg-white dark:bg-otaku-dark rounded-lg shadow p-6">
                    <h3 className="text-xl font-bold mb-6">Your Orders</h3>
                    
                    {orders.length === 0 ? (
                      <div className="text-center py-10">
                        <ShoppingBag size={48} className="mx-auto mb-4 text-gray-400" />
                        <p className="text-lg font-medium mb-2">No orders yet</p>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          You haven't placed any orders yet.
                        </p>
                        <Button onClick={() => navigate('/')}>Start Shopping</Button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {orders.map(order => (
                          <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 flex flex-col md:flex-row md:justify-between md:items-center">
                              <div>
                                <p className="font-medium">Order #{order.id}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Placed on {order.date}
                                </p>
                              </div>
                              <div className="mt-2 md:mt-0 flex items-center">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  order.status === 'Delivered' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {order.status}
                                </span>
                                <Button variant="link" className="ml-2">
                                  View Details
                                </Button>
                              </div>
                            </div>
                            <div className="p-4">
                              {order.items.map((item, index) => (
                                <div 
                                  key={index} 
                                  className={`flex justify-between items-center ${
                                    index !== order.items.length - 1 ? 'mb-3 pb-3 border-b border-gray-200' : ''
                                  }`}
                                >
                                  <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                      Qty: {item.quantity}
                                    </p>
                                  </div>
                                  <p>${item.price.toFixed(2)}</p>
                                </div>
                              ))}
                              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
                                <span className="font-medium">Total</span>
                                <span className="font-medium">${order.total.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                {/* Wishlist */}
                <TabsContent value="wishlist">
                  <div className="bg-white dark:bg-otaku-dark rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">Your Wishlists</h3>
                      <Button variant="outline">Create New List</Button>
                    </div>
                    
                    {wishlists.length === 0 ? (
                      <div className="text-center py-10">
                        <Heart size={48} className="mx-auto mb-4 text-gray-400" />
                        <p className="text-lg font-medium mb-2">No wishlists yet</p>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Save items to your wishlist for later.
                        </p>
                        <Button onClick={() => navigate('/')}>Start Shopping</Button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {wishlists.map(list => (
                          <div 
                            key={list.id} 
                            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-otaku-purple transition-colors cursor-pointer"
                          >
                            <h4 className="font-medium">{list.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {list.items} items • Created {list.dateCreated}
                            </p>
                            <Button variant="link" className="mt-2 p-0">
                              View List
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                {/* Settings */}
                <TabsContent value="settings">
                  <div className="bg-white dark:bg-otaku-dark rounded-lg shadow p-6">
                    <h3 className="text-xl font-bold mb-6">Account Settings</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-4">Password</h4>
                        <Button variant="outline">Change Password</Button>
                      </div>
                      
                      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="font-medium mb-4">Communication Preferences</h4>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <input
                              id="email-promo"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-otaku-purple focus:ring-otaku-purple"
                              defaultChecked
                            />
                            <label htmlFor="email-promo" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                              Promotional emails
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="email-order"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-otaku-purple focus:ring-otaku-purple"
                              defaultChecked
                            />
                            <label htmlFor="email-order" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                              Order updates
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="email-newsletter"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-otaku-purple focus:ring-otaku-purple"
                              defaultChecked
                            />
                            <label htmlFor="email-newsletter" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                              Newsletter
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="font-medium mb-4">Danger Zone</h4>
                        <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white">
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
