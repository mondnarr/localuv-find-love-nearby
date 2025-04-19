
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { mockBusinesses } from '@/lib/businessData';

// Generate mock blog posts
const generateMockBlogPosts = () => {
  const posts = [];
  const categories = ['Business Spotlight', 'Community News', 'Tips & Advice', 'Event Recap'];
  
  for (let i = 0; i < 8; i++) {
    const business = mockBusinesses[i % mockBusinesses.length];
    posts.push({
      id: `post-${i}`,
      title: i % 3 === 0 ? 
        `Business Spotlight: ${business.name}` : 
        ['Top 5 Ways to Support Local', 'Community Event Highlights', 'Small Business Growth Strategies'][i % 3],
      excerpt: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
      category: categories[i % categories.length],
      author: 'LocaLuv Team',
      date: new Date(Date.now() - (i * 86400000 * 3)).toLocaleDateString(),
      imageUrl: business.imageUrl,
      featured: i < 2
    });
  }
  
  return posts;
};

const mockBlogPosts = generateMockBlogPosts();

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Extract unique categories
  const categories = Array.from(new Set(mockBlogPosts.map(post => post.category)));
  
  // Filter posts
  const filteredPosts = mockBlogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !activeCategory || post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Featured posts
  const featuredPosts = mockBlogPosts.filter(post => post.featured);
  
  return (
    <div className="min-h-screen bg-localuv-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-4xl mb-2">LocaLuv Blog</h1>
        <p className="text-gray-600 mb-8">News, spotlights and stories from our local business community</p>
        
        {/* Featured posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {featuredPosts.map(post => (
            <Card key={post.id} className="overflow-hidden">
              <div className="relative h-64">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 m-4 bg-localuv-primary text-white px-3 py-1 text-sm rounded">
                  Featured
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">{post.category} • {post.date}</div>
                <h2 className="text-2xl font-serif mb-2">{post.title}</h2>
                <p className="text-gray-700 mb-4">{post.excerpt}</p>
                <Button variant="outline">Read More</Button>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Search and filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative md:w-1/2">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              type="search" 
              placeholder="Search blog posts..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={!activeCategory ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(null)}
            >
              All
            </Button>
            {categories.map(category => (
              <Button 
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        {/* All posts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <Card key={post.id} className="overflow-hidden">
              <div className="h-48">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="text-sm text-gray-500 mb-1">{post.category} • {post.date}</div>
                <h3 className="font-medium mb-2">{post.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                <Button variant="link" className="p-0">Read More</Button>
              </div>
            </Card>
          ))}
        </div>
        
        {filteredPosts.length === 0 && (
          <div className="text-center p-8">
            <p className="text-gray-500">No blog posts found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
