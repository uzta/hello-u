"use client"

import { useState, useEffect, useRef } from 'react';
import type { ChangeEvent } from 'react';

type SetNameFunction = (name: string) => void;
type SetStageFunction = (stage: number) => void;

export default function Introduction({setName, setStage}: {setName: SetNameFunction, setStage: SetStageFunction}) {
  const [inputValue, setInputValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input field on component mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const proceed = () => {
    setName(inputValue)
    setStage(1)
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="absolute inset-0 z-10 bg-black"/>
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="w-1/2 h-1/2 flex items-center justify-center flex-col">
          <label className="text-6xl">Who are you?</label>
          <input 
            ref={inputRef} 
            type="text" 
            className="w-2/3 text-center text-4xl mt-20 border-b border-b-gray-400 bg-black selected:border-none"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button 
            className="btn mt-16 text-2xl w-2/5 h-1/6" 
            disabled={!inputValue.trim()}
            onClick={proceed}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}
