
import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-localuv-background">
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-serif text-4xl text-center mb-8">About LocaLuv</h1>
        
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm">
          <h2 className="font-serif text-2xl mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-6">
            At LocaLuv, we're passionate about connecting people with exceptional local businesses. 
            Our platform is designed to highlight the unique products and services that make each 
            community special, while providing tools that help small businesses thrive in the digital age.
          </p>
          
          <h2 className="font-serif text-2xl mb-4">Our Story</h2>
          <p className="text-gray-700 mb-6">
            LocaLuv was founded in 2023 by a team of entrepreneurs who saw a need for better 
            digital tools to support local economies. With backgrounds in technology and small 
            business development, our team created a platform that bridges the gap between local 
            businesses and their communities.
          </p>
          
          <h2 className="font-serif text-2xl mb-4">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border border-localuv-accent/20 p-4 rounded-md">
              <h3 className="text-xl font-medium mb-2">Community Focus</h3>
              <p className="text-gray-700">We believe in the power of strong local economies and the unique character they bring to our communities.</p>
            </div>
            <div className="border border-localuv-accent/20 p-4 rounded-md">
              <h3 className="text-xl font-medium mb-2">Small Business Advocacy</h3>
              <p className="text-gray-700">We're committed to providing tools and resources that help small businesses compete effectively.</p>
            </div>
            <div className="border border-localuv-accent/20 p-4 rounded-md">
              <h3 className="text-xl font-medium mb-2">Authenticity</h3>
              <p className="text-gray-700">We celebrate the authentic stories and unique offerings of local businesses.</p>
            </div>
            <div className="border border-localuv-accent/20 p-4 rounded-md">
              <h3 className="text-xl font-medium mb-2">Innovation</h3>
              <p className="text-gray-700">We constantly seek new ways to connect people with the businesses they love.</p>
            </div>
          </div>
          
          <h2 className="font-serif text-2xl mb-4">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4"></div>
                <h3 className="font-medium">Team Member {index}</h3>
                <p className="text-gray-600">Position</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
