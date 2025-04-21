
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';

const Newsletter = () => {
  return (
    <section className="container mx-auto px-4 py-12 sm:py-16">
      <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-localuv-primary/10 to-localuv-secondary/10 rounded-2xl p-8 sm:p-12 dark:from-gray-800 dark:to-gray-700">
        <Mail className="w-12 h-12 mx-auto mb-6 text-localuv-primary animate-[bounce_2s_ease-in-out_infinite]" />
        <h2 className="font-serif text-2xl sm:text-3xl mb-3 sm:mb-4 dark:text-white">Stay Updated with Local Happenings</h2>
        <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
          Subscribe to our newsletter for the latest updates, exclusive offers, and community news.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-auto min-w-0 sm:min-w-[300px] dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-localuv-primary/50"
          />
          <Button className="w-full sm:w-auto bg-localuv-primary hover:bg-localuv-primary/90 transition-all duration-300 hover:shadow-lg">
            Subscribe Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
