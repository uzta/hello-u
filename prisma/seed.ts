import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a single ContactInfo row
  const contactInfo = await prisma.contactInfo.create({
    data: {
      phone: '123-456-7890',
      whatsapp: '123-456-7890',
      email: 'example@example.com',
      instagram: 'example_insta',
      linkedin: 'example_linkedin',
      website: 'https://www.example.com',
    },
  });

  console.log({ contactInfo });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
