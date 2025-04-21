
import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

const ProductGallery = ({ images, productName }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  
  return (
    <div>
      <div className="bg-white rounded-lg overflow-hidden h-96 mb-4 dark:bg-gray-800">
        <img 
          src={images[selectedImage]} 
          alt={productName} 
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <div 
            key={index} 
            className={`w-20 h-20 cursor-pointer border-2 rounded ${selectedImage === index ? 'border-localuv-primary' : 'border-transparent'}`}
            onClick={() => setSelectedImage(index)}
          >
            <img src={image} alt={`${productName} ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
