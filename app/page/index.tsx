import { PrismaClient } from '@prisma/client';
import { fetchData } from '../../utils/fetchData';

async function main() {
  const prisma = new PrismaClient();

  try {
    await fetchData(prisma);
    console.log('Data import process completed successfully');
  } catch (error) {
    console.error('Error during data import:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
