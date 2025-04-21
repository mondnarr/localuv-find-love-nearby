
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Shield, Coffee } from 'lucide-react';

const Benefits = () => {
  return (
    <section className="py-16 bg-muted/50 dark:bg-gray-800/50">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl text-center mb-4 dark:text-white animate-[fade-in_1s_ease-out]">
          Why Choose LocaLuv?
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Join thousands of satisfied users who trust LocaLuv for their local shopping needs
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Heart,
              title: "Support Local",
              description: "Help your community thrive by supporting local businesses and entrepreneurs."
            },
            {
              icon: Shield,
              title: "Trusted Platform",
              description: "Verified reviews and secure transactions for peace of mind."
            },
            {
              icon: Coffee,
              title: "Unique Experiences",
              description: "Discover hidden gems and extraordinary local experiences."
            }
          ].map((benefit, index) => (
            <Card 
              key={index} 
              className="bg-background/50 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-800/50 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{
                animationDelay: `${index * 200}ms`,
                animation: 'fade-in 1s ease-out forwards',
              }}
            >
              <CardContent className="p-6 text-center">
                <div className="rounded-full bg-localuv-primary/10 p-3 w-12 h-12 mx-auto mb-4 transform transition-transform group-hover:scale-110">
                  <benefit.icon className="w-6 h-6 text-localuv-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
