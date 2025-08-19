import React, { useState, type JSX } from "react";
import { ChevronLeft, ChevronRight, Star, StarHalf } from "lucide-react";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
  alt: string;
}

const TopSaleCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const products: Product[] = [
    {
      id: 1,
      name: "Samsung Galaxy 10",
      image: "./assets/products/2.png",
      price: 152,
      rating: 4,
      alt: "Samsung Galaxy 10",
    },
    {
      id: 2,
      name: "Readme Note 7",
      image: "./assets/products/2.png",
      price: 152,
      rating: 4,
      alt: "Readme Note 7",
    },
    {
      id: 3,
      name: "Readme Note 7",
      image: "./assets/products/3.png",
      price: 152,
      rating: 4,
      alt: "Readme Note 7",
    },
    {
      id: 4,
      name: "Samsung Galaxy 10",
      image: "./assets/products/6.png",
      price: 152,
      rating: 4,
      alt: "Samsung Galaxy 10",
    },
    {
      id: 5,
      name: "Readme Note 7",
      image: "./assets/products/1.png",
      price: 152,
      rating: 4,
      alt: "Readme Note 7",
    },
    {
      id: 6,
      name: "Readme Note 7",
      image: "./assets/products/15.png",
      price: 122,
      rating: 4,
      alt: "Readme Note 7",
    },
  ];

  const itemsPerView = 4;
  const maxIndex = Math.max(0, products.length - itemsPerView);

  const nextSlide = (): void => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = (): void => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const renderStars = (rating: number): JSX.Element[] => {
    const stars: JSX.Element[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          className="w-3 h-3 fill-yellow-400 text-yellow-400"
        />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-3 h-3 text-yellow-400" />
      );
    }

    return stars;
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4">Top Sale</h2>
        <hr className="mb-8 border-gray-300" />

        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out gap-4"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                width: `${(products.length / itemsPerView) * 100}%`,
              }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 bg-gray-100 border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
                  style={{ width: `${100 / products.length}%` }}
                >
                  <div className="text-center">
                    <a
                      href="product.html"
                      className="block mb-4 hover:opacity-90 transition-opacity"
                    >
                      <img
                        src={product.image}
                        alt={product.alt}
                        className="w-full h-40 object-contain mx-auto"
                      />
                    </a>

                    <h3 className="font-medium text-gray-800 mb-2">
                      {product.name}
                    </h3>

                    <div className="flex justify-center items-center gap-1 mb-3">
                      {renderStars(product.rating)}
                    </div>

                    <div className="text-lg font-semibold text-gray-800 mb-4">
                      ${product.price}
                    </div>

                    <button
                      type="button"
                      className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium py-2 px-4 rounded transition-colors duration-200"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-50 border border-gray-300 rounded-full p-2 shadow-md transition-colors duration-200"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-50 border border-gray-300 rounded-full p-2 shadow-md transition-colors duration-200"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                currentIndex === index
                  ? "bg-yellow-500"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopSaleCarousel;
