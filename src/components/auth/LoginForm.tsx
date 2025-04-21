import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LogIn, Mail, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";
import AuthInput from './AuthInput';
import { useNavigate } from 'react-router-dom';
import { AuthFormProps } from '@/types/auth';

const LoginForm = ({ onSwitchToSignup }: AuthFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <AuthInput
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={Mail}
        label="Email"
      />
      <AuthInput
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={Lock}
        label="Password"
      />
      <Button 
        type="submit" 
        className="w-full"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </Button>
      
      <div className="mt-4">
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <button 
            type="button"
            onClick={onSwitchToSignup}
            className="text-localuv-primary hover:underline"
          >
            Sign up now
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
