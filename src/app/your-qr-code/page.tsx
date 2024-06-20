import Image from "next/image"
import Link from "next/link";

export default function Page() {
    interface ContactData {
        name: string,
        value: string|undefined
    }    
    const DataEntryButton = ({ entry }: { entry: ContactData }) => {
        <Link href="">
          <button className="btn btn-outline btn-secondary w-full">{entry.name}</button>
        </Link>
    };

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
            <div className="w-full absolute top-12 left-0 py-16 px-12 flex flex-col items-start justify-center">
              <div className="avatar w-full flex items-center justify-center">
                <div className="w-24 rounded-full">
                  <Image src="/smiley.png" width={50} height={50} alt="Smiley" />
                </div>
              </div>
              <div className="w-full items-center justify-center text-2xl font-bold flex mt-4">
                <label>Name</label>
              </div>
              <div className="w-full h-full flex mt-8 flex flex-col gap-4">
                {/* {entries.map((entry) => (
                  <DataEntryButton key={entry.name} entry={entry} />
                ))} */}
              </div>
            </div>
        </div>
      </div>
    );
  }
  