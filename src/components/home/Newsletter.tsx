
import { Button } from '@/components/ui/button';

const Newsletter = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-serif text-3xl mb-4 dark:text-white">Stay Updated with Local Happenings</h2>
        <p className="text-muted-foreground mb-8">
          Subscribe to our newsletter for the latest updates, exclusive offers, and community news.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          <Button>Subscribe Now</Button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
