"use client"

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HomeFooter() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, []);

  if (!isVisible) return null;

  return (
    <div className='absolute bottom-8 h-4 w-full flex flex-row items-center justify-center gap-8 z-20'>
      <Link href=""><span className='hover:underline hover:text-white transition duration-300 ease-in-out'>About</span></Link>
      <Link href=""><span className='hover:underline hover:text-white transition duration-300 ease-in-out'>Terms & Conditions</span></Link>
    </div>
  );
}
