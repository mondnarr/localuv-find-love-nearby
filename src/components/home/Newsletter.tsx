
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Newsletter = () => {
  return (
    <section className="container mx-auto px-4 py-12 sm:py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-serif text-2xl sm:text-3xl mb-3 sm:mb-4 dark:text-white">Stay Updated with Local Happenings</h2>
        <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
          Subscribe to our newsletter for the latest updates, exclusive offers, and community news.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-auto min-w-0 sm:min-w-[300px] dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          <Button className="w-full sm:w-auto">Subscribe Now</Button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
