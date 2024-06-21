"use client"

import { useState, useEffect } from 'react';
import { SmileyIcon } from './svgs/SmileyIcon';
import Image from 'next/image';

export default function SmileyBanner() {
  const [selected, setSelected] = useState<boolean>(false)
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3500);

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, []);
  
  const handleMouseEnter = () => {
    setSelected(true);
  };
  const handleMouseLeave = () => {
    setSelected(false);
  };

  if (!isVisible) return null;    
  
  return (
    <div className='absolute top-8 right-8 z-30 flex flex-row gap-8 items-center justify-center' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {selected && <Image src="/hello.png" width={120} height={40} alt='helloU' className='opacity-50'/>}
      <SmileyIcon selected={selected}/>
    </div>
  );
}
