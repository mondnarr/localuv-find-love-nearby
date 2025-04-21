
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
    <section className="container mx-auto px-4 py-12 sm:py-16 text-center">
      <h2 className="font-serif text-2xl sm:text-3xl mb-3 sm:mb-4 dark:text-white">Ready to Join Our Community?</h2>
      <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8">
        Whether you're a local business owner or a customer looking to support local, 
        we're here to help you connect and thrive together.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
        <Button size="lg" className="w-full sm:w-auto bg-localuv-primary">
          Create Account
        </Button>
        <Button size="lg" variant="outline" className="w-full sm:w-auto">
          Learn More
        </Button>
      </div>
    </section>
  );
};

export default CallToAction;
