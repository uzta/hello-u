"use client"

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function StartButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3500);

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, []);

  if (!isVisible) return null;

  return (
    <div className="absolute top-2/3 w-full h-24 flex justify-center z-20 m-8">
      <Link href={"/create"} className='w-1/5 h-full'>
        <button className="btn btn-outline w-full h-full">
            <span className='text-2xl'>Ready to get started?</span>
        </button>
      </Link>
    </div>
  );
}
