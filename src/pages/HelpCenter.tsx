
import { useState } from 'react';
import { Search, HelpCircle, MessageSquare, FileText, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

// Sample FAQ data
const faqs = [
  {
    category: "Account & Profile",
    questions: [
      {
        question: "How do I create an account?",
        answer: "You can create an account by clicking the 'Sign In' button at the top right of the website and then selecting 'Create Account'. Fill out the required information and you'll be all set!"
      },
      {
        question: "How do I update my profile information?",
        answer: "Log in to your account, go to your Dashboard, and click on the 'Settings' tab. From there, you can update your personal information, address, and notification preferences."
      },
      {
        question: "I forgot my password. How can I reset it?",
        answer: "On the login page, click on 'Forgot Password'. Enter the email address associated with your account, and we'll send you instructions on how to reset your password."
      },
      {
        question: "How do I delete my account?",
        answer: "To delete your account, go to your account settings and scroll to the bottom. Click on 'Delete Account' and follow the prompts. Please note that this action cannot be undone."
      }
    ]
  },
  {
    category: "Shopping & Orders",
    questions: [
      {
        question: "How do I place an order?",
        answer: "Browse our marketplace, add items to your cart, and proceed to checkout when you're ready. Review your order details, shipping information, and payment method before confirming your purchase."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept credit/debit cards, PayPal, and various digital wallet options. All payments are processed securely through our payment providers."
      },
      {
        question: "How can I track my order?",
        answer: "Once your order has shipped, you'll receive a tracking number via email. You can also view the status of your orders in the 'Orders' section of your Dashboard."
      },
      {
        question: "What is your return policy?",
        answer: "Our return policy varies by vendor. Generally, most products can be returned within 30 days of receipt if they're in original condition. Please check the specific product page for details."
      }
    ]
  },
  {
    category: "Vendors & Businesses",
    questions: [
      {
        question: "How do I become a vendor?",
        answer: "To become a vendor, click on 'Become a Seller' in the footer of our website. Complete the application form with details about your business, and our team will review your submission."
      },
      {
        question: "How do I upload products as a vendor?",
        answer: "Once approved as a vendor, log in to your Vendor Dashboard and navigate to 'Products'. Click on 'Add New Product' and follow the instructions to upload product information, images, and pricing."
      },
      {
        question: "How are payments processed for vendors?",
        answer: "We process payments to vendors every two weeks for all completed and delivered orders. Payments are transferred to your connected bank account or payment method specified in your vendor settings."
      }
    ]
  }
];

const popularArticles = [
  {
    title: "Getting Started Guide",
    description: "Everything you need to know to get started with our platform.",
    url: "#",
    icon: FileText
  },
  {
    title: "Understanding Our Fees",
    description: "A complete breakdown of our fee structure for buyers and sellers.",
    url: "#",
    icon: FileText
  },
  {
    title: "Shipping & Delivery FAQ",
    description: "Common questions about shipping times, carriers, and tracking.",
    url: "#",
    icon: FileText
  },
  {
    title: "How to Leave Reviews",
    description: "Learn how to leave helpful reviews for products and vendors.",
    url: "#",
    icon: FileText
  }
];

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Account & Profile');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSearch = () => {
    // In a real app, this would search the knowledge base
    toast({
      description: `Searching for "${searchQuery}"...`
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "We've received your message and will respond soon.",
    });
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-localuv-background">
      <div className="bg-localuv-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <HelpCircle className="h-12 w-12 mx-auto mb-4" />
          <h1 className="font-serif text-4xl mb-2">How can we help you?</h1>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            Search our knowledge base or browse frequently asked questions below.
          </p>
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <Input 
              type="search" 
              placeholder="Search for answers..." 
              className="pl-12 h-12 bg-white text-gray-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button 
              className="absolute right-1 top-1 bg-localuv-secondary hover:bg-localuv-secondary/90"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="faq" className="max-w-4xl mx-auto">
          <TabsList className="mx-auto w-full max-w-md grid grid-cols-3 mb-8">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
          </TabsList>
          
          <TabsContent value="faq">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
                  <h3 className="font-medium mb-4">Categories</h3>
                  <ul className="space-y-2">
                    {faqs.map((category) => (
                      <li key={category.category}>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md ${
                            activeCategory === category.category
                              ? 'bg-localuv-primary/10 text-localuv-primary font-medium'
                              : 'hover:bg-gray-100'
                          }`}
                          onClick={() => setActiveCategory(category.category)}
                        >
                          {category.category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="md:col-span-3">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-serif mb-6">{activeCategory}</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {faqs
                      .find(cat => cat.category === activeCategory)
                      ?.questions.map((faq, idx) => (
                        <AccordionItem key={idx} value={`item-${idx}`}>
                          <AccordionTrigger className="font-medium text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="text-gray-700">{faq.answer}</p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                  </Accordion>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="articles">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-serif mb-6">Popular Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {popularArticles.map((article, idx) => (
                  <a key={idx} href={article.url} className="block">
                    <Card className="h-full transition-shadow hover:shadow-md">
                      <div className="p-6 flex items-start space-x-4">
                        <div className="bg-localuv-primary/10 p-3 rounded-full">
                          <article.icon className="h-6 w-6 text-localuv-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">{article.title}</h3>
                          <p className="text-gray-600 text-sm">{article.description}</p>
                        </div>
                      </div>
                    </Card>
                  </a>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="contact">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-serif mb-6">Contact Our Support Team</h2>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                          Name
                        </label>
                        <Input 
                          id="name" 
                          value={contactForm.name}
                          onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                          Email Address
                        </label>
                        <Input 
                          id="email" 
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-1">
                        Subject
                      </label>
                      <Input 
                        id="subject"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">
                        Message
                      </label>
                      <textarea 
                        id="message" 
                        rows={5}
                        className="w-full min-h-[120px] rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={contactForm.message}
                        onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </div>
                
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 p-6 rounded-lg h-full">
                    <h3 className="text-xl font-medium mb-6">Other Ways to Reach Us</h3>
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 text-localuv-primary mr-3 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Email Support</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            For general inquiries:<br />
                            <a href="mailto:support@localuv.com" className="text-localuv-primary hover:underline">
                              support@localuv.com
                            </a>
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <MessageSquare className="h-5 w-5 text-localuv-primary mr-3 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Live Chat</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Available Monday through Friday<br />
                            9:00 AM - 5:00 PM EST
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">
                            Start Chat
                          </Button>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <p className="text-sm text-gray-600">
                          Our support team typically responds within 24 hours during business days.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HelpCenter;
