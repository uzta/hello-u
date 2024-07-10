"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ContactInfo {
    id: number;
    name: string;
    phone?: string;
    whatsapp?: string;
    email?: string;
    instagram?: string;
    linkedin?: string;
    website?: string;
}

const ContactInfoJulian = () => {
  const contactInfo: ContactInfo = {
    id: 1,
    name: "Julián Terán Vázquez",
    phone: "+52 1 614 2189343",
    whatsapp: "+52 1 614 2189343",
    email: "julian@uzta.org",
    linkedin: "juliantervaz"
  }

  const { name, phone, whatsapp, email, instagram, linkedin, website } = contactInfo;

  const DataEntryButton = ({ name, link }: { name: string, link: string }) => {
    return (
      <Link href={link}>
        <button className="btn btn-outline btn-secondary w-full">{name}</button>
      </Link>
    )
  };

  return (
    <div className="w-full absolute top-12 left-0 py-16 px-12 flex flex-col items-start justify-center">
      <div className="avatar w-full flex items-center justify-center">
        <div className="w-24 rounded-full">
          <Image src="/smiley.png" width={50} height={50} alt="Smiley" />
        </div>
      </div>
      <div className="w-full items-center justify-center text-2xl font-bold flex mt-4">
        <label>{name}</label>
      </div>
      <div className="w-full h-full flex mt-8 flex flex-col gap-4">
        {phone && <DataEntryButton name="Phone" link={`tel:${phone}`} />}
        {whatsapp && (
          <DataEntryButton
            name="Whatsapp"
            link={`https://wa.me/${whatsapp}?text=Hello%21%20We%20met%20at%20the%20Tech%20%26%20Business%20Networking%20event%20in%20Seattle`}
          />
        )}
        {email && <DataEntryButton name="E-mail" link={`mailto:${email}?subject=Hello%2C%20Julian%21`} />}
        {instagram && <DataEntryButton name="Instagram" link={`https://www.instagram.com/${instagram}`} />}
        {linkedin && <DataEntryButton name="LinkedIn" link={`https://www.linkedin.com/in/${linkedin}`} />}
        {website && <DataEntryButton name="Website" link={website} />}
      </div>
    </div>
  );
};

export default ContactInfoJulian;
