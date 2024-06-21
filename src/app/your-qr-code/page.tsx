import ContactInfo from "../components/ContactInfo";

export default async function Page() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Desktop message */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black to-slate-950 opacity-50 flex items-center justify-center hidden md:flex">
        <p className="text-white text-4xl font-bold text-center">
          Please visit this site on a mobile phone
        </p>
      </div>
      
      {/* Mobile-specific content */}
      <div className="md:hidden">
          <ContactInfo/>
      </div>
    </div>
  );
}
