
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogIn, UserPlus } from 'lucide-react';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import AuthTerms from '@/components/auth/AuthTerms';
import { useAuthTabs } from '@/hooks/use-auth-tabs';

const Auth = () => {
  const { switchToSignup, switchToLogin } = useAuthTabs();

  return (
    <div className="min-h-screen bg-localuv-background dark:bg-gray-900 py-6 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto">
        <Card className="p-4 sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold dark:text-white">Welcome to LocaLuv</h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">Connect with your local community</p>
          </div>
          
          <Tabs defaultValue="login" className="space-y-4 sm:space-y-6">
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
              <LoginForm onSwitchToSignup={switchToSignup} />
            </TabsContent>
            
            <TabsContent value="signup">
              <SignupForm onSwitchToLogin={switchToLogin} />
            </TabsContent>
          </Tabs>

          <AuthTerms />
        </Card>
      </div>
    </div>
  );
};

export default Auth;
