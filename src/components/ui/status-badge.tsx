
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type StatusVariant = 'success' | 'warning' | 'error' | 'default' | 'info';

export interface StatusBadgeProps {
  status: string;
  variant?: StatusVariant;
  className?: string;
}

const getStatusVariant = (status: string): StatusVariant => {
  status = status.toLowerCase();
  
  if (['active', 'delivered', 'completed', 'success'].includes(status)) {
    return 'success';
  }
  
  if (['processing', 'shipped', 'in progress', 'low-stock'].includes(status)) {
    return 'warning';
  }
  
  if (['error', 'cancelled', 'out-of-stock', 'inactive'].includes(status)) {
    return 'error';
  }
  
  if (['info', 'pending'].includes(status)) {
    return 'info';
  }
  
  return 'default';
};

const getVariantClasses = (variant: StatusVariant): string => {
  switch (variant) {
    case 'success':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'warning':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'error':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    case 'info':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  }
};

export function StatusBadge({ status, variant, className }: StatusBadgeProps) {
  const statusVariant = variant || getStatusVariant(status);
  const variantClasses = getVariantClasses(statusVariant);
  
  return (
    <Badge 
      className={cn(
        "font-medium border-0", 
        variantClasses,
        className
      )}
      variant="outline"
    >
      {status}
    </Badge>
  );
}
