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

const ContactInfo = () => {
  const [contactInfo, setContactInfo] = React.useState<ContactInfo|null>(null);

  React.useEffect(() => {
    const fetchContactInfo = () => {
      fetch('/api/contact')
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error('Failed to fetch contact information');
          }
        })
        .then(data => {
          setContactInfo(data as ContactInfo);
        })
        .catch(error => {
          console.error(error);
          setContactInfo(null);
        });
    };
  
    fetchContactInfo();
  }, []);
  

  if (!contactInfo) return null;

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
            link={`https://wa.me/${whatsapp}?text=Greetings%21%20I%20got%20this%20number%20on%20your%20Hello-U`}
          />
        )}
        {email && <DataEntryButton name="E-mail" link={`mailto:${email}?subject=Nice%20to%20meet%20you%21`} />}
        {instagram && <DataEntryButton name="Instagram" link={`https://www.instagram.com/${instagram}`} />}
        {linkedin && <DataEntryButton name="LinkedIn" link={`https://www.linkedin.com/in/${linkedin}`} />}
        {website && <DataEntryButton name="Website" link={website} />}
      </div>
    </div>
  );
};

export default ContactInfo;
