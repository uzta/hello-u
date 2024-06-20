import Image from 'next/image'
import ImageReveal from "./components/ImageReveal/ImageReveal";
import StartButton from './components/StartButton';
import SmileyBanner from './components/SmileyBanner';
import HomeFooter from './components/HomeFooter';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <SmileyBanner/>
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black opacity-50"/>
      <div className="w-full h-screen overflow-hidden">
        <Image src="/background.png" width={1920} height={1080} alt="Background image"></Image>
      </div>
      <div className="absolute top-1/3 w-full h-1/3 flex flex-row items-center justify-center bg-white bg-opacity-10 z-20">
        <ImageReveal/>
      </div>
      <StartButton/>
      <HomeFooter/>
    </div>
  );
}
