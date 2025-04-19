
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { MapPin, Phone, Mail } from 'lucide-react';

const ContactUs = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would send the form data to your server
    console.log('Form submitted:', formData);
    
    toast({
      title: "Message sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-localuv-background">
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-serif text-4xl text-center mb-8">Contact Us</h1>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-sm">
              <h2 className="font-serif text-2xl mb-6">Get In Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-500 mt-1" />
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-gray-600">123 Main Street<br />Anytown, USA 12345</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-gray-500 mt-1" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-gray-600">(123) 456-7890</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-gray-500 mt-1" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-600">info@localuv.com</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-medium mb-2">Business Hours</h3>
                <p className="text-gray-600">Monday - Friday: 9am - 5pm</p>
                <p className="text-gray-600">Saturday: 10am - 2pm</p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </div>
            
            <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm">
              <h2 className="font-serif text-2xl mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input 
                      id="name"
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Your Email</Label>
                    <Input 
                      id="email"
                      name="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject"
                    name="subject" 
                    value={formData.subject} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">Message</Label>
                  <textarea 
                    id="message"
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    required
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm min-h-[150px]"
                  ></textarea>
                </div>
                
                <Button type="submit" className="bg-localuv-primary">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
