
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
    <section className="container mx-auto px-4 py-16 text-center">
      <h2 className="font-serif text-3xl mb-4 dark:text-white">Ready to Join Our Community?</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
        Whether you're a local business owner or a customer looking to support local, 
        we're here to help you connect and thrive together.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button size="lg" className="bg-localuv-primary">
          Create Account
        </Button>
        <Button size="lg" variant="outline">
          Learn More
        </Button>
      </div>
    </section>
  );
};

export default CallToAction;
