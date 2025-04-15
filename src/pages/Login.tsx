import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import Footer from '@/components/Footer';

const Login = () => {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(loginEmail, loginPassword);
      toast({
        title: 'Successfully logged in',
        description: 'Welcome back to Otaku Collective!',
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Please check your credentials and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signup(signupEmail, signupName, signupPassword);
      toast({
        title: 'Account created successfully',
        description: 'Welcome to Otaku Collective!',
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Signup failed',
        description: 'There was a problem creating your account.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-otaku-dark/30">
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold">Welcome to Otaku Collective</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Your otaku journey continues here
            </p>
          </div>
          
          <div className="bg-white dark:bg-otaku-dark shadow-lg rounded-lg p-6">
            <Tabs defaultValue="login">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input 
                        id="login-email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <div className="relative">
                        <Input 
                          id="login-password"
                          type={showLoginPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                        >
                          {showLoginPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                          <span className="sr-only">
                            {showLoginPassword ? 'Hide password' : 'Show password'}
                          </span>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-otaku-purple focus:ring-otaku-purple"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 dark:text-gray-400">
                          Remember me
                        </label>
                      </div>
                      
                      <div className="text-sm">
                        <Link to="/forgot-password" className="text-otaku-purple hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-otaku-purple hover:bg-otaku-purple/90"
                      disabled={isLoading}
                      onClick={handleLogin}
                    >
                      {isLoading ? 'Logging in...' : 'Login'}
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignup}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <Input 
                        id="signup-name"
                        placeholder="John Doe"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input 
                        id="signup-email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Input 
                          id="signup-password"
                          type={showSignupPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowSignupPassword(!showSignupPassword)}
                        >
                          {showSignupPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                          <span className="sr-only">
                            {showSignupPassword ? 'Hide password' : 'Show password'}
                          </span>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-otaku-purple focus:ring-otaku-purple"
                        required
                      />
                      <label htmlFor="terms" className="ml-2 block text-sm text-gray-600 dark:text-gray-400">
                        I agree to the <Link to="/terms" className="text-otaku-purple hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-otaku-purple hover:underline">Privacy Policy</Link>
                      </label>
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-otaku-purple hover:bg-otaku-purple/90"
                      disabled={isLoading}
                      onClick={handleSignup}
                    >
                      {isLoading ? 'Creating account...' : 'Sign Up'}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-otaku-dark text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="outline" type="button">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
                      fill="currentColor"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" type="button">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      d="M9.329 24c-3.86 0-6.675-2.815-6.675-6.677 0-3.862 2.815-6.677 6.675-6.677h6.676v6.677c0 3.862-2.814 6.677-6.676 6.677zm0-10.466c-2.092 0-3.789 1.698-3.789 3.789 0 2.091 1.697 3.789 3.789 3.789 2.09 0 3.788-1.698 3.788-3.789 0-2.091-1.698-3.789-3.788-3.789z"
                      fill="currentColor"
                    />
                  </svg>
                  Discord
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
