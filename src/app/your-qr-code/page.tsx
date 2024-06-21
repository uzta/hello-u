import Image from "next/image"
import Link from "next/link";

import { prisma } from "@/lib/prisma";
import type { ContactInfo } from "@prisma/client";

export default async function Page() {
  const contactInfo: ContactInfo | null = await prisma.contactInfo.findFirst({ orderBy: { createdAt: 'desc' } });

  const name = contactInfo?.name;
  const phone = contactInfo?.phone;
  const whatsapp = contactInfo?.whatsapp;
  const email = contactInfo?.email;
  const instagram = contactInfo?.instagram;
  const linkedin = contactInfo?.linkedin;
  const website = contactInfo?.website;

  const DataEntryButton = ({ name, link }: { name: string, link: string }) => {
    return (
      <Link href={link}>
        <button className="btn btn-outline btn-secondary w-full">{name}</button>
      </Link>
    )
  };

  const Buttons = () => {
    return (
      <div className="w-full h-full flex mt-8 flex flex-col gap-4">
        {phone && <DataEntryButton name="Phone" link={'tel:' + phone}/>}
        {whatsapp && <DataEntryButton name="Whatsapp" link={`https://wa.me/${whatsapp}?text=Greetings%21%20I%20got%20this%20number%20on%20your%20Hello-U`}/>}
        {email && <DataEntryButton name="E-mail" link={`mailto:${email}?subject=Nice%20to%20meet%20you%21`}/>}
        {instagram && <DataEntryButton name="Instagram" link={`https://www.instagram.com/${instagram}`}/>}
        {linkedin && <DataEntryButton name="LinkedIn" link={`https://www.linkedin.com/in/${linkedin}`}/>}
        {website && <DataEntryButton name="Website" link={website}/>}
      </div>
    )
  }

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
              <label>{name}</label>
            </div>
            <Buttons/>
          </div>
      </div>
    </div>
  );
}
