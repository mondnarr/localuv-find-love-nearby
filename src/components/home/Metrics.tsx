
import { Users, ShoppingBag, Star, TrendingUp } from 'lucide-react';

const Metrics = () => {
  const metrics = [
    { label: 'Active Users', value: '50k+', icon: Users },
    { label: 'Local Businesses', value: '1000+', icon: ShoppingBag },
    { label: 'Customer Reviews', value: '25k+', icon: Star },
    { label: 'Monthly Sales', value: '$2M+', icon: TrendingUp }
  ];

  return (
    <section className="bg-gradient-to-r from-localuv-primary to-localuv-secondary py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map(metric => (
            <div key={metric.label} className="text-center">
              <metric.icon className="w-8 h-8 mx-auto mb-3" />
              <div className="text-3xl font-bold mb-1">{metric.value}</div>
              <div className="text-white/80">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Metrics;
