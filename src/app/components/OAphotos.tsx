'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FaDownload } from 'react-icons/fa';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

interface Question {
  _id: string;
  company: string;
  description: string;
  photos: string[];
  createdAt: string;
  updatedAt: string;
}

interface OAphotosProps {
  questions: Question[];
}

const OAphotos: React.FC<OAphotosProps> = ({ questions }) => {
  return (
    <div className="space-y-8">
      {questions.map((companyData) => (
        <div
          key={companyData._id}
          className="bg-gradient-to-r from-gray-50 via-white to-gray-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          <h3 className="text-3xl font-bold text-gray-800 mb-3">
            {companyData.company || "Unknown Company"}
          </h3>
          <p className="text-gray-600 text-lg mb-5">
            {companyData.description || "No description available"}
          </p>
          <p className="text-sm text-gray-500 mb-5">
            Posted on: {new Date(companyData.createdAt).toLocaleDateString()}
          </p>
          <ImageSlider images={companyData.photos} />
        </div>
      ))}
    </div>
  );
};

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = images[currentIndex];
    link.download = `image-${currentIndex + 1}.jpg`;
    link.click();
  };

  if (!images || images.length === 0) {
    return <div className="text-gray-500 italic text-center">No images available</div>;
  }

  return (
    <div className="relative group">
      {/* Image Display */}
      <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-md">
        <Image
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          width={600}
          height={300}
          style={{ objectFit: 'contain' }} // Ensures the image fits entirely
          className="w-full h-full transition-transform duration-300 ease-in-out"
        />
        {/* Download Button */}
        <button
          onClick={downloadImage}
          aria-label="Download image"
          className="absolute bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 hover:scale-110 transition-transform"
        >
          <FaDownload size={20} />
        </button>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevImage}
        aria-label="Previous image"
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-900 hover:scale-110 transition-transform hidden group-hover:block"
      >
        <IoChevronBack size={24} />
      </button>
      <button
        onClick={nextImage}
        aria-label="Next image"
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-900 hover:scale-110 transition-transform hidden group-hover:block"
      >
        <IoChevronForward size={24} />
      </button>

      {/* Caption */}
      <div className="text-center mt-4 text-gray-600 font-medium">
        Image {currentIndex + 1} of {images.length}
      </div>
    </div>
  );
};

export default OAphotos;
