
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from "@/integrations/supabase/client";
import { LogIn, UserPlus, Mail, Lock, User, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      toast({
        title: "Success!",
        description: "You have been logged in.",
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          }
        }
      });

      if (error) throw error;
      
      toast({
        title: "Account created!",
        description: "Please check your email to verify your account.",
      });

      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const switchToSignup = () => {
    const signupTab = document.querySelector('[value="signup"]') as HTMLElement;
    if (signupTab) {
      signupTab.click();
    }
  };
  
  const switchToLogin = () => {
    const loginTab = document.querySelector('[value="login"]') as HTMLElement;
    if (loginTab) {
      loginTab.click();
    }
  };

  return (
    <div className="min-h-screen bg-localuv-background dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Card className="p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold dark:text-white">Welcome to LocaLuv</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Connect with your local community</p>
          </div>
          
          <Tabs defaultValue="login" className="space-y-6">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="login" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Sign Up
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1 dark:text-gray-300">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="email"
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 dark:bg-gray-700 dark:border-gray-600"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1 dark:text-gray-300">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="password"
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 dark:bg-gray-700 dark:border-gray-600"
                      required
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </form>
              
              <div className="mt-4">
                <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                  Don't have an account?{' '}
                  <button 
                    type="button"
                    onClick={switchToSignup}
                    className="text-localuv-primary hover:underline"
                  >
                    Sign up now
                  </button>
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1 dark:text-gray-300">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="name"
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 dark:bg-gray-700 dark:border-gray-600"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="signup-email" className="block text-sm font-medium mb-1 dark:text-gray-300">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="signup-email"
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 dark:bg-gray-700 dark:border-gray-600"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="signup-password" className="block text-sm font-medium mb-1 dark:text-gray-300">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="signup-password"
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 dark:bg-gray-700 dark:border-gray-600"
                      required
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </Button>
              </form>

              <div className="mt-4">
                <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                  Already have an account?{' '}
                  <button 
                    type="button"
                    onClick={switchToLogin}
                    className="text-localuv-primary hover:underline"
                  >
                    Login here
                  </button>
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 pt-6 border-t dark:border-gray-700">
            <p className="text-sm text-center text-gray-600 dark:text-gray-400">
              By continuing, you agree to LocaLuv's{' '}
              <a href="#" className="text-localuv-primary hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-localuv-primary hover:underline">Privacy Policy</a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
