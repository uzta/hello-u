"use client"

import React, { useEffect, useRef } from 'react';
import './ImageReveal.css';
import Image from 'next/image';

const ImageReveal: React.FC = () => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (imageRef.current) {
        // First color invert
        imageRef.current.classList.add('invert');
        setTimeout(() => {
          if (imageRef.current) {
            imageRef.current.classList.remove('invert');
          }
          
          // Second color invert
          setTimeout(() => {
            if (imageRef.current) {
              imageRef.current.classList.add('invert');
            }
            setTimeout(() => {
              if (imageRef.current) {
                imageRef.current.classList.remove('invert');
                // Add the show class to start the image reveal
                imageRef.current.classList.add('show');
              }
            }, 100); // 0.1 second
          }, 100); // 0.1 second delay before second invert
        }, 100); // 0.1 second invert duration
      }
    }, 2000); // Adjust the delay as needed

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="reveal-container">
      <Image ref={imageRef}
        src="/hello-u.png"
        alt="Hello, you!"
        className="reveal-image"
        width={800}
        height={200}
      />
    </div>
  );
};

export default ImageReveal;