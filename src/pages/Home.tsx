import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  ChevronLeft,
  Star,
  ArrowDown,
  ArrowUp,
} from 'lucide-react';
import Footer from '../components/Footer';
import FeaturedCarousel from '../components/FeaturedCarousel';
import ProductCard from '../components/ProductCard';


const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const carouselItems = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      title: 'Premium Headphones',
      description: 'Experience crystal-clear audio',
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      title: 'Powerful Laptops',
      description: 'Boost your productivity',
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      title: 'Smart Watches',
      description: 'Stay connected on the go',
    },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Wireless Earbuds',
      image:
        'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      description: 'True wireless freedom with exceptional sound quality.',
    },
    {
      id: 2,
      name: '4K Smart TV',
      image:
        'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      description: 'Immersive viewing experience with smart features.',
    },
    {
      id: 3,
      name: 'Smartphone',
      image:
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      description: 'Latest model with advanced features and long battery life.',
    },
    {
      id: 4,
      name: 'Laptop',
      image:
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      description: 'Powerful laptop for work and entertainment.',
    },
    {
      id: 5,
      name: 'Wireless Speaker',
      image:
        'https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      description: 'Portable speaker with rich, room-filling sound.',
    },
  ];

  //ProductCards
  const productCards = [
    {
      id: 1,
      title: "Next-Gen Gaming Console",
      description: "Experience gaming like never before with our cutting-edge console. Immerse yourself in stunning 4K graphics, lightning-fast load times, and a vast library of games.",
      image: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      learnMoreLink: "/product/gaming-console"
    },
    {
      id: 2,
      title: "Smart Home Ecosystem",
      description: "Transform your house into a smart home with our integrated ecosystem. Control lights, temperature, security, and more with just your voice or smartphone.",
      image: "https://images.unsplash.com/photo-1723186773193-621feea595c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      learnMoreLink: "/product/smart-home"
    },
    {
      id: 3,
      title: "Professional Camera Kit",
      description: "Capture life's moments in stunning detail with our professional-grade camera kit. Perfect for both beginners and seasoned photographers.",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      learnMoreLink: "/product/camera-kit"
    },
  ];
 

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 min-h-screen">
      {/* Offer Section */}
      <div className="bg-indigo-600 text-white py-3 px-4 text-center">
        <p className="text-sm font-medium">
          Summer Sale! Get 20% off on all products. Use code: SUMMER20 at
          checkout.
          <Link to="/products" className="ml-2 underline">
            Shop Now
          </Link>
        </p>
      </div>

      {/* Carousel */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {carouselItems.map((item) => (
            <div key={item.id} className="w-full flex-shrink-0">
              <div className="relative h-96 w-full">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">
                      {item.title}
                    </h2>
                    <p className="text-xl text-white mb-6">
                      {item.description}
                    </p>
                    <Link
                      to="/products"
                      className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-indigo-100 transition duration-300"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + carouselItems.length) % carouselItems.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition duration-300"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <button
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % carouselItems.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition duration-300"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>
      </div>


       {/* Down Arrow */}
       <div className="flex justify-center mt-8">
        <button
          onClick={scrollToBottom}
          className="bg-indigo-600 text-white rounded-full p-3 shadow-lg hover:bg-indigo-700 transition duration-300"
        >
          <ArrowDown className="w-6 h-6" />
        </button>
      </div>

      {/* Featured Products */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">
          Featured Products
        </h2>
        <FeaturedCarousel products={featuredProducts} />
      </div>



       {/* Product Cards */}
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">
          Discover Our Products
        </h2>
        <div className="space-y-12">
          {productCards.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 text-center">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={`https://randomuser.me/api/portraits/men/${index}.jpg`}
                    alt={`Customer ${index}`}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      John Doe
                    </h3>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua."
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />

      {/* Floating scroll button */}
      <button
        onClick={showScrollTop ? scrollToTop : scrollToBottom}
        className="fixed bottom-8 right-8 bg-indigo-600 text-white rounded-full p-3 shadow-lg hover:bg-indigo-700 transition duration-300"
      >
        {showScrollTop ? (
          <ArrowUp className="w-6 h-6" />
        ) : (
          <ArrowDown className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default Home;
