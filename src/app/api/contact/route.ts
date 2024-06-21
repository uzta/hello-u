import { PrismaClient } from '@prisma/client';
import type { ContactInfo } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

interface RequestBody {
  name: string|undefined;
  phone: string|undefined;
  whatsapp: string|undefined;
  email: string|undefined;
  instagram: string|undefined;
  linkedin: string|undefined;
  website: string|undefined;
}

export async function GET(_request: Request) {
  const contactData = await prisma.contactInfo.findFirst({orderBy: {createdAt: 'desc'}})
  return NextResponse.json(contactData)
}

export async function POST(request: Request) {
  const requestBody: RequestBody = await request.json() as RequestBody;
  const { name, phone, whatsapp, email, instagram, linkedin, website } = requestBody;

  try {
    const newContact: ContactInfo = await prisma.contactInfo.create({
      data: {
        name,
        phone,
        whatsapp,
        email,
        instagram,
        linkedin,
        website,
      },
    });
    return NextResponse.json(newContact);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 });
  }
}