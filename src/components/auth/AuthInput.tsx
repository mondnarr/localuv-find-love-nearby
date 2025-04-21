
import { Input } from '@/components/ui/input';
import { LucideIcon } from 'lucide-react';

interface AuthInputProps {
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: LucideIcon;
  label: string;
  required?: boolean;
}

const AuthInput = ({ id, type, value, onChange, icon: Icon, label, required = true }: AuthInputProps) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1 dark:text-gray-300">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input 
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          className="pl-10 dark:bg-gray-700 dark:border-gray-600"
          required={required}
        />
      </div>
    </div>
  );
};

export default AuthInput;
