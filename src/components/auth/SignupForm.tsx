import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Lock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";
import AuthInput from './AuthInput';
import { useNavigate } from 'react-router-dom';
import { AuthFormProps } from '@/types/auth';

const SignupForm = ({ onSwitchToLogin }: AuthFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

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

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      <AuthInput
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        icon={User}
        label="Full Name"
      />
      <AuthInput
        id="signup-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={Mail}
        label="Email"
      />
      <AuthInput
        id="signup-password"
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
        {loading ? 'Creating Account...' : 'Sign Up'}
      </Button>

      <div className="mt-4">
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <button 
            type="button"
            onClick={onSwitchToLogin}
            className="text-localuv-primary hover:underline"
          >
            Login here
          </button>
        </p>
      </div>
    </form>
  );
};

export default SignupForm;
